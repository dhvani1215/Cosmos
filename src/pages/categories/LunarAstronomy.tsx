
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LunarAstronomy = () => {
  const articles = [
    {
      id: 1,
      title: "The Formation of the Moon",
      description: "Theories about the Moon's origin and the giant impact hypothesis.",
      image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      title: "Lunar Maria: The Dark Seas",
      description: "The composition and formation of the dark patches visible on the Moon.",
      image: "https://images.unsplash.com/photo-1518104593124-ac2e82a5eb9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      title: "The Lunar Cycle",
      description: "Understanding the phases of the Moon and their impact on Earth.",
      image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 4,
      title: "Moonquakes and Lunar Geology",
      description: "The Moon's geological activity and what we've learned from seismic data.",
      image: "https://images.unsplash.com/photo-1481819613568-3701cbc70156?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 5,
      title: "Water on the Moon",
      description: "Recent discoveries of water ice at the lunar poles and its implications.",
      image: "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 6,
      title: "The Future of Lunar Exploration",
      description: "Upcoming missions and the potential for human settlements on the Moon.",
      image: "https://images.unsplash.com/photo-1541873676-a18131494184?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ];

  return (
    <div className="container mx-auto py-20 px-4 md:px-6">
      <h1 className="mb-6">Lunar Astronomy</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
        Discover the mysteries of Earth's closest celestial companion, from its 
        formation to the latest discoveries from lunar exploration missions.
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

export default LunarAstronomy;
