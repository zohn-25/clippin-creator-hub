import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Campaigns } from "./pages/Campaigns";
import { ClipsHub } from "./pages/ClipsHub";
import { ClipHubRoleSelection } from "./pages/ClipHubRoleSelection";
import { CreatorDashboard } from "./pages/CreatorDashboard";
import { EditorDashboard } from "./pages/EditorDashboard";
import { CreatorLogin } from "./pages/CreatorLogin";
import { EditorLogin } from "./pages/EditorLogin";
import { CreatorSignup } from "./pages/CreatorSignup";
import { EditorSignup } from "./pages/EditorSignup";
import { Dashboard } from "./pages/Dashboard";
import { BrandLogin } from "./pages/BrandLogin";
import { ContactUs } from "./pages/ContactUs";
import { WhyChooseUs } from "./pages/WhyChooseUs";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-bg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/clip-hub" element={<ClipHubRoleSelection />} />
            <Route path="/creator-login" element={<CreatorLogin />} />
            <Route path="/editor-login" element={<EditorLogin />} />
            <Route path="/creator-signup" element={<CreatorSignup />} />
            <Route path="/editor-signup" element={<EditorSignup />} />
            <Route path="/creator-dashboard" element={<CreatorDashboard />} />
            <Route path="/editor-dashboard" element={<EditorDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/brand-login" element={<BrandLogin />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/why-choose-us" element={<WhyChooseUs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
