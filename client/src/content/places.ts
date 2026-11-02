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
      { name: "Assi Ghat", note: "Southern end of the ghats, and home of the dawn aarti, Subah-e-Banaras." },
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
      "The emperor Ashoka raised a pillar and stupas here in the 3rd century BCE. The pillar's lion capital was dug up in excavations in the early 1900s and became India's national emblem in 1950. Most of the Dhamek Stupa you see today dates from the Gupta period, around the 5th to 6th century CE.",
      "On the road in from Varanasi, the Chaukhandi Stupa marks the place where the Buddha is said to have met his five former companions; the octagonal brick tower on top was added in 1588, in Akbar's time. Around the deer park are temples built by Buddhist communities from Thailand, Tibet, Japan and Sri Lanka, and a Jain temple for Shreyansanath, the eleventh tirthankara, who is associated with Sarnath.",
      "Sarnath is about 30 to 45 minutes by road from the ghats, depending on traffic. Half a day is enough for the stupas, the ruins and the museum, so it pairs well with a morning boat ride or an evening aarti in Varanasi. Buddha Purnima, in April or May, is the main festival.",
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
      "The new Ram Janmabhoomi temple was consecrated on 22 January 2024 and draws very large crowds, especially at weekends and on festival days. Mobile phones, bags and electronics have generally not been allowed inside; there are lockers near the entry. Rules and timings change, so check on the day.",
      "By road, Ayodhya is about 200 km from Varanasi, usually four to five hours each way, which is why we plan it as an overnight stay rather than a day trip. Ayodhya Dham railway station and Maharishi Valmiki International Airport both serve the city.",
      "Beyond the main temple, Ram ki Paidi is a long stretch of steps and channels on the Saryu where the evening aarti is held, and where lakhs of diyas are lit for Deepotsav on the eve of Diwali. Guptar Ghat, a little upstream, is where tradition holds that Ram entered the Saryu at the end of his life.",
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
    fromVaranasi: "About 125 km",
    summary: "The Triveni Sangam, where the Ganga meets the Yamuna and, in tradition, the hidden Saraswati.",
    body: [
      "Prayagraj, formerly Allahabad, holds the Triveni Sangam, the confluence of the Ganga and the Yamuna, joined in tradition by the unseen Saraswati. It is one of the four sites of the Kumbh Mela.",
      "A boat takes you out to the meeting point, where you can see the two rivers' different colours side by side. The fort and the Akshayavat, the immortal banyan, are close by.",
      "The city was renamed from Allahabad to Prayagraj in 2018. The Mughal emperor Akbar built the fort at the Sangam in 1583; most of it is still used by the army, but the Patalpuri temple and the Akshayavat inside can be visited when open. Just outside the fort, the Bade Hanuman temple has a large reclining image of Hanuman.",
      "Every January and February the Magh Mela brings pilgrims to camp on the sandbanks. The Kumbh Mela comes round every twelve years, with an Ardh Kumbh in between; the most recent Maha Kumbh was held from January to February 2025. In those weeks the city is far busier and roads around the Sangam close to traffic.",
      "Prayagraj is about 125 km from Varanasi, two and a half to three hours by road, so the Sangam can be done as a long day trip. Go early: the river is calmer, the light is softer and the boats are less crowded.",
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
  { name: "Raj Ghat", note: "Northern end of the main run of ghats.", trip: "dev-deepawali" },
];
