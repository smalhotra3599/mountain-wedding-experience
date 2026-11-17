import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Party } from "@/lib/weddingApi";
import {
  asksReason,
  buildSubmission,
  choiceKey,
  initialChoices,
  missingAnswers,
} from "@/components/site/plans-rsvp";
import { TellUsYourPlans } from "@/components/site/TellUsYourPlans";

const options = [
  {
    value: "ATTENDING",
    label: "Joyfully accepts",
    hint: "I'll be there",
    status_label: "Joyfully accepted",
  },
  {
    value: "MAYBE_YES",
    label: "Hopes to attend",
    hint: "Likely",
    status_label: "Hoping to attend",
    asks_reason: true,
    reason_prompt: "Is there anything it depends on?",
  },
  {
    value: "MAYBE_NO",
    label: "Unlikely to attend",
    hint: "Probably not",
    status_label: "Unlikely to attend",
    asks_reason: true,
    reason_prompt: "Is there anything that might change it?",
  },
  {
    value: "DECLINED",
    label: "Regretfully declines",
    hint: "I won't be able to make it",
    status_label: "Regretfully declined",
  },
] as const;

const invitation = (status: string, maybe_reason: string | null = null) => ({
  event_id: 1,
  event_name: "Wedding",
  collect_rsvps: true,
  rsvp: "NO_RESPONSE" as const,
  status: status as never,
  status_label: "",
  maybe_reason,
  meal_option_id: null,
  meal: null,
  rsvp_at: null,
});

const party: Party = {
  group_uuid: "party-1",
  party: "Asha & Ravi",
  events: [
    {
      id: 1,
      name: "Wedding",
      type: "WEDDING",
      start_at: "",
      end_at: "",
      timezone: "America/New_York",
      venue: "Loon Mountain Resort",
      address: "",
      attire: "",
      collect_rsvps: true,
      meal_options: [],
      response_options: [...options],
      questions: [],
    },
  ],
  guests: [
    {
      uuid: "g1",
      name: "Asha Rao",
      first_name: "Asha",
      family_name: "Rao",
      invitations: [invitation("MAYBE_YES", "Waiting on PTO")],
    },
    {
      uuid: "g2",
      name: "Ravi Rao",
      first_name: "Ravi",
      family_name: "Rao",
      invitations: [invitation("NO_RESPONSE")],
    },
  ],
};

describe("tell us your plans answers", () => {
  it("pre-fills saved answers and maybe reasons", () => {
    const c = initialChoices(party);
    expect(c[choiceKey("g1", 1)]).toEqual({ response: "MAYBE_YES", reason: "Waiting on PTO" });
    expect(c[choiceKey("g2", 1)]).toEqual({ response: null, reason: "" });
    expect(missingAnswers(party, c)).toBe(1);
  });

  it("asks why for both maybes and a decline, but not a yes", () => {
    const ev = party.events[0]!;
    expect(
      ["ATTENDING", "MAYBE_YES", "MAYBE_NO", "DECLINED"].map((r) => asksReason(ev, r as never)),
    ).toEqual([false, true, true, true]);
  });

  it("sends maybe reasons with the answer and decline reasons as the note", () => {
    const body = buildSubmission(party, {
      [choiceKey("g1", 1)]: { response: "MAYBE_NO", reason: "  Visa timing " },
      [choiceKey("g2", 1)]: { response: "DECLINED", reason: "Work trip" },
    });
    expect(body).toEqual({
      groupUuid: "party-1",
      guests: [
        { uuid: "g1", events: [{ eventId: 1, response: "MAYBE_NO", reason: "Visa timing" }] },
        { uuid: "g2", events: [{ eventId: 1, response: "DECLINED" }] },
      ],
      note: "Ravi: Work trip",
    });
  });

  it("drops a reason once the guest says yes, and never sends contact details", () => {
    const body = buildSubmission(party, {
      [choiceKey("g1", 1)]: { response: "ATTENDING", reason: "Waiting on PTO" },
      [choiceKey("g2", 1)]: { response: "ATTENDING", reason: "" },
    });
    expect(body.guests[0]!.events[0]).toEqual({ eventId: 1, response: "ATTENDING" });
    expect(body.note).toBe("");
    expect(body).not.toHaveProperty("contact");
  });
});

describe("tell us your plans page", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("looks up a name, then shows the RSVP choices with a reason box for a decline", async () => {
    const fetchMock = vi.fn(async (url: string) => ({
      ok: true,
      json: async () => ({
        ok: true,
        status: 200,
        extracted: url.includes("path=lookup")
          ? {
              matches: [
                { group_uuid: "party-1", party: "Asha & Ravi", suggested: false, guests: [] },
              ],
              party,
            }
          : party,
      }),
    }));
    vi.stubGlobal("fetch", fetchMock);
    render(<TellUsYourPlans />);

    fireEvent.change(screen.getByLabelText(/your full name/i), { target: { value: "Asha Rao" } });
    fireEvent.click(screen.getByRole("button", { name: /find me/i }));

    await screen.findByText(/Welcome,/);
    // One round trip: the lookup returns the party when exactly one matches.
    expect(fetchMock.mock.calls.map(([u]) => String(u))).toEqual([
      expect.stringContaining("path=lookup"),
    ]);
    expect(screen.getByDisplayValue("Waiting on PTO")).toBeTruthy();
    expect(screen.queryByLabelText(/email|phone/i)).toBeNull();

    const ravi = screen.getByRole("group", { name: "Ravi Rao" });
    fireEvent.click(ravi.querySelector('input[value="DECLINED"]')!);
    await waitFor(() => expect(screen.getByText(/We’ll miss you/)).toBeTruthy());
  });
});
