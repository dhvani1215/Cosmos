
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  category: string;
  visualizationType?: 'orbit' | 'moon-phases' | 'star-map' | null;
  visualizationData?: any;
  author: {
    name: string;
    avatar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Planetary Orbits',
    slug: 'understanding-planetary-orbits',
    excerpt: 'Explore how planets move around the sun and what factors influence their orbits.',
    content: `
      <h2>The Elliptical Path</h2>
      <p>Contrary to popular belief, planets don't orbit in perfect circles. Johannes Kepler discovered in the early 17th century that planets actually move in elliptical orbits with the sun at one of the foci.</p>
      
      <p>This elliptical motion creates varying distances between a planet and the sun throughout its orbit. The point where a planet is closest to the sun is called perihelion, while the farthest point is called aphelion.</p>
      
      <h2>Kepler's Laws of Planetary Motion</h2>
      <p>Kepler formulated three laws that describe planetary motion:</p>
      <ul>
        <li><strong>First Law:</strong> The orbit of a planet is an ellipse with the Sun at one of the two foci.</li>
        <li><strong>Second Law:</strong> A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time.</li>
        <li><strong>Third Law:</strong> The square of the orbital period of a planet is directly proportional to the cube of the semi-major axis of its orbit.</li>
      </ul>
      
      <h2>Factors Influencing Orbits</h2>
      <p>Several factors influence a planet's orbit:</p>
      <ul>
        <li><strong>Gravitational pull:</strong> The sun's gravity is the primary force keeping planets in orbit.</li>
        <li><strong>Initial velocity:</strong> A planet's original velocity when the solar system formed affects its orbit.</li>
        <li><strong>Mass interactions:</strong> Other planets' gravitational forces cause small perturbations in each other's orbits.</li>
      </ul>
      
      <p>Try the interactive visualization below to see how these factors affect planetary orbits.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700',
    publishedAt: '2023-10-15',
    category: 'Planetary Science',
    visualizationType: 'orbit',
    visualizationData: {
      planets: [
        { name: 'Mercury', distance: 0.4, speed: 4.1, color: '#A9A9A9' },
        { name: 'Venus', distance: 0.7, speed: 3.1, color: '#FFCC99' },
        { name: 'Earth', distance: 1, speed: 2.6, color: '#4facfe' },
        { name: 'Mars', distance: 1.5, speed: 2.1, color: '#FF6347' }
      ]
    },
    author: {
      name: 'Dr. Jane Parker',
      avatar: 'https://i.pravatar.cc/150?img=32'
    }
  },
  {
    id: '2',
    title: 'The Moon\'s Changing Faces',
    slug: 'the-moons-changing-faces',
    excerpt: 'Learn about the phases of the moon and why it appears to change shape throughout the month.',
    content: `
      <h2>Why The Moon Changes Shape</h2>
      <p>The moon doesn't actually change shape—it's all about perspective and sunlight! The moon orbits around Earth, and as it does so, the angle between the Earth, Moon, and Sun changes, which causes the moon to appear different to us on Earth.</p>
      
      <p>The moon is always half-illuminated by the sun (except during lunar eclipses). What changes is how much of that illuminated half we can see from Earth.</p>
      
      <h2>The Eight Main Phases</h2>
      <p>We typically recognize eight distinct phases of the moon:</p>
      <ul>
        <li><strong>New Moon:</strong> The side facing Earth is not illuminated. The moon is "invisible."</li>
        <li><strong>Waxing Crescent:</strong> A small crescent of light appears on the right (in the Northern Hemisphere).</li>
        <li><strong>First Quarter:</strong> The right half of the moon appears illuminated.</li>
        <li><strong>Waxing Gibbous:</strong> More than half but not all of the moon is illuminated, increasing from the right.</li>
        <li><strong>Full Moon:</strong> The entire face of the moon visible from Earth is illuminated.</li>
        <li><strong>Waning Gibbous:</strong> More than half the moon is illuminated, but decreasing from the left.</li>
        <li><strong>Last Quarter:</strong> The left half of the moon appears illuminated.</li>
        <li><strong>Waning Crescent:</strong> A small crescent of light remains on the left before returning to New Moon.</li>
      </ul>
      
      <h2>The Lunar Cycle</h2>
      <p>It takes about 29.5 days for the moon to complete one full cycle of phases. This is known as a lunar month or synodic month.</p>
      
      <p>Use the interactive visualization below to see how the moon's appearance changes throughout its orbit around Earth.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe',
    publishedAt: '2023-10-10',
    category: 'Lunar Astronomy',
    visualizationType: 'moon-phases',
    visualizationData: {
      cycleLength: 29.5,
      initialPhase: 0
    },
    author: {
      name: 'Prof. Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=68'
    }
  },
  {
    id: '3',
    title: 'Black Holes: The Universe\'s Most Extreme Objects',
    slug: 'black-holes-universes-most-extreme-objects',
    excerpt: 'Discover what black holes are, how they form, and their mind-bending effects on space and time.',
    content: `
      <h2>What Is a Black Hole?</h2>
      <p>A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it. The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole.</p>
      
      <h2>Formation</h2>
      <p>Black holes form when very massive stars die. When these stars run out of fuel, they collapse under their own gravity, sometimes triggering a supernova explosion. What remains can become a black hole if the core's mass is large enough (typically more than 3 times the mass of our Sun).</p>
      
      <h2>Structure</h2>
      <p>A black hole has several components:</p>
      <ul>
        <li><strong>Event Horizon:</strong> The boundary beyond which nothing can escape. Once something crosses this threshold, it's theoretically impossible for it to exit the black hole.</li>
        <li><strong>Singularity:</strong> The center of a black hole where matter is crushed to infinite density and zero volume.</li>
        <li><strong>Accretion Disk:</strong> A disk of gas, dust, and other materials that orbit and eventually fall into the black hole.</li>
      </ul>
      
      <h2>Types of Black Holes</h2>
      <p>Scientists classify black holes into several categories:</p>
      <ul>
        <li><strong>Stellar Black Holes:</strong> Formed by the collapse of massive stars, typically 10-100 times the mass of our sun.</li>
        <li><strong>Supermassive Black Holes:</strong> Found at the centers of most galaxies, including our Milky Way, with masses millions or billions of times greater than the sun.</li>
        <li><strong>Intermediate Black Holes:</strong> With masses between stellar and supermassive black holes, these are rarer and less understood.</li>
        <li><strong>Primordial Black Holes:</strong> Hypothetical black holes formed in the high-density environment of the early universe.</li>
      </ul>
      
      <p>Black holes continue to challenge our understanding of physics and the universe, making them one of the most fascinating objects to study in astronomy.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
    publishedAt: '2023-09-22',
    category: 'Astrophysics',
    visualizationType: null,
    author: {
      name: 'Dr. Sarah Williams',
      avatar: 'https://i.pravatar.cc/150?img=23'
    }
  },
  {
    id: '4',
    title: 'Navigating the Night Sky: A Beginner\'s Guide',
    slug: 'navigating-the-night-sky-beginners-guide',
    excerpt: 'Learn how to identify constellations, planets, and other celestial objects visible to the naked eye.',
    content: `
      <h2>Getting Started</h2>
      <p>Stargazing is an accessible hobby that requires minimal equipment to begin. All you need is a clear night, a comfortable spot away from light pollution, and perhaps a simple star chart or smartphone app.</p>
      
      <h2>Finding Your Bearings</h2>
      <p>The first step in navigating the night sky is to find some reference points:</p>
      <ul>
        <li><strong>The North Star (Polaris):</strong> In the Northern Hemisphere, Polaris remains fixed in the sky while other stars appear to rotate around it. Find the Big Dipper and follow the two stars at the end of its "bowl" to locate Polaris.</li>
        <li><strong>The Big Dipper:</strong> Part of Ursa Major (the Great Bear), this is one of the most recognizable patterns in the northern sky.</li>
        <li><strong>The Southern Cross:</strong> In the Southern Hemisphere, this constellation serves as a useful navigation tool.</li>
      </ul>
      
      <h2>Seasonal Constellations</h2>
      <p>Different constellations are visible during different seasons:</p>
      <ul>
        <li><strong>Spring:</strong> Leo, Virgo, Bootes</li>
        <li><strong>Summer:</strong> Cygnus, Lyra, Aquila (the Summer Triangle)</li>
        <li><strong>Autumn:</strong> Pegasus, Andromeda, Perseus</li>
        <li><strong>Winter:</strong> Orion, Taurus, Gemini, Canis Major</li>
      </ul>
      
      <h2>Identifying Planets</h2>
      <p>Planets usually appear as bright "stars" that don't twinkle. The easiest planets to spot with the naked eye are:</p>
      <ul>
        <li><strong>Venus:</strong> The brightest planet, often visible at dawn or dusk.</li>
        <li><strong>Jupiter:</strong> Very bright, often the second-brightest object in the night sky after the moon.</li>
        <li><strong>Mars:</strong> Recognizable by its reddish hue.</li>
        <li><strong>Saturn:</strong> Appears as a yellowish "star."</li>
      </ul>
      
      <p>With practice, you'll be able to identify dozens of constellations and celestial objects, opening up a lifetime of enjoyment exploring the night sky.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1',
    publishedAt: '2023-09-05',
    category: 'Observational Astronomy',
    visualizationType: null,
    author: {
      name: 'Robert Johnson',
      avatar: 'https://i.pravatar.cc/150?img=11'
    }
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRecentPosts = (count: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};
