
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ObservationalAstronomy = () => {
  const articles = [
    {
      id: 1,
      title: "Telescopes: Windows to the Universe",
      description: "An overview of different types of telescopes and how they work.",
      image: "https://images.unsplash.com/photo-1566345851396-25b43ef93a90?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      title: "Astrophotography for Beginners",
      description: "Getting started with photographing the night sky.",
      image: "https://images.unsplash.com/photo-1532968979668-02b0c260e50b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      title: "Light Pollution and Astronomy",
      description: "The impact of artificial light on observing the cosmos.",
      image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 4,
      title: "Radio Astronomy",
      description: "Listening to the universe through radio waves.",
      image: "https://images.unsplash.com/photo-1547564879-496fd7189a4b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 5,
      title: "Space-Based Observatories",
      description: "How telescopes like Hubble and James Webb transform our view of the cosmos.",
      image: "https://images.unsplash.com/photo-1614728423169-1f47fc0d6dc6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 6,
      title: "Citizen Science in Astronomy",
      description: "How amateur astronomers contribute to scientific discoveries.",
      image: "https://images.unsplash.com/photo-1590492175551-c27c6d7c8748?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ];

  return (
    <div className="container mx-auto py-20 px-4 md:px-6">
      <h1 className="mb-6">Observational Astronomy</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
        Learn about the techniques and tools astronomers use to observe celestial objects, 
        from backyard stargazing to cutting-edge space telescopes.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>{article.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link 
                to={`/blog/${article.id}`} 
                className="text-primary hover:underline"
              >
                Read more
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ObservationalAstronomy;
