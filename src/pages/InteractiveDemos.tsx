
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ExternalLink } from 'lucide-react';

const InteractiveDemos = () => {
  const navigate = useNavigate();

  const videos = [
    {
      id: 1,
      title: "Journey to the Edge of the Universe",
      description: "A breathtaking voyage through space and time, exploring the cosmos from Earth to the edge of the observable universe.",
      type: "YouTube",
      embedId: "bhofN1xX6u0",
    },
    {
      id: 2,
      title: "NASA's Webb Reveals Stunning New Image of Supernova Remnant Cassiopeia A",
      description: "Webb's NIRCam (Near-Infrared Camera) captures this remnant of a stellar explosion in unprecedented detail.",
      type: "NASA",
      embedId: "G4LjhjXFEbw",
    },
    {
      id: 3,
      title: "The Life and Death of Stars",
      description: "Explore the fascinating lifecycle of stars, from their birth in stellar nurseries to their dramatic deaths as supernovae or black holes.",
      type: "YouTube",
      embedId: "PM9CQDlQI0A",
    },
    {
      id: 4,
      title: "NASA's Perseverance Mars Rover",
      description: "Follow the journey of NASA's most advanced rover as it searches for signs of ancient microbial life on the Red Planet.",
      type: "NASA",
      embedId: "gYQwuEQCWIQ",
    },
    {
      id: 5,
      title: "Black Holes Explained",
      description: "A comprehensive guide to understanding one of the most enigmatic phenomena in our universe.",
      type: "YouTube",
      embedId: "e-P5IFTqB98",
    },
    {
      id: 6,
      title: "NASA's James Webb Space Telescope: The First Deep Field",
      description: "The deepest and sharpest infrared image of the distant universe to date.",
      type: "NASA",
      embedId: "88l3GqPiBgQ",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-black to-space-deep-blue">
      <Navbar />
      
      <div className="container mx-auto py-24 px-4 md:px-6">
        <header className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading mb-6">Interactive Cosmos Demos</h1>
          <p className="text-lg text-muted-foreground">
            Explore the wonders of our universe through these immersive videos from NASA and leading cosmologists.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden bg-card/80 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all duration-300">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="truncate text-lg">{video.title}</CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    video.type === 'NASA' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {video.type}
                  </span>
                </div>
                <CardDescription className="line-clamp-2">{video.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href={`https://www.youtube.com/watch?v=${video.embedId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary flex items-center hover:text-primary/80"
                >
                  Watch on YouTube <ExternalLink className="ml-1" size={14} />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default InteractiveDemos;
