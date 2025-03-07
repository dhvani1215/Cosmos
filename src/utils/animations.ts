
import { useEffect, useState } from 'react';

export const useStarField = (count: number = 50) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 1,
  }));
};

export const useFadeIn = (delay: number = 0) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.5s ease-out, transform 0.5s ease-out`,
  };
};

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);
  
  return isVisible;
};

export const useParallax = (ref: React.RefObject<HTMLElement>, speed: number = 0.2) => {
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const translateY = scrollY * speed;
      element.style.transform = `translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, speed]);
};
