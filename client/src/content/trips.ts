/**
 * Trips. Slugs are permanent URLs (/packages/<slug>) — never rename one without a redirect.
 * Prices are the "from" figures the owner gave in the first build. Inclusions, pickup
 * points and group sizes are confirmed with each traveller on WhatsApp; nothing here
 * promises more than that.
 */

export type TripCategory = "day-trips" | "pooja" | "festivals";

export interface Trip {
  slug: string;
  name: string;
  category: TripCategory;
  duration: string;
  durationISO: string;
  priceFrom: number;
  summary: string;
  highlights: string[];
  body: string[];
  places: string[]; // destination slugs
  photo: string; // what the photo should show, until a real one is supplied
  note?: string;
}

export const categories: Record<TripCategory, { title: string; blurb: string }> = {
  "day-trips": {
    title: "Day trips and trails",
    blurb: "Boat, ghats, lanes and temples, from a single day in Kashi to a three-day trail with Ayodhya.",
  },
  pooja: {
    title: "Pooja and rituals",
    blurb: "Rituals done with a priest who explains each step, at the ghat or the temple.",
  },
  festivals: {
    title: "Festival trips",
    blurb: "Ramlila at Ramnagar and Dev Deepawali on the ghats. Dates follow the Hindu calendar.",
  },
};

export const trips: Trip[] = [
  {
    slug: "kashi-darshan-one-day",
    name: "One day in Kashi",
    category: "day-trips",
    duration: "1 day",
    durationISO: "P1D",
    priceFrom: 2500,
    summary: "Sunrise boat, the old lanes, Kashi Vishwanath and the evening aarti, in one unhurried day.",
    highlights: [
      "Sunrise boat ride from Assi towards Manikarnika",
      "Walk through the lanes behind Dashashwamedh",
      "Kashi Vishwanath darshan (queue or ticketed entry, as available that day)",
      "Evening Ganga aarti at Dashashwamedh",
    ],
    body: [
      "The day starts on the water before sunrise, when the ghats are at their quietest. Your guide names each ghat as the boat passes and tells you what happens there, from the morning aarti at Assi to the fires at Manikarnika.",
      "After breakfast you walk the lanes of the old city on foot, then go for darshan at Kashi Vishwanath. Queues change by the hour and by season; your guide will tell you on the day which entry makes sense.",
      "The afternoon is kept light. In the evening you watch the Ganga aarti at Dashashwamedh, from the steps or from a boat.",
    ],
    places: ["varanasi"],
    photo: "Sunrise from a rowing boat, ghats in soft light",
  },
  {
    slug: "kashi-and-sarnath-two-days",
    name: "Kashi and Sarnath",
    category: "day-trips",
    duration: "2 days",
    durationISO: "P2D",
    priceFrom: 6500,
    summary: "Day one on the ghats of Varanasi, day two at Sarnath, where the Buddha gave his first sermon.",
    highlights: [
      "Everything in the one-day Kashi route",
      "Dhamek Stupa and the excavated monastery ruins at Sarnath",
      "Sarnath Archaeological Museum (closed on Fridays)",
      "Quiet morning by the river before you leave",
    ],
    body: [
      "Day one follows the one-day Kashi route: sunrise boat, the lanes, darshan and the evening aarti.",
      "Day two is slower. Sarnath is about 10 km north-east of the city. You see the Dhamek Stupa, the ruins of the old monasteries and the museum, which holds the Lion Capital of Ashoka. The museum is closed on Fridays, so plan the day around that.",
    ],
    places: ["varanasi", "sarnath"],
    photo: "Dhamek Stupa at Sarnath, late afternoon",
  },
  {
    slug: "ayodhya-and-kashi-three-days",
    name: "Ayodhya and Kashi trail",
    category: "day-trips",
    duration: "3 days",
    durationISO: "P3D",
    priceFrom: 12500,
    summary: "Two sacred cities in three days: Ram Janmabhoomi, Hanuman Garhi and the Saryu, then the ghats of Kashi.",
    highlights: [
      "Ram Janmabhoomi temple, Hanuman Garhi and Kanak Bhawan",
      "Evening on the Saryu ghats",
      "The one-day Kashi route",
      "Road transfer between the two cities",
    ],
    body: [
      "Ayodhya and Varanasi are about 200 km apart by road. The trail gives each city its own unhurried time, with the drive in between.",
      "In Ayodhya you visit the Ram Janmabhoomi temple, Hanuman Garhi and Kanak Bhawan, and spend the evening on the Saryu. In Varanasi you follow the one-day Kashi route.",
      "Which city comes first depends on where you arrive. Tell us your train or flight and we will suggest the order.",
    ],
    places: ["ayodhya", "varanasi"],
    photo: "Saryu ghats in Ayodhya at dusk",
  },
  {
    slug: "ganga-aarti-ritual",
    name: "Ganga aarti ritual",
    category: "pooja",
    duration: "Half day",
    durationISO: "PT4H",
    priceFrom: 1500,
    summary: "Offer your own aarti to the Ganga with a priest who explains each step.",
    highlights: [
      "Ritual done with a priest at the ghat",
      "Meaning of each step and mantra explained in Hindi or English",
      "Offering of flowers and diya to the river",
      "Prasad at the end",
    ],
    body: [
      "This is not the large public aarti you watch from the steps. It is a small ritual done for you and your family, with a priest who explains what each step means.",
      "Tell us the occasion when you enquire, whether it is a birthday, a remembrance or simply a visit, and the priest will prepare for it.",
    ],
    places: ["varanasi"],
    photo: "Hands offering a leaf-boat diya to the river",
  },
  {
    slug: "temple-pooja-day",
    name: "Temple pooja day",
    category: "pooja",
    duration: "1 day",
    durationISO: "P1D",
    priceFrom: 5000,
    summary: "Darshan and pooja at Kashi Vishwanath and Sankat Mochan, with Rudrabhishek arranged through the temple.",
    highlights: [
      "Kashi Vishwanath darshan",
      "Rudrabhishek, booked through the temple's own process",
      "Sankat Mochan Hanuman temple",
      "A priest with you through the day",
    ],
    body: [
      "A day for devotees. Your guide and priest take you through darshan and pooja at the temples you choose, with Kashi Vishwanath and Sankat Mochan at the centre.",
      "Rudrabhishek and other rituals inside the temple are booked through the temple's own system and timings. We help you book them; we do not sell special access.",
    ],
    places: ["varanasi"],
    photo: "Temple bells and marigolds at Sankat Mochan",
  },
  {
    slug: "ramnagar-ramlila",
    name: "Ramnagar Ramlila evening",
    category: "festivals",
    duration: "1 day",
    durationISO: "P1D",
    priceFrom: 3500,
    summary: "The month-long open-air Ramlila of Ramnagar, performed without microphones or electric light.",
    highlights: [
      "Ramlila performed across open-air sites in Ramnagar",
      "Listed by UNESCO as intangible cultural heritage (Ramlila tradition)",
      "Guide who narrates the episode of the evening",
      "Return to the ghats after the performance",
    ],
    body: [
      "Every year, around Dussehra, the Ramlila of Ramnagar plays out over about a month, each episode staged at a different site across the town. There are no microphones and no electric lights; the audience walks with the story.",
      "Your guide explains the episode of that evening before it begins, so you can follow the Ramcharitmanas even if you do not know the text.",
    ],
    places: ["varanasi"],
    photo: "Ramlila crowd at Ramnagar, lamp-lit stage",
    note: "Dates follow the Hindu calendar and change every year. We confirm the evening's episode when you enquire.",
  },
  {
    slug: "dev-deepawali",
    name: "Dev Deepawali on the ghats",
    category: "festivals",
    duration: "3 days",
    durationISO: "P3D",
    priceFrom: 8500,
    summary: "Kartik Purnima, when the ghats are lined with diyas, seen from the river.",
    highlights: [
      "Ganga Mahotsav cultural programmes in the days before",
      "Dev Deepawali evening on Kartik Purnima",
      "Boat on the river for the evening of lamps",
      "Morning boat the next day, when the ghats are quiet again",
    ],
    body: [
      "On Kartik Purnima, the full moon of the month of Kartik, the ghats of Varanasi are lined with earthen lamps from end to end. In the days before, the Ganga Mahotsav brings music and dance to the riverfront.",
      "Boats and rooms book out early for this week. Enquire as soon as you know your dates.",
    ],
    places: ["varanasi"],
    photo: "Ghats lined with diyas on Dev Deepawali, from a boat",
    note: "Dates follow the Hindu calendar and change every year. Boats and stays book out early.",
  },
];

export const tripBySlug = (slug: string) => trips.find((t) => t.slug === slug);

export function formatPrice(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
