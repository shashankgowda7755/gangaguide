/** Journal posts (/journal/<slug>) and FAQs. Written by the team; no invented authors. */

export interface Post {
  slug: string;
  title: string;
  description: string;
  published: string; // ISO date
  updated: string;
  tag: string;
  photo: string;
  sections: { heading?: string; paras?: string[]; list?: string[] }[];
}

export const posts: Post[] = [
  {
    slug: "morning-aarti-on-the-ganga",
    title: "The morning aarti on the Ganga",
    description: "What happens at the dawn aarti at Assi Ghat, when to arrive, and how to watch it well.",
    published: "2025-10-15",
    updated: "2026-11-02",
    tag: "Rituals",
    photo: "Morning aarti at Assi Ghat, lamps against a pale sky",
    sections: [
      {
        paras: [
          "Most visitors know the evening aarti at Dashashwamedh: crowds, bells, boats packed close together. Fewer know that the day also begins with an aarti, at Assi Ghat at the southern end of the city, while the river is still grey.",
          "It is smaller and quieter. Since 2014 it has run as a morning programme called Subah-e-Banaras.",
        ],
      },
      {
        heading: "What you will see",
        paras: [
          "Priests stand in a row facing the river with brass lamps, turning them in slow circles while mantras are sung. Conch shells are blown, incense and camphor are lit, flowers go into the water. As the light comes up, the programme often moves on to music and yoga on the steps.",
        ],
      },
      {
        heading: "When to arrive",
        paras: [
          "The aarti starts before sunrise, so the time shifts through the year: earlier in summer, later in winter. Aim to be on the steps about 45 minutes before sunrise. Your guide will give you the exact time for your date.",
        ],
      },
      {
        heading: "How to watch it well",
        list: [
          "Sit a few steps up rather than at the front; you see the whole row of priests.",
          "Keep your phone low and the flash off. People here are praying.",
          "Take the sunrise boat straight after. The light on the ghats is best in the first hour.",
          "Carry a shawl from November to February. The river is cold at dawn.",
        ],
      },
    ],
  },
  {
    slug: "five-quiet-temples-in-varanasi",
    title: "Five quiet temples in Varanasi",
    description: "Beyond Kashi Vishwanath: five temples worth the detour, and how to fit them into a day.",
    published: "2025-10-10",
    updated: "2026-11-02",
    tag: "Heritage",
    photo: "Carved wooden struts of the Nepali temple",
    sections: [
      {
        paras: [
          "Kashi Vishwanath draws the crowds, and rightly. But Varanasi has hundreds of temples, and some of the most rewarding are a short rickshaw ride away and almost empty in the afternoon.",
        ],
      },
      {
        heading: "1. Tulsi Manas Mandir",
        paras: ["A white marble temple completed in 1964, dedicated to Ram and named after Tulsidas, who wrote the Ramcharitmanas."],
      },
      {
        heading: "2. Nepali Temple",
        paras: [
          "Built by the royal family of Nepal in the nineteenth century, close to Lalita Ghat. It is a wooden, pagoda-style temple modelled on Pashupatinath in Kathmandu.",
        ],
      },
      {
        heading: "3. Durga Temple, Durga Kund",
        paras: ["An eighteenth-century temple painted deep red, beside its own tank. It is busiest during Navratri."],
      },
      {
        heading: "4. Sankat Mochan Hanuman Temple",
        paras: [
          "Associated with the poet-saint Tulsidas, and much loved in the city. Tuesdays and Saturdays are the busy days. Around Hanuman Jayanti in April, the free Sankat Mochan Sangeet Samaroh fills the courtyard with music for six nights.",
        ],
      },
      {
        heading: "5. Bharat Mata Mandir",
        paras: [
          "Not a temple to a deity but to the land: a large relief map of undivided India carved in marble, inaugurated by Mahatma Gandhi in 1936. It is inside the Mahatma Gandhi Kashi Vidyapith campus.",
        ],
      },
      {
        heading: "Fitting them into a day",
        paras: [
          "Tulsi Manas, Durga Kund and Sankat Mochan are close together in the south of the city and make an easy afternoon. The Nepali temple fits into a morning walk along the ghats.",
        ],
      },
    ],
  },
  {
    slug: "planning-a-trip-to-ayodhya",
    title: "Planning a trip to Ayodhya",
    description: "When to go, what to see, what to carry, and how to combine Ayodhya with Varanasi.",
    published: "2025-10-05",
    updated: "2026-11-02",
    tag: "Travel tips",
    photo: "Hanuman Garhi steps in the morning",
    sections: [
      {
        heading: "When to go",
        paras: [
          "October to March is the comfortable season. Ram Navami, in March or April, and Deepotsav around Diwali are the big festivals; the city is at its most crowded then, and rooms book out.",
        ],
      },
      {
        heading: "What to see",
        list: [
          "Ram Janmabhoomi temple. Check the day's darshan timings and the rules on phones and bags before you go.",
          "Hanuman Garhi, a hilltop temple reached by a flight of steps.",
          "Kanak Bhawan, dedicated to Sita and Ram.",
          "The Saryu ghats, for the evening aarti.",
        ],
      },
      {
        heading: "Temple etiquette",
        list: [
          "Dress modestly and remove shoes where asked.",
          "Photography is not allowed in many inner areas.",
          "Expect security checks; carry as little as you can.",
        ],
      },
      {
        heading: "Two days, unhurried",
        paras: [
          "Day one: leave Varanasi early and reach Ayodhya by early afternoon. Many pilgrims visit Hanuman Garhi first, then Kanak Bhawan. Finish at Ram ki Paidi for the evening aarti on the Saryu.",
          "Day two: go to the Ram Janmabhoomi temple early, when the queues are usually shorter. Leave your phone and bag in the car or at the lockers. After darshan, stop at Guptar Ghat on the way out, then drive back to Varanasi or on to Lucknow.",
        ],
      },
      {
        heading: "What to carry",
        list: [
          "A government photo ID for each person.",
          "Some cash in small notes for offerings, prasad and lockers.",
          "Shoes that are easy to take off and put back on.",
          "Water, and a light shawl or stole for early mornings in winter.",
        ],
      },
      {
        heading: "Getting there",
        paras: [
          "Ayodhya has its own airport and a railway station, and Lucknow is a few hours away by road. From Varanasi it is about 200 km, most easily done by car.",
          "Our three-day Ayodhya and Kashi trail includes the road transfer between the two cities.",
        ],
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const faqs: { q: string; a: string }[] = [
  {
    q: "How do I book a trip?",
    a: "Send the enquiry form or message us on WhatsApp with your dates and group size. We reply with a plan and a price. You pay nothing until you have confirmed both.",
  },
  {
    q: "Are the prices per person?",
    a: "The prices on this site are starting prices. What is included and whether the price is per person or per group depend on the trip and your dates; we confirm both in writing before you pay.",
  },
  {
    q: "When is the best time to visit Varanasi?",
    a: "October to March. Mornings are cool and clear. April to June is very hot. During the monsoon (roughly July to September) the river rises and the authorities can stop boat rides for days at a time.",
  },
  {
    q: "Can I take photos at the cremation ghats?",
    a: "No. Photography at Manikarnika and Harishchandra ghats is considered deeply disrespectful to the families there. You can watch quietly from a distance or from the boat.",
  },
  {
    q: "Can I take my phone into Kashi Vishwanath?",
    a: "Phones, cameras and other electronics are not allowed inside the temple. There are lockers near the gates; your guide will show you where.",
  },
  {
    q: "Can you help with stays and transport?",
    a: "Yes. Tell us your budget and arrival details in the enquiry and we will suggest stays near the ghats and arrange local transport.",
  },
];
