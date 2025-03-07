
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plus, LogIn, LogOut, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={cn('nav-link', isActive && 'active')}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with actual auth state
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-space-black/80 backdrop-blur-md border-b border-white/5 py-3' : 'py-5'
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-md"></div>
            <div className="absolute inset-0.5 bg-space-black rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary text-xl font-bold">C</span>
            </div>
          </div>
          <span className="font-heading text-xl font-bold">Cosmos</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/topics">Topics</NavLink>
          <NavLink to="/interactive-demos">Interactive Demos</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/create">
            <Button 
              variant="outline" 
              size="sm"
              className="hidden md:flex items-center gap-1 border-white/10 hover:bg-white/5"
            >
              <Plus size={16} />
              <span>New Blog</span>
            </Button>
          </Link>
          
          {isLoggedIn ? (
            <Link to="/signout">
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-1"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </Link>
          ) : (
            <Link to="/signin">
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-1"
              >
                <LogIn size={16} />
                <span className="hidden md:inline">Sign In</span>
              </Button>
            </Link>
          )}
          
          <Link to="/contact" className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full w-9 h-9 flex items-center justify-center"
            >
              <Mail size={18} />
            </Button>
          </Link>
          
          <button 
            onClick={toggleMenu}
            className="md:hidden rounded-full w-9 h-9 flex items-center justify-center bg-muted/10 hover:bg-muted/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        'md:hidden fixed inset-0 z-40 bg-space-black/95 backdrop-blur-lg transition-transform duration-300 flex flex-col pt-24',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <nav className="flex flex-col items-center space-y-6 p-6 text-lg">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/topics">Topics</NavLink>
          <NavLink to="/interactive-demos">Interactive Demos</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Link to="/create" className="mt-4">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 border-white/10 hover:bg-white/5"
            >
              <Plus size={16} />
              <span>New Blog</span>
            </Button>
          </Link>
          {isLoggedIn ? (
            <Link to="/signout">
              <Button variant="default" size="sm" className="flex items-center gap-1">
                <LogOut size={16} />
                <span>Sign Out</span>
              </Button>
            </Link>
          ) : (
            <Link to="/signin">
              <Button variant="default" size="sm" className="flex items-center gap-1">
                <LogIn size={16} />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
