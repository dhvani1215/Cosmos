
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '@/data/blogPosts';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const currentElement = document.getElementById(`blog-card-${post.id}`);
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [post.id]);
  
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <article 
      id={`blog-card-${post.id}`}
      className={cn(
        'group glass-card rounded-lg overflow-hidden transition-all duration-500 h-full flex flex-col',
        featured ? 'md:col-span-2' : '',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      )}
    >
      <Link to={`/blog/${post.slug}`} className="relative block overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent z-10"></div>
        <div className={cn(
          'relative w-full aspect-video bg-muted/20 overflow-hidden',
          !isLoaded && 'animate-pulse'
        )}>
          <img
            src={`${post.coverImage}?w=800&auto=format`}
            alt={post.title}
            className={cn(
              'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-space-blue/30 mix-blend-overlay"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/80 text-primary-foreground rounded-md mb-3">
            {post.category}
          </span>
          <h3 className={cn(
            'text-xl md:text-2xl font-medium text-white mb-2 transition-colors',
            featured && 'md:text-3xl'
          )}>
            {post.title}
          </h3>
          <div className="flex items-center text-sm text-white/80">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full mr-2 border border-white/10"
            />
            {post.author.name} • {formattedDate}
          </div>
        </div>
      </Link>
      
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors"
        >
          Read more
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
    </article>
  );
};

export default BlogCard;
