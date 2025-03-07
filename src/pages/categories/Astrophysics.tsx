
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Astrophysics = () => {
  const articles = [
    {
      id: 1,
      title: "Black Holes: The Universe's Most Extreme Objects",
      description: "The physics behind black holes and recent observations.",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      title: "The Life Cycle of Stars",
      description: "From protostars to supernovae: understanding stellar evolution.",
      image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      title: "Dark Matter and Dark Energy",
      description: "The invisible forces shaping our universe.",
      image: "https://images.unsplash.com/photo-1534533983688-c7b8e13fd3b6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 4,
      title: "The Big Bang Theory",
      description: "Evidence for the beginning of our universe.",
      image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 5,
      title: "Gravitational Waves",
      description: "Ripples in spacetime and what they tell us about cosmic events.",
      image: "https://images.unsplash.com/photo-150268198915-ab09fdc01159?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 6,
      title: "Exoplanets and the Search for Life",
      description: "Using astrophysics to discover and analyze planets around other stars.",
      image: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ];

  return (
    <div className="container mx-auto py-20 px-4 md:px-6">
      <h1 className="mb-6">Astrophysics</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
        Dive into the physical principles that govern the universe, from the behavior 
        of matter and energy to the formation and evolution of cosmic structures.
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

export default Astrophysics;
