
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

// Moon phase data
const moonPhases = [
  { name: "New Moon", description: "The Moon is positioned between the Earth and Sun, with its dark side facing us. It's not visible in the night sky." },
  { name: "Waxing Crescent", description: "A small part of the Moon becomes visible as a crescent shape. The right side is illuminated in the Northern Hemisphere." },
  { name: "First Quarter", description: "Half of the Moon is visible, with the right side illuminated in the Northern Hemisphere. It rises at noon and sets at midnight." },
  { name: "Waxing Gibbous", description: "Most of the Moon is visible, with just a small part of the left side in darkness. It appears in the afternoon and sets before dawn." },
  { name: "Full Moon", description: "The entire face of the Moon is illuminated. It rises at sunset and sets at sunrise." },
  { name: "Waning Gibbous", description: "Most of the Moon is visible, with just a small part of the right side in darkness. It rises after sunset." },
  { name: "Last Quarter", description: "Half of the Moon is visible, with the left side illuminated in the Northern Hemisphere. It rises at midnight and sets at noon." },
  { name: "Waning Crescent", description: "A small part of the Moon is visible as a crescent shape. The left side is illuminated in the Northern Hemisphere." },
];

const MoonPhasesInteractive = () => {
  const { theme } = useTheme();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Fetch current lunar phase from NASA API
  useEffect(() => {
    const fetchLunarPhase = async () => {
      try {
        // Calculate days since new moon on Jan 1, 2000
        const newMoonDate = new Date('2000-01-06T18:14:00Z');
        const currentDate = new Date();
        const daysSinceNewMoon = (currentDate.getTime() - newMoonDate.getTime()) / (1000 * 60 * 60 * 24);
        
        // Lunar cycle is approximately 29.53 days
        const lunarCycle = 29.53;
        const daysSinceLastNewMoon = daysSinceNewMoon % lunarCycle;
        
        // Calculate phase index (0-7)
        const phaseIndex = Math.floor((daysSinceLastNewMoon / lunarCycle) * 8) % 8;
        setCurrentPhase(phaseIndex);
        setCurrentDate(currentDate);
      } catch (error) {
        console.error('Error calculating lunar phase:', error);
      }
    };
    
    fetchLunarPhase();
  }, []);
  
  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    let phase = 0;
    
    const interval = setInterval(() => {
      phase = (phase + 1) % 8;
      setCurrentPhase(phase);
      
      if (phase === 0) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  };
  
  const nextPhase = () => {
    setCurrentPhase((prev) => (prev + 1) % 8);
  };
  
  const prevPhase = () => {
    setCurrentPhase((prev) => (prev === 0 ? 7 : prev - 1));
  };
  
  // Moon rendering helper
  const renderMoon = (phase: number) => {
    const moonSize = 200;
    const centerX = moonSize / 2;
    const centerY = moonSize / 2;
    const radius = moonSize / 2 - 10;
    
    return (
      <svg width={moonSize} height={moonSize} viewBox={`0 0 ${moonSize} ${moonSize}`} className="mx-auto">
        {/* Moon base circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill={theme === 'dark' ? '#aaaaaa' : '#cccccc'}
          stroke={theme === 'dark' ? '#555555' : '#999999'}
          strokeWidth="1"
        />
        
        {/* Moon shadow based on phase */}
        {phase !== 4 && (
          <path
            d={getMoonPhasePath(phase, centerX, centerY, radius)}
            fill={theme === 'dark' ? '#111111' : '#444444'}
          />
        )}
        
        {/* Moon craters */}
        <circle cx={centerX - 30} cy={centerY - 20} r={10} fill={theme === 'dark' ? '#999999' : '#aaaaaa'} opacity="0.6" />
        <circle cx={centerX + 40} cy={centerY + 30} r={15} fill={theme === 'dark' ? '#999999' : '#aaaaaa'} opacity="0.6" />
        <circle cx={centerX - 10} cy={centerY + 40} r={8} fill={theme === 'dark' ? '#999999' : '#aaaaaa'} opacity="0.6" />
      </svg>
    );
  };
  
  const getMoonPhasePath = (phase: number, cx: number, cy: number, r: number) => {
    if (phase === 0) {
      // New Moon (full shadow)
      return `M${cx-r},${cy}a${r},${r} 0 1,0 ${r*2},0a${r},${r} 0 1,0 -${r*2},0`;
    } else if (phase < 4) {
      // Waxing phases (right part visible)
      const intensity = (phase / 4);
      const x = cx - r + 2 * r * intensity;
      return `
        M${cx},${cy-r}
        A${r},${r} 0 0,1 ${cx},${cy+r}
        A${r},${r} 0 0,1 ${cx},${cy-r}
        Z
        M${cx},${cy-r}
        A${r},${r} 0 0,0 ${cx},${cy+r}
        A${r*intensity*2 || 0.01},${r} 0 0,0 ${cx},${cy-r}
        Z
      `;
    } else if (phase > 4) {
      // Waning phases (left part visible)
      const intensity = (8 - phase) / 4;
      const x = cx - r + 2 * r * intensity;
      return `
        M${cx},${cy-r}
        A${r},${r} 0 0,0 ${cx},${cy+r}
        A${r},${r} 0 0,0 ${cx},${cy-r}
        Z
        M${cx},${cy-r}
        A${r},${r} 0 0,1 ${cx},${cy+r}
        A${r*intensity*2 || 0.01},${r} 0 0,1 ${cx},${cy-r}
        Z
      `;
    }
    
    return '';
  };
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-space-black' : 'bg-light-gradient'}`}>
      <Navbar />
      
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Link to="/topics" className="mr-4">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                </Link>
                <h1 className="text-3xl md:text-4xl font-heading">Moon Phases Interactive</h1>
              </div>
              <ThemeToggle />
            </div>
            
            <div className="glass-card rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center">
                  {renderMoon(currentPhase)}
                  
                  <div className="mt-8 flex items-center justify-center space-x-4">
                    <Button onClick={prevPhase} variant="outline">Previous Phase</Button>
                    <Button 
                      onClick={startAnimation}
                      disabled={isAnimating}
                      variant="outline"
                    >
                      {isAnimating ? 'Animating...' : 'Animate Cycle'}
                    </Button>
                    <Button onClick={nextPhase} variant="outline">Next Phase</Button>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-medium mb-4">{moonPhases[currentPhase].name}</h2>
                  <p className="mb-4">{moonPhases[currentPhase].description}</p>
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-medium mb-2">Today's Moon</h3>
                    <p>
                      Based on calculations, today's moon phase is approximately:
                      <span className="font-medium block mt-2">
                        {moonPhases[currentPhase].name}
                      </span>
                      <span className="text-sm text-muted-foreground block mt-1">
                        Date: {currentDate.toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-medium mb-2">Did You Know?</h3>
                    <p>
                      The same side of the Moon always faces the Earth because the Moon rotates on its axis at the same rate that it orbits the Earth, a phenomenon called tidal locking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Link to="/create">
                <Button className="bg-primary hover:bg-primary/90">
                  Write a Blog Post About This Topic
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default MoonPhasesInteractive;
