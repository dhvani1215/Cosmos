
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Planet {
  name: string;
  distance: number;
  speed: number;
  color: string;
}

interface PlanetaryOrbitProps {
  planets: Planet[];
  className?: string;
}

const PlanetaryOrbit = ({ planets, className }: PlanetaryOrbitProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [orbitScale, setOrbitScale] = useState(100);
  const [speedFactor, setSpeedFactor] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setOrbitScale(Math.min(width / 2.5, 150));
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative aspect-square w-full max-w-3xl mx-auto mt-8 mb-12 bg-space-black/50 rounded-xl overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-0 star-field opacity-40">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 1}s`,
            }}
          />
        ))}
      </div>
      
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-3">
        <div className="glass-card p-2 rounded-md">
          <label className="text-xs text-muted-foreground mb-1 block">
            Orbit Size
          </label>
          <input
            type="range"
            min="50"
            max="150"
            value={orbitScale}
            onChange={(e) => setOrbitScale(Number(e.target.value))}
            className="w-full h-2 bg-muted/30 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="glass-card p-2 rounded-md">
          <label className="text-xs text-muted-foreground mb-1 block">
            Speed
          </label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={speedFactor}
            onChange={(e) => setSpeedFactor(Number(e.target.value))}
            className="w-full h-2 bg-muted/30 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="glass-card p-2 rounded-md flex items-center justify-center hover:bg-white/5 transition-colors"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Sun */}
        <div className="relative w-12 h-12 rounded-full bg-yellow-500 z-10">
          <div className="absolute inset-0 rounded-full bg-yellow-300 blur-sm opacity-60 animate-pulse"></div>
        </div>
        
        {/* Orbits and planets */}
        {planets.map((planet, index) => (
          <div key={planet.name} className="absolute inset-0 flex items-center justify-center">
            {/* Orbit path */}
            <div 
              className="absolute rounded-full border border-white/10"
              style={{
                width: `${planet.distance * orbitScale * 2}px`,
                height: `${planet.distance * orbitScale * 2}px`,
              }}
            />
            
            {/* Planet */}
            <div 
              className={cn(
                "absolute rounded-full flex items-center justify-center",
                isPaused ? "" : "animate-rotate-orbit"
              )}
              style={{
                width: `${planet.distance * orbitScale * 2}px`,
                height: `${planet.distance * orbitScale * 2}px`,
                animationDuration: `${20 / (planet.speed * speedFactor)}s`,
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              <div 
                className="rounded-full absolute"
                style={{
                  width: `${Math.max(8, 12 - index * 2)}px`,
                  height: `${Math.max(8, 12 - index * 2)}px`,
                  backgroundColor: planet.color,
                  transform: 'translateX(50%)',
                  boxShadow: `0 0 10px 2px ${planet.color}40`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 glass-card p-3 rounded-md flex justify-between overflow-x-auto">
        {planets.map((planet) => (
          <div key={planet.name} className="flex items-center space-x-1 px-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: planet.color }}
            />
            <span className="text-xs whitespace-nowrap">{planet.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanetaryOrbit;
