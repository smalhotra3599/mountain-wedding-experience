/** FAQ copy supplied by the couple. Inline links use [[text|section-id]]. */
export type FaqBlock = string | { heading: string } | { emphasis: string };
export type FaqItem = { q: string; a: FaqBlock[] };
export type FaqCategory = { id: string; label: string; items: FaqItem[] };

export const faqIntro =
  "We’re bringing together some of our favorite people from across the country and around the world, and we know that planning a mountain getaway takes a little extra thought! We’ve put together answers to some of the questions you might have as you start making your plans. We’ll continue updating this section as more details are confirmed.";

export const faqCategories: FaqCategory[] = [
  {
    id: "celebrations",
    label: "Our Wedding & Celebrations",
    items: [
      { q: "Why have you chosen an American-style wedding?", a: [
        "Both of us grew up across cultures, and we wanted our wedding to reflect who we are and the experiences that have shaped us.",
        "Sharanya grew up in the UAE, surrounded by beautiful Emirati wedding celebrations. Ever since she was little, she dreamed of wearing a white wedding gown. Sahil grew up in the United States, where Western wedding traditions have always felt familiar.",
        "As two people who have spent much of our lives navigating different cultures, we wanted to create a celebration that feels authentically ours.",
        "And if you know us, you know how much we love the mountains!",
        "So, exchanging our vows surrounded by the White Mountains in the middle of autumn felt like the perfect way to begin this next chapter together.",
      ]},
      { q: "What happens during each of the wedding celebrations?", a: [
        "We’re planning three days of celebrations, and we know some of these traditions may be unfamiliar to our guests.",
        "Here’s a little introduction to what you can expect!",
        { heading: "Thursday, October 7 — Rehearsal Dinner" },
        "A rehearsal dinner is traditionally held before the wedding and brings together the couple’s immediate families, wedding party, and those closely involved in the ceremony.",
        "Ours will be an intimate dinner at RiverWalk Resort.",
        { emphasis: "By Invitation Only." },
        { heading: "Thursday, October 7 — Welcome Party" },
        "This is where the celebrations officially begin!",
        "The welcome party is an opportunity for everyone to meet, reconnect, enjoy a few drinks, and kick off the wedding festivities together.",
        "We’re hosting ours at Seven Birches Winery at RiverWalk Resort.",
        { emphasis: "All invited wedding guests are welcome!" },
        { heading: "Friday, October 8 — Wedding Ceremony" },
        "The main event!",
        "We’ll exchange our vows at Loon Mountain’s summit amphitheater, surrounded by the beautiful White Mountains.",
        "Guests will travel to the summit by gondola.",
        { heading: "Friday, October 8 — Cocktail Hour" },
        "Following the ceremony, guests will gather for drinks and hors d’oeuvres before the reception begins.",
        "It’s a chance to relax, mingle, and enjoy the celebrations.",
        { heading: "Friday, October 8 — Wedding Reception" },
        "The evening celebration!",
        "We’ll come together for dinner, drinks, speeches, music, and dancing at Loon Mountain’s Octagon Lodge.",
        { heading: "Saturday, October 9 — Farewell Brunch" },
        "We’re planning a relaxed farewell brunch to bring everyone together one last time before saying goodbye.",
        "Further details will follow.",
        { emphasis: "Dress codes and specific event timings will be shared closer to the wedding." },
      ]},
      { q: "Are all guests invited to every celebration?", a: [
        "The welcome party, wedding ceremony, cocktail hour, and reception are planned for our invited wedding guests.",
        "The rehearsal dinner is a smaller gathering reserved for immediate family, the wedding party, and those involved in the ceremony.",
        "Details about the farewell brunch will be confirmed closer to the wedding.",
        "When you look yourself up in Tell Us Your Plans, you’ll see the celebrations you’re invited to attend.",
      ]},
      { q: "Will there be any Indian wedding ceremonies?", a: [
        "No, we won’t be having any traditional Indian wedding ceremonies.",
        "While we both come from Indian backgrounds and deeply appreciate our cultures and traditions, we’ve chosen to celebrate in a way that feels most authentic to us as a couple. Our mountain wedding reflects our personalities, our shared love for the outdoors, and the kind of celebration we’ve always envisioned.",
        "We’re excited to bring everyone together for a celebration that feels uniquely us!",
      ]},
      { q: "Why did you choose Loon Mountain?", a: [
        "Because we’re mountain people!",
        "We’ve always loved being outdoors, exploring mountain trails, hiking, skiing, and finding beautiful places to escape to.",
        "We wanted our wedding to feel like us, and we couldn’t imagine a more meaningful setting than the White Mountains during New Hampshire’s spectacular autumn season.",
      ]},
    ],
  },
  {
    id: "invitations",
    label: "Invitations & RSVPs",
    items: [
      { q: "Is this our wedding invitation?", a: [
        "Yes!",
        "This website is our invitation. We won’t be sending paper invitations.",
        "Event timings, dress codes, and additional details will be added here as the wedding gets closer, and we’ll let you know when there’s an update.",
      ]},
      { q: "Why are you sending save-the-dates so far in advance?", a: [
        "We’re bringing together friends and family from across the United States and around the world, and we want everyone to have plenty of time to plan.",
        "Our wedding also falls during New Hampshire’s peak foliage season and Columbus Day weekend, one of the busiest travel periods of the year.",
        "By sharing the dates early, we hope to make it easier for everyone to arrange travel, accommodations, and time off.",
        "Most importantly, we’d love to have as many of our favorite people there as possible!",
      ]},
      { q: "Is “Tell Us Your Plans” our final RSVP?", a: [
        "No!",
        "We’re simply gathering an early sense of everyone’s plans to help us prepare.",
        "Your response at this stage is not your final RSVP.",
        "We’ll let you know when it’s time to send your final RSVP, which you’ll do right here on the website.",
      ]},
      { q: "When do we need to confirm our attendance?", a: [
        "We’ll share the official RSVP deadline here on the website and let you know when it’s time to respond.",
        "For now, we’d appreciate an early indication of whether you’re considering joining us.",
      ]},
      { q: "Can we change our response later?", a: [
        "Of course!",
        "We understand that plans can change, especially when coordinating travel so far in advance.",
        "Your early response is simply helping us with preliminary planning.",
        "We’ll let you know when it’s time to send your final RSVP.",
      ]},
      { q: "Can we bring additional guests?", a: [
        "When you look yourself up in Tell Us Your Plans, you’ll see exactly who is included in your party.",
        "We kindly ask that you keep to the guests listed there, as we’re planning our celebrations around a specific guest count.",
        "If you have any questions, please reach out to us directly.",
      ]},
      { q: "Who is organizing the wedding, and whom should we contact with questions?", a: [
        "We’re organizing and hosting our wedding celebrations ourselves!",
        "If you have any questions about the wedding, travel arrangements, accommodations, or anything else, please reach out directly to either Sharanya or Sahil.",
        "We’re happy to help you navigate the planning process.",
      ]},
    ],
  },
  {
    id: "accommodations",
    label: "Accommodations",
    items: [
      { q: "Where do you recommend staying?", a: [
        "Our recommended accommodation is RiverWalk Resort at Loon Mountain.",
        "We’ve arranged a special wedding room block for our guests.",
        "Our Thursday celebrations will take place at RiverWalk, and staying there will also provide convenient access to our planned wedding-day shuttle.",
        "Most importantly, we’d love to have our friends and family staying close together throughout the celebrations!",
        "Visit the [[Plan Your Trip|plan-your-trip]] section for more information.",
      ]},
      { q: "How much will accommodation cost?", a: [
        "We’re currently expecting room rates to be approximately $300 per night, with a minimum two-night stay.",
        "These are preliminary estimates, and final rates, taxes, booking conditions, and reservation details will be confirmed soon.",
        "We’re working with the resort to secure favorable group rates for our guests.",
      ]},
      { q: "When should we book our accommodation?", a: [
        "As soon as reservations open!",
        "October is peak foliage season in New Hampshire, and our wedding falls during Columbus Day weekend.",
        "Our wedding room block will be available on a first-come, first-served basis.",
        "Once the reserved rooms are filled, additional rooms and group rates cannot be guaranteed.",
        "We’ll share booking instructions as soon as they’re finalized.",
      ]},
      { q: "Are there other hotels nearby?", a: [
        "Yes!",
        "There are several accommodations in and around Lincoln, including Hampton Inn Lincoln White Mountains and Holiday Inn Express.",
        "However, we do not currently have wedding room blocks at these properties.",
        "Because of the holiday weekend and peak foliage season, rates and availability may be limited.",
        "We strongly recommend RiverWalk Resort for its location, convenience, and our special wedding group rates.",
      ]},
      { q: "Do we have to stay at RiverWalk Resort?", a: [
        "Not at all!",
        "You’re welcome to arrange accommodations wherever you prefer.",
        "However, RiverWalk is our recommended hotel because our Thursday celebrations will take place there, we’ve arranged special group rates, and it offers convenient access to the planned wedding-day shuttle.",
      ]},
      { q: "Can we arrive earlier or extend our stay?", a: [
        "Absolutely!",
        "We’d love for you to make a longer trip out of your visit.",
        "Additional nights are subject to hotel availability and booking conditions, and guests can arrange them directly with their chosen accommodation provider.",
      ]},
      { q: "What happens if the wedding room block fills up?", a: [
        "Our room block is first-come, first-served.",
        "Once it fills, additional rooms and the same group rates cannot be guaranteed.",
        "We recommend reserving your accommodation as soon as booking opens.",
      ]},
    ],
  },
  {
    id: "travel",
    label: "Travel & Weather",
    items: [
      { q: "Which airport should we fly into?", a: [
        "For international travelers, Boston Logan International Airport (BOS) is generally the most convenient major international gateway.",
        "Domestic travelers can consider either:",
        { heading: "Boston Logan International Airport (BOS)" },
        "Approximately 2–2.5 hours by car to Lincoln.",
        { heading: "Manchester-Boston Regional Airport (MHT)" },
        "Approximately 1.25–1.5 hours by car to Lincoln.",
        "Manchester is closer, while Boston generally offers a wider selection of flights.",
        "Please visit our [[Plan Your Trip|plan-your-trip]] section for additional information.",
      ]},
      { q: "Will we need to rent a car?", a: [
        "We strongly recommend having access to a car.",
        "Lincoln is a mountain destination, and having your own transportation makes it easier to travel from the airport and explore the surrounding White Mountains.",
        "We’re also exploring potential rental-car group rates for our wedding guests.",
        "More information will follow if discounted rates become available.",
      ]},
      { q: "Will transportation be provided during the wedding?", a: [
        "We’re planning a wedding-day shuttle between RiverWalk Resort and Loon Mountain.",
        "Further information about shuttle schedules and pickup arrangements will be shared closer to the wedding.",
        "Guests staying at other accommodations should plan their transportation accordingly.",
      ]},
      { q: "What will the weather be like in October?", a: [
        "October is one of the most beautiful times to visit New Hampshire!",
        "The mountains are usually surrounded by brilliant autumn foliage, but temperatures can be quite cool, especially in the mornings, evenings, and at higher elevations.",
        "Mountain weather can also change quickly, so we recommend packing layers.",
      ]},
      { q: "Will we need warm clothing?", a: [
        "Yes!",
        "We recommend bringing a warm jacket, layers, and comfortable shoes for exploring the area.",
        "The summit can be considerably cooler than the base of the mountain.",
        "We’ll share more specific guidance about wedding attire and dress codes closer to the date.",
      ]},
      { q: "Do international guests need any special travel documents?", a: [
        "International guests should check the passport, visa, and United States entry requirements applicable to their nationality and travel circumstances.",
        "If you’re planning to rent a car, please also check driver’s license and International Driving Permit requirements with your rental provider.",
        "We recommend making these arrangements well in advance.",
      ]},
      { q: "Should we expect traffic during Columbus Day weekend?", a: [
        "Yes, and we recommend planning accordingly!",
        "Columbus Day weekend is one of the busiest periods in the White Mountains because of the beautiful fall foliage.",
        "Roads can become congested, particularly around popular attractions and scenic routes.",
        "We recommend allowing extra travel time when driving to Lincoln.",
      ]},
    ],
  },
  {
    id: "experience",
    label: "The Wedding Experience",
    items: [
      { q: "What should we wear to the wedding celebrations?", a: [
        "We’re planning a mix of formal and relaxed celebrations throughout the three days.",
        "Each event will have its own dress code, and we’ll share specific attire guidance here on the website closer to the wedding.",
        "Because we’ll be celebrating in the mountains during October, we also recommend keeping the cooler weather in mind.",
      ]},
      { q: "Will the wedding ceremony take place outdoors?", a: [
        "Yes!",
        "Our ceremony is planned for Loon Mountain’s summit amphitheater, surrounded by the beautiful White Mountains.",
        "Guests will travel to the summit by gondola.",
        "Please keep in mind that temperatures at the summit may be cooler than at the base of the mountain.",
        "Additional ceremony and weather-related details will follow.",
      ]},
      { q: "Are the gondola rides included?", a: [
        "Yes! The mountain views are on us!",
        "As a little gift from us to you, we’re treating our wedding guests to complimentary scenic gondola rides on October 8, 2027.",
        "Loon Mountain is home to New Hampshire’s longest scenic gondola ride, ascending approximately 1,738 vertical feet to a summit 2,733 feet above sea level.",
        "It’s a beautiful way to experience the White Mountains and their spectacular autumn colors.",
        "More details about gondola access and operating hours will follow.",
      ]},
      { q: "Will food and drinks be served?", a: [
        "Absolutely!",
        "Food and refreshments will be part of our wedding celebrations.",
        "The cocktail hour will include drinks and hors d’oeuvres, followed by dinner and celebrations at the wedding reception.",
        "We’ll share additional details as the menus and arrangements are finalized.",
      ]},
      { q: "Will vegetarian food and other dietary options be available?", a: [
        "We’re planning to accommodate a variety of dietary preferences.",
        "We’ll collect information about dietary restrictions and allergies as part of the formal RSVP process.",
        "Please make sure to share any dietary requirements when that information is requested.",
      ]},
    ],
  },
  {
    id: "explore",
    label: "Explore the Mountains",
    items: [
      { q: "What is there to do around Lincoln and the White Mountains?", a: [
        "So much!",
        "From scenic drives and hiking trails to waterfalls, family-run eateries, and some of our favorite local spots, there’s plenty to explore.",
        "We’re putting together a personal guide to Lincoln and the surrounding White Mountains to help you make the most of your visit.",
        "Look for the [[Explore Our Lincoln, New Hampshire Guide|adventure]] on our [[Things To Do|things-to-do]] page once it’s ready.",
      ]},
      { q: "Should we book activities and restaurants in advance?", a: [
        "We strongly recommend it!",
        "October is peak foliage season, and Columbus Day weekend attracts visitors from across the region.",
        "Popular attractions, activities, and restaurants can become especially busy.",
        "If there’s something you’d particularly like to experience, we recommend checking availability and making reservations ahead of time.",
      ]},
      { q: "Can we extend our trip and explore New England?", a: [
        "Of course!",
        "We’d love for you to make an adventure of your time here.",
        "Whether you arrive early, stay a little longer, or explore other parts of New England, there’s so much to discover.",
        "Any additional travel, accommodations, transportation, and activities can be arranged independently.",
      ]},
    ],
  },
];
