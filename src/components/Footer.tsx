
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-space-deep-blue border-t border-white/5 py-12 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md"></div>
                <div className="absolute inset-0.5 bg-space-deep-blue rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">C</span>
                </div>
              </div>
              <span className="font-heading text-xl font-bold">Cosmos</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Exploring the wonders of the universe through interactive visualizations and engaging content.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-medium text-lg mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/topics" className="hover:text-primary transition-colors">Topics</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/signin" className="hover:text-primary transition-colors">Sign In</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-medium text-lg mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/category/planetary-science" className="hover:text-primary transition-colors">Planetary Science</Link></li>
              <li><Link to="/category/lunar-astronomy" className="hover:text-primary transition-colors">Lunar Astronomy</Link></li>
              <li><Link to="/category/astrophysics" className="hover:text-primary transition-colors">Astrophysics</Link></li>
              <li><Link to="/category/observational-astronomy" className="hover:text-primary transition-colors">Observational Astronomy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-medium text-lg mb-4">Subscribe</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with the latest astronomy news and visualizations.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-muted/20 border border-muted rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground rounded-r-md px-3 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {currentYear} Cosmos. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
