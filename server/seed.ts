import { storage } from "./storage";
import { log } from "./vite";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingDestinations = await storage.getAllDestinations();
    if (existingDestinations.length > 0) {
      log("Database already seeded");
      return;
    }

    // Image paths - these will be served from the attached_assets folder
    const varanasi = "/attached_assets/generated_images/Boat_perspective_Ganges_view_e308dae7.png";
    const ayodhya = "/attached_assets/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png";
    const sarnath = "/attached_assets/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png";
    const prayagraj = "/attached_assets/generated_images/Prayagraj_Triveni_Sangam_confluence_c12597e6.png";
    
    const blog1 = "/attached_assets/generated_images/Morning_meditation_Ganges_sunrise_001c3280.png";
    const blog2 = "/attached_assets/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png";
    const blog3 = "/attached_assets/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png";
    
    const package1 = "/attached_assets/generated_images/Kashi_walking_tour_group_d0392eea.png";
    const package2 = "/attached_assets/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png";
    const package3 = "/attached_assets/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png";

    // Seed Destinations
    const varanasiDest = await storage.createDestination({
      name: "Varanasi",
      description: "Walk along the holy Ganga, witness morning aarti, and explore hidden alleys of the eternal city.\n\nVaranasi, also known as Kashi or Benares, is one of the world's oldest continuously inhabited cities. Situated on the banks of the sacred River Ganges, this spiritual capital of India offers an unparalleled blend of ancient traditions, vibrant culture, and profound spirituality.\n\nFrom the mesmerizing Ganga Aarti at Dashashwamedh Ghat to the narrow winding lanes filled with temples, from the famous Kashi Vishwanath Temple to the peaceful morning boat rides, Varanasi is a city that touches the soul of every visitor.",
      mainImage: varanasi,
      image2: null,
      image3: null,
      image4: null,
    });

    await storage.createDestination({
      name: "Ayodhya",
      description: "Dive into the legends of Lord Ram and experience age-old traditions firsthand.\n\nAyodhya, the birthplace of Lord Rama, is one of the most sacred pilgrimage sites in Hinduism. This ancient city, mentioned in the great epic Ramayana, stands as a testament to India's rich spiritual and cultural heritage.\n\nVisit the magnificent Ram Janmabhoomi temple, explore Hanuman Garhi, walk through Kanak Bhawan, and experience the serene Saryu Aarti. Ayodhya offers a journey through time, connecting you with thousands of years of devotion and tradition.",
      mainImage: ayodhya,
      image2: null,
      image3: null,
      image4: null,
    });

    await storage.createDestination({
      name: "Sarnath",
      description: "Visit the site where Buddha gave his first sermon, enriched with history and tranquility.\n\nSarnath holds immense significance in Buddhist history as the place where Lord Buddha delivered his first sermon after attaining enlightenment. Located just 10 kilometers from Varanasi, this peaceful town offers a stark contrast to the bustling ghats of the holy city.\n\nExplore the magnificent Dhamek Stupa, visit the archaeological museum housing ancient Buddhist artifacts, meditate in the serene Japanese temple, and walk the same ground where Buddha once taught the path to enlightenment.",
      mainImage: sarnath,
      image2: null,
      image3: null,
      image4: null,
    });

    await storage.createDestination({
      name: "Prayagraj",
      description: "Experience the sacred confluence of three holy rivers at Triveni Sangam.\n\nPrayagraj, formerly known as Allahabad, is renowned as the site of the Triveni Sangam - the confluence of three sacred rivers: Ganga, Yamuna, and the mystical Saraswati. This holy city hosts the world's largest religious gathering, the Kumbh Mela, which attracts millions of pilgrims.\n\nTake a boat ride to the Sangam, visit the historic Allahabad Fort, explore the ancient Akshayavat tree, and experience the spiritual energy that has drawn seekers and saints for millennia.",
      mainImage: prayagraj,
      image2: null,
      image3: null,
      image4: null,
    });

    // Seed Blog Posts
    await storage.createBlogPost({
      title: "Morning Aarti Through My Eyes",
      excerpt: "Experience the magic of dawn on the Ganges as ancient rituals come alive. Discover what makes this ceremony unforgettable.",
      content: "There's something profoundly moving about witnessing the morning aarti on the banks of the Ganges. As the first rays of sunlight paint the sky in hues of orange and pink, the ghats of Varanasi come alive with an ancient ritual that has been performed for thousands of years.\n\nThe ceremony begins with the ringing of bells and the chanting of mantras. Priests in traditional attire perform synchronized movements, offering fire, flowers, and incense to the river goddess. The air fills with the fragrance of camphor and sandalwood, while the rhythmic sound of conch shells echoes across the water.\n\nWhat makes the morning aarti truly special is not just the ritual itself, but the devotion of the people who gather here. From elderly sadhus who have performed this ritual every day for decades to young children experiencing it for the first time, everyone is united in reverence.\n\nAs you sit on the ghats, watching the sun rise over the holy river, you can't help but feel a connection to something greater than yourself. This is the magic of Varanasi - a city where the spiritual and temporal worlds seamlessly blend, where every sunrise brings renewal, and where ancient traditions continue to thrive in the modern world.",
      category: "Rituals",
      publishedDate: "Oct 15, 2025",
      readTime: "5 min read",
      mainImage: blog1,
      image2: null,
      image3: null,
      image4: null,
    });

    await storage.createBlogPost({
      title: "Top 5 Hidden Temples in Varanasi",
      excerpt: "Beyond the famous shrines lie secret temples with incredible stories. Here are our favorite hidden spiritual gems.",
      content: "While the Kashi Vishwanath Temple attracts millions of visitors, Varanasi is home to countless lesser-known temples, each with its own unique story and spiritual significance. Here are five hidden gems that offer a more intimate spiritual experience:\n\n1. Tulsi Manas Temple - Built in 1964, this temple is dedicated to Lord Rama and features walls inscribed with verses from the Ramcharitmanas. The peaceful atmosphere and beautiful architecture make it a perfect place for meditation.\n\n2. Nepali Temple - Also known as Kathwala Temple, this stunning shrine was built by the King of Nepal. Its unique wooden architecture with intricate carvings sets it apart from other temples in the city.\n\n3. Durga Temple - Known locally as the Monkey Temple, this 18th-century shrine is dedicated to Goddess Durga. Its distinctive red color and resident monkey population make it easily recognizable.\n\n4. Sankat Mochan Hanuman Temple - Founded by saint Tulsidas, this temple is dedicated to Lord Hanuman and is believed to relieve devotees from troubles.\n\n5. Mrityunjay Mahadev Temple - An ancient Shiva temple located on Manikarnika Ghat, it's believed that praying here can conquer death itself.\n\nEach of these temples offers a unique glimpse into the spiritual fabric of Varanasi. Take time to explore beyond the beaten path, and you'll discover the true essence of this sacred city.",
      category: "Heritage",
      publishedDate: "Oct 10, 2025",
      readTime: "7 min read",
      mainImage: blog2,
      image2: null,
      image3: null,
      image4: null,
    });

    await storage.createBlogPost({
      title: "Ayodhya Spiritual Trail: What You Need to Know",
      excerpt: "Planning a pilgrimage to Ayodhya? Our comprehensive guide covers everything from temples to local customs.",
      content: "Ayodhya, the birthplace of Lord Rama, has emerged as one of India's most significant pilgrimage destinations. Whether you're planning your first visit or returning to this sacred city, here's everything you need to know:\n\nBest Time to Visit:\nThe ideal time to visit Ayodhya is between October and March when the weather is pleasant. However, special occasions like Ram Navami (March-April) offer a unique cultural experience.\n\nMust-Visit Places:\n- Ram Janmabhoomi Temple: The newly constructed temple complex at the birthplace of Lord Rama\n- Hanuman Garhi: A fortress-like temple dedicated to Lord Hanuman\n- Kanak Bhawan: A beautiful temple gifted to Sita by Kaikeyi\n- Saryu River Ghats: Perfect for morning prayers and evening aarti\n\nLocal Customs:\n- Dress modestly when visiting temples\n- Remove shoes before entering temple premises\n- Photography may be restricted in certain areas\n- Participate respectfully in rituals and ceremonies\n\nGetting There:\nAyodhya is well-connected by rail and road. The nearest airport is in Lucknow (about 140 km away). We offer comfortable transportation from Varanasi to Ayodhya as part of our 3-day spiritual trail package.\n\nWhere to Stay:\nFrom budget guesthouses to comfortable hotels, Ayodhya offers accommodation options for all budgets. We can help arrange stays that suit your preferences.\n\nLocal Cuisine:\nDon't miss trying the local prasad, pedas, and traditional vegetarian meals served at temple complexes.\n\nPlan your Ayodhya pilgrimage with us to ensure a smooth, spiritually enriching experience. Our local guides will help you navigate the city's sacred sites while sharing stories and legends that bring the Ramayana to life.",
      category: "Travel Tips",
      publishedDate: "Oct 5, 2025",
      readTime: "10 min read",
      mainImage: blog3,
      image2: null,
      image3: null,
      image4: null,
    });

    // Seed Packages
    await storage.createPackage({
      name: "1-Day Kashi Darshan",
      duration: "1 Day",
      shortDescription: "Experience the essence of Varanasi in a single day with our expertly curated tour through sacred ghats and ancient temples.",
      highlights: [
        "Sunrise boat ride on the Ganges",
        "Visit to Kashi Vishwanath Temple",
        "Explore hidden alleys of old Varanasi",
        "Witness evening Ganga Aarti ceremony",
      ],
      imageUrl: package1,
      detailedDescription: "Immerse yourself in the spiritual essence of Varanasi with this comprehensive one-day journey through the ancient city of Kashi. Experience the magic of sunrise on the Ganges, visit the most sacred temples, explore the winding lanes of the old city, and witness the mesmerizing evening aarti ceremony.\n\nThis carefully curated tour takes you through the most significant spiritual and cultural landmarks of Varanasi, offering insights into the city's rich heritage and living traditions. Our experienced local guides will share stories and legends that bring the ancient city to life.",
      price: 2500,
    });

    await storage.createPackage({
      name: "2-Day Kashi + Sarnath",
      duration: "2 Days",
      shortDescription: "Combine the spiritual energy of Varanasi with the peaceful Buddhist heritage of Sarnath on this immersive journey.",
      highlights: [
        "Complete Varanasi tour with boat ride",
        "Explore Sarnath where Buddha gave first sermon",
        "Visit Dhamek Stupa and museums",
        "Morning meditation session by the Ganges",
      ],
      imageUrl: package2,
      detailedDescription: "Embark on a profound two-day spiritual expedition that connects the ancient traditions of Hinduism and Buddhism. This immersive experience combines the sacred ghats and temples of Varanasi with the historic Buddhist sites of Sarnath, offering a unique perspective on India's rich spiritual heritage.\n\nDay 1 covers the essential Varanasi experience, while Day 2 takes you to the serene Buddhist sites of Sarnath. This combination offers a complete spiritual journey through two of India's most significant religious sites.",
      price: 6500,
    });

    await storage.createPackage({
      name: "3-Day Ayodhya + Kashi Spiritual Trail",
      duration: "3 Days",
      shortDescription: "A comprehensive spiritual journey connecting the sacred cities of Ayodhya and Varanasi with expert local guidance.",
      highlights: [
        "Ram Janmabhoomi and major Ayodhya temples",
        "Hanuman Garhi and Kanak Bhawan",
        "Complete Varanasi heritage experience",
        "Sacred rituals participation opportunity",
      ],
      imageUrl: package3,
      detailedDescription: "Undertake a transformative three-day pilgrimage that weaves together two of India's most sacred cities. Journey from the birthplace of Lord Rama in Ayodhya to the eternal city of Kashi, experiencing the profound spiritual energy that has drawn seekers for millennia.\n\nThis carefully designed itinerary balances temple visits, cultural experiences, and moments of personal reflection. You'll explore the major sites of both cities, participate in sacred rituals, and gain deep insights into Hindu traditions and philosophy from our knowledgeable local guides.",
      price: 12500,
    });

    log("Database seeded successfully with destinations, blog posts, and packages");
  } catch (error) {
    log("Error seeding database: " + error);
  }
}
