
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

const PlanetaryOrbitsInteractive = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientWidth * 0.6; // Aspect ratio 5:3
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Create planets
    const planets = [
      { name: 'Mercury', distance: 0.12, size: 4, color: '#A9A9A9', speed: 0.04, angle: 0 },
      { name: 'Venus', distance: 0.16, size: 6, color: '#F5DEB3', speed: 0.015, angle: Math.PI / 3 },
      { name: 'Earth', distance: 0.22, size: 6.5, color: '#4169E1', speed: 0.01, angle: Math.PI / 2 },
      { name: 'Mars', distance: 0.28, size: 5, color: '#CD5C5C', speed: 0.008, angle: Math.PI },
      { name: 'Jupiter', distance: 0.36, size: 12, color: '#DEB887', speed: 0.002, angle: Math.PI * 1.5 },
      { name: 'Saturn', distance: 0.45, size: 10, color: '#F0E68C', speed: 0.0009, angle: Math.PI * 0.8 },
      { name: 'Uranus', distance: 0.52, size: 8, color: '#87CEEB', speed: 0.0004, angle: Math.PI * 1.2 },
      { name: 'Neptune', distance: 0.58, size: 8, color: '#1E90FF', speed: 0.0001, angle: Math.PI * 0.5 },
    ];
    
    // Animation loop
    const drawOrbit = (centerX: number, centerY: number, radiusX: number, radiusY: number) => {
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
      ctx.stroke();
    };
    
    const drawPlanet = (x: number, y: number, size: number, color: string, name: string) => {
      // Draw planet
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Draw name
      ctx.font = '12px Arial';
      ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
      ctx.textAlign = 'center';
      ctx.fillText(name, x, y + size + 15);
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw Sun
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 1, centerX, centerY, 15);
      sunGradient.addColorStop(0, '#FFF176');
      sunGradient.addColorStop(1, '#FF9800');
      ctx.fillStyle = sunGradient;
      ctx.fill();
      
      // Draw orbits and planets
      planets.forEach(planet => {
        const orbitRadiusX = centerX * planet.distance * 3;
        const orbitRadiusY = centerY * planet.distance * 3;
        
        // Draw orbit
        drawOrbit(centerX, centerY, orbitRadiusX, orbitRadiusY);
        
        // Update planet position
        planet.angle += planet.speed;
        
        // Calculate planet position on elliptical orbit
        const x = centerX + Math.cos(planet.angle) * orbitRadiusX;
        const y = centerY + Math.sin(planet.angle) * orbitRadiusY;
        
        // Draw planet
        drawPlanet(x, y, planet.size, planet.color, planet.name);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [theme]);
  
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
                <h1 className="text-3xl md:text-4xl font-heading">Planetary Orbits Interactive</h1>
              </div>
              <ThemeToggle />
            </div>
            
            <div className="glass-card rounded-xl p-6 mb-8">
              <p className="text-lg mb-6">
                This interactive visualization demonstrates how planets orbit the Sun in elliptical paths. 
                The size of planets and distances are not to scale, but their relative orbital speeds follow Kepler's laws.
              </p>
              
              <div className="relative bg-black/10 dark:bg-white/5 rounded-lg overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  className="w-full" 
                />
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">How It Works</h3>
                  <p>
                    Planets closer to the Sun orbit faster than those farther away, following Kepler's Third Law. 
                    The orbits are elliptical rather than perfectly circular, with the Sun at one focus of the ellipse.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3">Did You Know?</h3>
                  <p>
                    A planet moves fastest when it's closest to the Sun (perihelion) and slowest when it's farthest away (aphelion). 
                    This difference in speed is most pronounced for planets with more elliptical orbits.
                  </p>
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

export default PlanetaryOrbitsInteractive;
