
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SignOut = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate sign out process
    const timeout = setTimeout(() => {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-black to-space-deep-blue">
      <Navbar />
      
      <div className="container mx-auto py-24 px-4 md:px-6 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Signing Out</h1>
          <p className="text-muted-foreground">Please wait while we sign you out...</p>
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SignOut;
