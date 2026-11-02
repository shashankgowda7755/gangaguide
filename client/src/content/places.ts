/** Destinations (/destinations/<slug>) and the ghat map on the home page. */

export interface Place {
  slug: string;
  name: string;
  hindi: string;
  fromVaranasi: string;
  summary: string;
  body: string[];
  see: { name: string; note: string }[];
  bestTime: string;
  photo: string;
}

export const places: Place[] = [
  {
    slug: "varanasi",
    name: "Varanasi",
    hindi: "वाराणसी",
    fromVaranasi: "Base city",
    summary: "Kashi, Benares, Varanasi: one of the oldest living cities in the world, laid out along the west bank of the Ganga.",
    body: [
      "Varanasi sits on a bend of the Ganga where the river flows north. The city faces east, so the sun rises straight across the water onto the ghats, the long flights of stone steps that run down to the river for several kilometres.",
      "Most of what visitors come for happens on or near the river: the morning boat, the evening aarti at Dashashwamedh, the cremation fires at Manikarnika and Harishchandra, and the dense lanes of the old city just behind the ghats, where Kashi Vishwanath stands.",
      "The best way to understand the city is to see it twice: once from a boat at dawn, once on foot through the lanes.",
    ],
    see: [
      { name: "Dashashwamedh Ghat", note: "The main ghat and the site of the evening Ganga aarti." },
      { name: "Kashi Vishwanath", note: "The temple of Shiva at the centre of the old city." },
      { name: "Assi Ghat", note: "Southern end of the ghats; the morning aarti draws a local crowd." },
      { name: "Manikarnika Ghat", note: "The main cremation ghat. Watch quietly; no photography." },
      { name: "Sankat Mochan", note: "Hanuman temple associated with the poet-saint Tulsidas." },
    ],
    bestTime: "October to March. Summers are hot; during the monsoon the river rises and boat rides can be suspended.",
    photo: "The ghats seen from mid-river, early morning",
  },
  {
    slug: "sarnath",
    name: "Sarnath",
    hindi: "सारनाथ",
    fromVaranasi: "About 10 km",
    summary: "The deer park where the Buddha gave his first sermon after enlightenment.",
    body: [
      "Sarnath is a short drive from the ghats and a different world from them: lawns, ruins and quiet. It is where the Buddha gave his first sermon, setting in motion what Buddhists call the Wheel of Dharma.",
      "The Dhamek Stupa still stands over the excavated ruins of the old monasteries. The site museum holds the Lion Capital of Ashoka, the emblem on India's currency notes.",
    ],
    see: [
      { name: "Dhamek Stupa", note: "The great stupa marking the site of the first sermon." },
      { name: "Sarnath Archaeological Museum", note: "Home of the Lion Capital of Ashoka. Closed on Fridays." },
      { name: "Mulagandha Kuti Vihara", note: "Modern temple with murals of the Buddha's life." },
    ],
    bestTime: "Any time of year; mornings are cooler and quieter.",
    photo: "Dhamek Stupa with monks walking past",
  },
  {
    slug: "ayodhya",
    name: "Ayodhya",
    hindi: "अयोध्या",
    fromVaranasi: "About 200 km",
    summary: "The city of Lord Ram on the banks of the Saryu: Ram Janmabhoomi temple, Hanuman Garhi, Kanak Bhawan and the evening ghats.",
    body: [
      "Ayodhya is honoured as the birthplace of Lord Ram and is one of the seven sacred cities of Hindu tradition. Its temples and ghats line the Saryu river.",
      "Most visitors come for the Ram Janmabhoomi temple, then visit Hanuman Garhi, Kanak Bhawan and the Saryu ghats in the evening. The nearest large airports are Ayodhya and Lucknow; the city is also well connected by train.",
    ],
    see: [
      { name: "Ram Janmabhoomi temple", note: "Check the day's darshan timings and rules on items you can carry." },
      { name: "Hanuman Garhi", note: "Hilltop temple reached by a flight of steps." },
      { name: "Kanak Bhawan", note: "Temple dedicated to Sita and Ram." },
      { name: "Saryu ghats", note: "Evening aarti on the river." },
    ],
    bestTime: "October to March. Ram Navami (March or April) is the busiest festival.",
    photo: "Evening aarti on the Saryu ghats",
  },
  {
    slug: "prayagraj",
    name: "Prayagraj",
    hindi: "प्रयागराज",
    fromVaranasi: "About 120 km",
    summary: "The Triveni Sangam, where the Ganga meets the Yamuna and, in tradition, the hidden Saraswati.",
    body: [
      "Prayagraj, formerly Allahabad, holds the Triveni Sangam, the confluence of the Ganga and the Yamuna, joined in tradition by the unseen Saraswati. It is one of the four sites of the Kumbh Mela.",
      "A boat takes you out to the meeting point, where you can see the two rivers' different colours side by side. The fort and the Akshayavat, the immortal banyan, are close by.",
    ],
    see: [
      { name: "Triveni Sangam", note: "Boat out to the confluence for a holy dip or a prayer." },
      { name: "Akshayavat", note: "The sacred banyan inside the fort complex; check access on the day." },
      { name: "Anand Bhawan", note: "Former home of the Nehru family, now a museum." },
    ],
    bestTime: "October to March. Magh Mela (January–February) is busy every year; the Kumbh years far more so.",
    photo: "Boats at the Sangam, two rivers meeting",
  },
];

export const placeBySlug = (slug: string) => places.find((p) => p.slug === slug);

/** Ghats on the home-page map, south (Assi) to north (Raj Ghat). */
export interface Ghat {
  name: string;
  note: string;
  trip?: string; // trip slug
}

export const ghats: Ghat[] = [
  { name: "Assi", note: "Southern end. Morning aarti and music at dawn.", trip: "kashi-darshan-one-day" },
  { name: "Tulsi", note: "Where Tulsidas is said to have written much of the Ramcharitmanas." },
  { name: "Harishchandra", note: "One of the two cremation ghats. Watch quietly." },
  { name: "Kedar", note: "Striped red-and-white steps up to the Kedareshwar temple." },
  { name: "Dashashwamedh", note: "The evening Ganga aarti. Watch from the steps or a boat.", trip: "ganga-aarti-ritual" },
  { name: "Manikarnika", note: "The main cremation ghat, burning day and night. No photos.", trip: "kashi-darshan-one-day" },
  { name: "Scindia", note: "A half-sunken Shiva temple leaning into the river." },
  { name: "Panchganga", note: "Where five rivers are said to meet; Alamgir mosque above." },
  { name: "Raj Ghat", note: "Northern end, by the Malviya bridge. Ganga Mahotsav stage.", trip: "dev-deepawali" },
];
