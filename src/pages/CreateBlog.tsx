
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImagePlus, Send } from 'lucide-react';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    
    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, we would upload the image and save the blog to a database
    // For this demo, we'll simulate a successful post with a delay
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success!
      toast({
        title: "Blog post created!",
        description: "Your astronomy blog post has been published.",
      });
      
      // Navigate to home or blog list
      setTimeout(() => navigate('/topics'), 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading mb-6 text-center">Create Astronomy Blog</h1>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              Share your cosmic insights with our community of astronomy enthusiasts
            </p>
            
            <div className="glass-card rounded-xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Blog Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-muted/20 border-muted"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-muted/20 border-muted rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  >
                    <option value="" disabled>Select category</option>
                    <option value="Planetary Science">Planetary Science</option>
                    <option value="Stellar Astronomy">Stellar Astronomy</option>
                    <option value="Cosmology">Cosmology</option>
                    <option value="Astrophysics">Astrophysics</option>
                    <option value="Space Exploration">Space Exploration</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Blog Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your astronomy blog content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="bg-muted/20 border-muted min-h-[200px]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Cover Image</Label>
                  <div className="flex flex-col items-center justify-center">
                    {imagePreview ? (
                      <div className="relative w-full aspect-video mb-4 rounded-md overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImagePreview(null);
                            setImageFile(null);
                            setImageUrl('');
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="w-full border-2 border-dashed border-muted rounded-md p-8 text-center mb-4">
                        <ImagePlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">Upload an image or enter an image URL</p>
                        <p className="text-xs text-muted-foreground">Recommended: 1920×1080 or higher</p>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row w-full gap-4">
                      <div className="flex-1">
                        <Input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-white/10 hover:bg-white/5"
                          onClick={() => document.getElementById('imageUpload')?.click()}
                        >
                          Upload Image
                        </Button>
                      </div>
                      
                      <div className="flex-1">
                        <Input
                          id="imageUrl"
                          placeholder="Or enter image URL"
                          value={imageUrl}
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                            setImagePreview(e.target.value);
                            setImageFile(null);
                          }}
                          className="bg-muted/20 border-muted"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Publishing...</>
                    ) : (
                      <>
                        Publish Blog Post
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CreateBlog;
