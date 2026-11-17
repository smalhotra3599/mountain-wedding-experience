import { useId, useState, type FormEvent } from "react";
import { weddingApi, WeddingApiError, type Party, type SearchMatch } from "@/lib/weddingApi";
import {
  asksReason,
  buildSubmission,
  choiceKey,
  initialChoices,
  missingAnswers,
  reasonPrompt,
  REASON_MAX,
  rsvpEvents,
  type Choices,
} from "./plans-rsvp";

type Step =
  | { name: "find" }
  | { name: "pick"; matches: SearchMatch[] }
  | { name: "form"; party: Party }
  | { name: "done"; party: Party };

const CONTACT_US = "Please try again, or reach out to Sharanya or Sahil directly.";
const errorText = (e: unknown) =>
  e instanceof WeddingApiError && e.status === 400 ? e.message : "Something went wrong on our end.";

const inputClass =
  "w-full rounded-none border border-border bg-ivory px-4 py-3 font-serif text-base text-foreground placeholder:text-muted-foreground/70 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest";
const primaryButton =
  "btn-label inline-flex items-center justify-center bg-forest px-7 py-4 text-center text-ivory transition-colors hover:bg-rust disabled:cursor-not-allowed disabled:opacity-60";
const quietButton = "eyebrow text-rust underline-offset-4 hover:underline focus-visible:underline";

export function TellUsYourPlans() {
  const [step, setStep] = useState<Step>({ name: "find" });
  const [name, setName] = useState("");
  const [choices, setChoices] = useState<Choices>({});
  const [busy, setBusy] = useState<null | "search" | "party" | "submit">(null);
  const [error, setError] = useState<string | null>(null);

  async function find(e: FormEvent) {
    e.preventDefault();
    const query = name.trim().replace(/\s+/g, " ");
    if (query.length < 3) return setError("Please enter your full name.");
    setBusy("search");
    setError(null);
    try {
      const { matches, party } = await weddingApi.lookup(query);
      if (party) return showParty(party);
      if (matches.length === 0)
        setError("We couldn’t find you. Try entering your full first and last name.");
      else setStep({ name: "pick", matches });
    } catch (err) {
      setError(`${errorText(err)} ${CONTACT_US}`);
    } finally {
      setBusy(null);
    }
  }

  function showParty(party: Party) {
    setChoices(initialChoices(party));
    setStep({ name: "form", party });
  }

  // Only when several invitations matched and the guest picked one.
  async function openParty(groupUuid: string) {
    setBusy("party");
    setError(null);
    try {
      showParty(await weddingApi.party(groupUuid));
    } catch (err) {
      setError(`${errorText(err)} ${CONTACT_US}`);
    } finally {
      setBusy(null);
    }
  }

  async function submit(party: Party) {
    if (missingAnswers(party, choices) > 0)
      return setError("Please choose an answer for everyone before sending.");
    setBusy("submit");
    setError(null);
    try {
      const result = await weddingApi.submitRsvp(buildSubmission(party, choices));
      // 202 means saved in the backup sheet and retried with Zola automatically: still a success for the guest.
      if (!result.ok) throw new WeddingApiError(result.status, result.error);
      setStep({ name: "done", party: result.extracted ?? party });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(`We couldn’t save your answers. ${CONTACT_US}`);
      console.error(err);
    } finally {
      setBusy(null);
    }
  }

  return (
    <section
      id="tell-us-your-plans"
      className="page-lead section-shell scroll-mt-20 bg-background md:scroll-mt-24"
    >
      <div className="mx-auto max-w-2xl">
        <header className="text-center">
          <p className="font-script text-4xl text-crimson">Sharanya &amp; Sahil</p>
          <h2 className="display mt-8 text-4xl text-foreground md:text-6xl">Tell Us Your Plans</h2>
          <div className="section-content mx-auto h-px w-16 bg-border" />
          <p className="section-content font-serif text-base leading-relaxed text-muted-foreground md:text-lg">
            This isn’t your formal RSVP, just an early sense of whether you can join us in the
            mountains. Plans change, and you can come back and update your answer anytime.
          </p>
        </header>

        <div className="section-content">
          {step.name === "find" || step.name === "pick" ? (
            <form onSubmit={find} className="space-y-4" noValidate>
              <label htmlFor="plans-name" className="eyebrow block font-bold text-rust">
                Your full name
              </label>
              <input
                id="plans-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First and last name"
                className={inputClass}
                maxLength={80}
              />
              <button
                type="submit"
                className={`${primaryButton} w-full sm:w-auto`}
                disabled={busy !== null}
              >
                {busy ? "Finding you…" : "Find me"}
              </button>
              {busy && (
                <p className="font-serif text-sm text-muted-foreground">
                  This can take a few seconds.
                </p>
              )}
              {step.name === "pick" && (
                <div className="space-y-3 pt-4">
                  <p className="font-serif text-base text-foreground">
                    We found a few matches. Which one is you?
                  </p>
                  {step.matches.map((m) => (
                    <button
                      key={m.group_uuid}
                      type="button"
                      disabled={busy !== null}
                      onClick={() => openParty(m.group_uuid)}
                      className="block w-full border border-border bg-ivory px-4 py-3 text-left transition-colors hover:border-forest disabled:opacity-60"
                    >
                      <span className="font-display text-base tracking-wide text-foreground">
                        {m.party}
                      </span>
                      <span className="mt-1 block font-serif text-sm text-muted-foreground">
                        {m.guests.map((g) => g.name).join(", ")}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </form>
          ) : step.name === "form" ? (
            <PlansForm
              party={step.party}
              choices={choices}
              setChoices={setChoices}
              busy={busy === "submit"}
              onSubmit={() => submit(step.party)}
              onBack={() => {
                setError(null);
                setStep({ name: "find" });
              }}
            />
          ) : (
            <Thanks
              party={step.party}
              onEdit={() => {
                setChoices(initialChoices(step.party));
                setStep({ name: "form", party: step.party });
              }}
            />
          )}
          {error && (
            <p
              role="alert"
              className="mt-6 border-l-2 border-crimson bg-muted px-4 py-3 font-serif text-base text-crimson"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function PlansForm({
  party,
  choices,
  setChoices,
  busy,
  onSubmit,
  onBack,
}: {
  party: Party;
  choices: Choices;
  setChoices: (update: (c: Choices) => Choices) => void;
  busy: boolean;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const formId = useId();
  const events = rsvpEvents(party);
  const update = (key: string, patch: Partial<Choices[string]>) =>
    setChoices((c) => ({ ...c, [key]: { response: null, reason: "", ...c[key], ...patch } }));

  if (events.length === 0) {
    return (
      <div className="space-y-4 text-center font-serif text-base text-foreground">
        <p>Welcome, {party.party}! There’s nothing to answer just yet. Check back soon.</p>
        <button type="button" className={quietButton} onClick={onBack}>
          Not you? Search again
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-10"
    >
      <div className="text-center">
        <p className="font-serif text-lg text-foreground">
          Welcome, <span className="font-bold">{party.party}</span>!
        </p>
        <button type="button" className={`${quietButton} mt-2`} onClick={onBack}>
          Not you? Search again
        </button>
      </div>

      {events.map(({ event, guests }) => (
        <div key={event.id} className="space-y-8">
          <div className="border-t border-border pt-8 text-center">
            <h3 className="font-display text-[17px] font-bold uppercase tracking-[0.16em] text-rust md:text-[19px]">
              {event.name}
            </h3>
            {event.venue && (
              <p className="mt-2 font-serif text-sm text-muted-foreground md:text-base">
                {event.venue}
              </p>
            )}
          </div>

          {guests.map((guest) => {
            const key = choiceKey(guest.uuid, event.id);
            const choice = choices[key] ?? { response: null, reason: "" };
            const groupName = `${formId}-${key}`;
            return (
              <fieldset key={key} className="space-y-3">
                <legend className="mb-3 font-display text-base tracking-wide text-foreground md:text-lg">
                  {guest.name}
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {event.response_options.map((option) => {
                    const checked = choice.response === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-start gap-3 border px-4 py-3 transition-colors ${
                          checked
                            ? "border-forest bg-forest/10"
                            : "border-border bg-ivory hover:border-forest/60"
                        }`}
                      >
                        <input
                          type="radio"
                          name={groupName}
                          value={option.value}
                          checked={checked}
                          onChange={() => update(key, { response: option.value })}
                          className="mt-1 accent-[var(--forest)]"
                        />
                        <span>
                          <span className="block font-serif text-base font-bold text-foreground">
                            {option.label}
                          </span>
                          <span className="block font-serif text-sm text-muted-foreground">
                            {option.hint}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                {choice.response && asksReason(event, choice.response) && (
                  <div className="space-y-2 pt-1">
                    <label
                      htmlFor={`${groupName}-reason`}
                      className="block font-serif text-sm text-foreground md:text-base"
                    >
                      {reasonPrompt(event, choice.response)}{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <textarea
                      id={`${groupName}-reason`}
                      rows={3}
                      maxLength={REASON_MAX}
                      value={choice.reason}
                      onChange={(e) => update(key, { reason: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                )}
              </fieldset>
            );
          })}
        </div>
      ))}

      <div className="border-t border-border pt-8 text-center">
        <button type="submit" className={`${primaryButton} w-full sm:w-auto`} disabled={busy}>
          {busy ? "Sending…" : "Send our plans"}
        </button>
        {busy && (
          <p className="mt-3 font-serif text-sm text-muted-foreground">
            This can take a few seconds.
          </p>
        )}
      </div>
    </form>
  );
}

function Thanks({ party, onEdit }: { party: Party; onEdit: () => void }) {
  return (
    <div className="space-y-8 text-center">
      <div>
        <p className="font-script text-4xl text-romantic-crimson md:text-5xl">Thank you!</p>
        <p className="mt-4 font-serif text-base text-foreground md:text-lg">
          We’ve got your plans, {party.party}. We’ll let you know when it’s time to send your final RSVP.
        </p>
      </div>
      {rsvpEvents(party).map(({ event, guests }) => (
        <div key={event.id} className="border-t border-border pt-6">
          <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.16em] text-rust md:text-[17px]">
            {event.name}
          </h3>
          <ul className="mt-4 space-y-2 font-serif text-base text-foreground">
            {guests.map((guest) => {
              const inv = guest.invitations.find((i) => i.event_id === event.id)!;
              return (
                <li key={guest.uuid}>
                  <span className="font-bold">{guest.name}</span>: {inv.status_label}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <button type="button" className={quietButton} onClick={onEdit}>
        Change our answers
      </button>
    </div>
  );
}
