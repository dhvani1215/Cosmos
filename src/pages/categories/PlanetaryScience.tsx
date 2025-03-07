
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PlanetaryScience = () => {
  const articles = [
    {
      id: 1,
      title: "Understanding the Gas Giants",
      description: "An in-depth look at Jupiter, Saturn, Uranus, and Neptune.",
      image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      title: "Mars: The Red Planet",
      description: "Exploring the geology and potential for human habitation on Mars.",
      image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      title: "The Earth-Moon System",
      description: "How the Moon influences Earth and the evolution of this unique planetary pairing.",
      image: "https://images.unsplash.com/photo-1532798369041-b33eb576ef16?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 4,
      title: "Venus: Earth's Evil Twin",
      description: "The extreme conditions on Venus and what they can teach us about climate change.",
      image: "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 5,
      title: "Mercury: The Forgotten Planet",
      description: "New discoveries about the closest planet to the Sun.",
      image: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 6,
      title: "Pluto and the Kuiper Belt",
      description: "Exploring the outer reaches of our solar system.",
      image: "https://images.unsplash.com/photo-1581542234013-6e729eb30ce7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ];

  return (
    <div className="container mx-auto py-20 px-4 md:px-6">
      <h1 className="mb-6">Planetary Science</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
        Explore the fascinating world of planetary science, from the rocky inner planets 
        to the gas giants and icy worlds of the outer solar system.
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

export default PlanetaryScience;
