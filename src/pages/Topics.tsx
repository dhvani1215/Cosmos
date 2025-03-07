
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Moon, Sun, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

// NASA API fetch functions
const fetchAPOD = async () => {
  try {
    const response = await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
    );
    if (!response.ok) throw new Error('Failed to fetch APOD');
    return response.json();
  } catch (error) {
    console.error('Error fetching APOD:', error);
    throw error;
  }
};

// NASA Mars Rovers fetch function
const fetchMarsPhotos = async () => {
  try {
    const response = await fetch(
      'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=DEMO_KEY'
    );
    if (!response.ok) throw new Error('Failed to fetch Mars photos');
    const data = await response.json();
    return data.photos.slice(0, 5); // Just take the first 5 photos
  } catch (error) {
    console.error('Error fetching Mars photos:', error);
    throw error;
  }
};

const Topics = () => {
  const { theme } = useTheme();
  
  const { data: apodData, isLoading: apodLoading } = useQuery({
    queryKey: ['apod'],
    queryFn: fetchAPOD,
  });
  
  const { data: marsPhotos, isLoading: marsLoading } = useQuery({
    queryKey: ['mars-photos'],
    queryFn: fetchMarsPhotos,
  });
  
  const topicRefs = {
    planets: useRef<HTMLDivElement>(null),
    moons: useRef<HTMLDivElement>(null),
    stars: useRef<HTMLDivElement>(null),
    galaxies: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: keyof typeof topicRefs) => {
    topicRefs[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-space-black' : 'bg-light-gradient'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={`relative pt-20 pb-16 ${theme === 'dark' ? 'bg-gradient-to-b from-space-black to-space-deep-blue' : 'bg-gradient-to-b from-light-black to-light-blue'}`}>
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <ThemeToggle />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6">
              Astronomy Topics
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Explore our collection of interactive astronomy topics, from planetary orbits to galactic structures.
            </p>
            
            {/* Topic quick navigation */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {Object.entries(topicRefs).map(([key, _]) => (
                <Button 
                  key={key}
                  variant="outline"
                  className={`${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'} rounded-full px-6`}
                  onClick={() => scrollToSection(key as keyof typeof topicRefs)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* NASA APOD Feature */}
        {apodData && !apodLoading && (
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="relative aspect-video">
                {apodData.media_type === 'image' ? (
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    src={apodData.url}
                    title={apodData.title}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                )}
                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-space-black/90 to-transparent' : 'bg-gradient-to-t from-space-light-black/90 to-transparent'}`}></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                    NASA Astronomy Picture of the Day
                  </h3>
                  <h4 className="text-lg md:text-xl font-medium text-white mb-4">
                    {apodData.title}
                  </h4>
                  <p className="text-white/80">{apodData.explanation.substring(0, 200)}...</p>
                  <div className="mt-4">
                    <a 
                      href={apodData.hdurl || apodData.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 inline-flex items-center"
                    >
                      View Full Size
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      
      {/* Planetary Orbits Section */}
      <section 
        ref={topicRefs.planets}
        className={`py-20 ${theme === 'dark' ? 'bg-space-black' : 'bg-light-black'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 text-primary" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="12" r="8" />
                <ellipse cx="12" cy="12" rx="10" ry="4" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-heading">Planetary Orbits</h2>
            </div>
            
            <div className="glass-card rounded-xl p-8 mb-12">
              <p className="text-lg text-muted-foreground mb-6">
                The planets in our solar system orbit the Sun in elliptical paths. The closer a planet is to the Sun, the faster it orbits. This relationship is described by Kepler's laws of planetary motion.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Key Concepts</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Planets orbit in ellipses with the Sun at one focus</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>A planet's orbital speed varies with distance from the Sun</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>The square of the orbital period is proportional to the cube of the semi-major axis</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Interesting Facts</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Mercury completes an orbit in just 88 Earth days</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Pluto's orbit is highly elliptical and inclined</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Earth's orbit varies slightly over 100,000-year cycles</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Link to="/planetary-orbits-interactive">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6">
                    Explore Interactive Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Moon Phases Section */}
      <section 
        ref={topicRefs.moons}
        className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-b from-space-black to-space-deep-blue' : 'bg-gradient-to-b from-light-black to-light-blue'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <Moon className="mr-3 text-primary" size={28} />
              <h2 className="text-3xl md:text-4xl font-heading">Moon Phases</h2>
            </div>
            
            <div className="glass-card rounded-xl p-8 mb-12">
              <p className="text-lg text-muted-foreground mb-6">
                The Moon's appearance changes throughout its orbit around Earth, creating the lunar phases we observe. These phases depend on the relative positions of the Earth, Moon, and Sun.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Lunar Phases</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>New Moon: The Moon is between Earth and Sun</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>First Quarter: Half of the Moon's visible side is illuminated</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Full Moon: The Moon is on the opposite side of Earth from the Sun</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Last Quarter: Half of the Moon's visible side is illuminated</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Interesting Facts</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>A complete lunar cycle takes 29.5 days</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>The Moon is slowly moving away from Earth at about 3.8 cm per year</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>The Moon is tidally locked to Earth, so we only see one side</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Link to="/moon-phases-interactive">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6">
                    Explore Interactive Demo
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Mars Rover Photos from NASA API */}
            {!marsLoading && marsPhotos && marsPhotos.length > 0 && (
              <div className="glass-card rounded-xl p-8 my-12">
                <h3 className="text-2xl font-medium mb-6">Mars Rover Images</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Explore images captured by NASA's Mars Rovers on the Red Planet's surface. These images help scientists study Mars' geology and search for signs of ancient life.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marsPhotos.map((photo: any) => (
                    <div key={photo.id} className="overflow-hidden rounded-lg">
                      <img 
                        src={photo.img_src} 
                        alt={`Mars Rover ${photo.rover.name} - ${photo.camera.full_name}`}
                        className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-3">
                        <p className="text-xs text-muted-foreground">
                          {photo.rover.name} - {photo.camera.full_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Sol: {photo.sol} | Earth Date: {new Date(photo.earth_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Stars Section */}
      <section 
        ref={topicRefs.stars}
        className={`py-20 ${theme === 'dark' ? 'bg-space-deep-blue' : 'bg-light-purple'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <Star className="mr-3 text-primary" size={28} />
              <h2 className="text-3xl md:text-4xl font-heading">Stars & Stellar Evolution</h2>
            </div>
            
            <div className="glass-card rounded-xl p-8">
              <p className="text-lg text-muted-foreground mb-6">
                Stars are massive, luminous spheres of plasma held together by gravity. They follow a life cycle from formation in nebulae to various end states depending on their mass.
              </p>
              
              <div className="text-center py-12">
                <p className="italic text-muted-foreground">Interactive content coming soon!</p>
                <Link to="/create" className="mt-4 inline-block">
                  <Button variant="outline" className="mt-4">
                    Write a Blog Post About Stars
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Galaxies Section */}
      <section 
        ref={topicRefs.galaxies}
        className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-b from-space-deep-blue to-space-black' : 'bg-gradient-to-b from-light-purple to-light-black'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 text-primary" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-heading">Galaxies & Cosmic Structures</h2>
            </div>
            
            <div className="glass-card rounded-xl p-8">
              <p className="text-lg text-muted-foreground mb-6">
                Galaxies are vast systems of stars, gas, dust, and dark matter bound together by gravity. They come in various shapes and sizes, from spiral galaxies like our Milky Way to elliptical and irregular galaxies.
              </p>
              
              <div className="text-center py-12">
                <p className="italic text-muted-foreground">Interactive content coming soon!</p>
                <Link to="/create" className="mt-4 inline-block">
                  <Button variant="outline" className="mt-4">
                    Write a Blog Post About Galaxies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Topics;
