import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getRecentPosts } from '@/data/blogPosts';
import { useStarField, useIntersectionObserver } from '@/utils/animations';
import { cn } from '@/lib/utils';

const Index = () => {
  const recentPosts = getRecentPosts(4);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);
  
  const heroVisible = useIntersectionObserver(heroRef);
  const aboutVisible = useIntersectionObserver(aboutRef);
  const featuresVisible = useIntersectionObserver(featuresRef);
  const blogsVisible = useIntersectionObserver(blogsRef);
  
  const stars = useStarField(150);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Stars Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 pb-16"
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div 
            className={cn(
              "max-w-3xl mx-auto text-center transition-all duration-1000",
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-6">
              Discover the Universe
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading mb-6">
              Explore the Cosmos Through
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block mt-2">
                Interactive Astronomy
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Journey through space with engaging visualizations and articles that bring the wonders of our universe to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/topics">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6">
                  Explore Topics
                </Button>
              </Link>
              <Link to="/interactive-demos">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-full px-8 py-6">
                  Interactive Demos
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Floating celestial objects */}
          <div 
            className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-purple-500/20 blur-xl top-1/4 left-1/4 animate-float"
            style={{ animationDelay: '1s' }}
          />
          <div 
            className="absolute w-12 h-12 md:w-20 md:h-20 rounded-full bg-blue-500/20 blur-xl bottom-1/4 right-1/3 animate-float"
            style={{ animationDelay: '2s' }}
          />
          <div 
            className="absolute w-20 h-20 md:w-32 md:h-32 rounded-full bg-yellow-500/10 blur-xl top-1/3 right-1/4 animate-float"
            style={{ animationDelay: '1.5s' }}
          />
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
      
      {/* About Section */}
      <section 
        ref={aboutRef}
        className="relative py-20 bg-gradient-to-b from-space-black to-space-deep-blue"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div 
              className={cn(
                "relative transition-all duration-1000 delay-100",
                aboutVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              )}
            >
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-6">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-heading mb-6">
                Bringing the Universe to Everyone
              </h2>
              <p className="text-muted-foreground mb-6">
                Cosmos is dedicated to making astronomy accessible through interactive visualizations and engaging content. We believe that understanding the universe should be an immersive experience.
              </p>
              <ul className="space-y-4">
                {[
                  'Interactive educational tools',
                  'Scientifically accurate visualizations',
                  'Engaging astronomy content',
                  'Community for space enthusiasts'
                ].map((item, i) => (
                  <li 
                    key={i} 
                    className="flex items-start"
                    style={{ transitionDelay: `${i * 100 + 200}ms` }}
                  >
                    <div className="mr-3 mt-1 bg-primary/20 text-primary rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div 
              className={cn(
                "relative transition-all duration-1000 delay-300",
                aboutVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              )}
            >
              <div className="relative rounded-lg overflow-hidden aspect-video glass-card p-2">
                <div className="absolute inset-0 bg-space-blue/30 mix-blend-overlay rounded-lg"></div>
                <img
                  src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Starry night sky"
                  className="rounded-lg w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs font-medium text-white/80">Image credit: NASA</span>
                  <h3 className="text-xl font-medium text-white">Exploring the Wonders of Space</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="relative py-20 bg-space-black"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-6">
              Interactive Experiences
            </span>
            <h2 
              className={cn(
                "text-3xl md:text-4xl font-heading mb-6 transition-all duration-1000",
                featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              Visualize Astronomical Concepts
            </h2>
            <p 
              className={cn(
                "text-muted-foreground transition-all duration-1000 delay-200",
                featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              Our interactive visualizations help you understand complex astronomical phenomena through engaging, hands-on experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Planetary Orbits',
                description: 'Explore how planets move around stars and understand Kepler\'s laws of planetary motion.',
                image: 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?auto=format&fit=crop&w=800&q=80',
                link: '/interactive-demos'
              },
              {
                title: 'Moon Phases',
                description: 'Visualize how the Moon changes its appearance throughout its orbit around Earth.',
                image: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=800&q=80',
                link: '/interactive-demos'
              },
              {
                title: 'Star Life Cycles',
                description: 'Understand how stars form, evolve, and eventually die over billions of years.',
                image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
                link: '/interactive-demos'
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className={cn(
                  "glass-card rounded-lg overflow-hidden group transition-all duration-1000",
                  featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${i * 150 + 300}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-space-black to-transparent z-10"></div>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Link
                    to={feature.link}
                    className="inline-flex items-center text-primary font-medium group-hover:text-primary/80"
                  >
                    Explore
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section 
        ref={blogsRef}
        className="relative py-20 bg-gradient-to-b from-space-deep-blue to-space-black"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-4">
                Latest Articles
              </span>
              <h2 
                className={cn(
                  "text-3xl md:text-4xl font-heading transition-all duration-1000",
                  blogsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
              >
                Discover Cosmic Insights
              </h2>
            </div>
            <Link
              to="/topics"
              className={cn(
                "hidden md:flex items-center space-x-1 text-primary hover:text-primary/80 transition-all duration-1000",
                blogsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              )}
            >
              <span>View all topics</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.slice(0, 3).map((post, i) => (
              <div
                key={post.id}
                className="transition-all duration-1000"
                style={{ transitionDelay: `${i * 150 + 200}ms` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/topics">
              <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-full px-6">
                View all topics
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-20 bg-space-blue">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass-card rounded-xl p-8 md:p-12 max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-6">
              Join Our Community
            </span>
            <h2 className="text-3xl md:text-4xl font-heading mb-6">
              Stay Connected with Cosmos
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new interactive visualizations, articles, and astronomy events.
            </p>
            <form className="max-w-md mx-auto mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-muted/20 border border-muted rounded-l-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground rounded-r-md px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
