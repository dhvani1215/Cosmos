
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MoonPhasesProps {
  cycleLength?: number;
  initialPhase?: number;
  className?: string;
}

const phaseNames = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent"
];

const MoonPhases = ({ 
  cycleLength = 29.5, 
  initialPhase = 0,
  className 
}: MoonPhasesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPhase, setCurrentPhase] = useState(initialPhase);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  
  // Calculate the index of the current phase name (0-7)
  const phaseNameIndex = Math.floor((currentPhase / cycleLength) * 8) % 8;
  
  // Calculate illumination percentage (0-100%)
  const illuminationPercent = (() => {
    const normalizedPhase = (currentPhase / cycleLength) * 100;
    if (normalizedPhase <= 50) {
      return normalizedPhase * 2; // 0 to 100 (New Moon to Full Moon)
    } else {
      return (100 - normalizedPhase) * 2; // 100 to 0 (Full Moon to New Moon)
    }
  })();
  
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
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (!isPlaying || !isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentPhase((prevPhase) => {
        const newPhase = (prevPhase + 0.5 * speed) % cycleLength;
        return newPhase;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, [isPlaying, speed, cycleLength, isVisible]);
  
  // Calculate styles for moon visualization
  const moonStyle = {
    backgroundColor: '#e6e6e6', // Moon color
    boxShadow: '0 0 20px 1px rgba(230, 230, 230, 0.4)',
  };
  
  // Calculate shadow position based on phase
  const shadowStyle = (() => {
    const normalizedPhase = (currentPhase / cycleLength) * 100;
    let leftPosition;
    
    if (normalizedPhase <= 50) {
      // First half of the cycle (New to Full)
      leftPosition = `${100 - normalizedPhase * 2}%`;
    } else {
      // Second half of the cycle (Full to New)
      leftPosition = `${(normalizedPhase - 50) * 2}%`;
    }
    
    return {
      left: leftPosition,
    };
  })();
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative w-full max-w-3xl mx-auto bg-space-black/50 rounded-xl p-6 mt-8 mb-12',
        className
      )}
    >
      <div className="star-field opacity-30">
        {Array.from({ length: 30 }, (_, i) => (
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
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-2">
            Day {Math.floor(currentPhase)} of {cycleLength}
          </span>
          <h3 className="text-2xl font-heading">{phaseNames[phaseNameIndex]}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {Math.round(illuminationPercent)}% illuminated
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            {/* Moon */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={moonStyle}
            >
              {/* Shadow overlay that moves based on phase */}
              <div
                className="absolute top-0 bottom-0 w-1/2 bg-space-black"
                style={shadowStyle}
              ></div>
            </div>

            {/* Earth-Moon system annotation (optional) */}
            {currentPhase > 0 && currentPhase < cycleLength && (
              <div className="absolute -top-6 -bottom-6 -left-6 -right-6 border border-white/10 border-dashed rounded-full"></div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center space-x-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="glass-card px-4 py-2 rounded-md flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Slow</span>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24 h-2 bg-muted/30 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-muted-foreground">Fast</span>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-4 gap-4">
          {phaseNames.map((name, index) => (
            <button
              key={name}
              className={cn(
                "glass-card p-2 rounded-md text-center text-xs transition-colors",
                phaseNameIndex === index ? "ring-1 ring-primary" : "hover:bg-white/5"
              )}
              onClick={() => setCurrentPhase((index / 8) * cycleLength)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoonPhases;
