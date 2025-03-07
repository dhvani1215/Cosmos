
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext"; 
import Index from "./pages/Index";
import Topics from "./pages/Topics";
import CreateBlog from "./pages/CreateBlog";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import InteractiveDemos from "./pages/InteractiveDemos";
import PlanetaryScience from "./pages/categories/PlanetaryScience";
import LunarAstronomy from "./pages/categories/LunarAstronomy";
import Astrophysics from "./pages/categories/Astrophysics";
import ObservationalAstronomy from "./pages/categories/ObservationalAstronomy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/interactive-demos" element={<InteractiveDemos />} />
            <Route path="/category/planetary-science" element={<PlanetaryScience />} />
            <Route path="/category/lunar-astronomy" element={<LunarAstronomy />} />
            <Route path="/category/astrophysics" element={<Astrophysics />} />
            <Route path="/category/observational-astronomy" element={<ObservationalAstronomy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
