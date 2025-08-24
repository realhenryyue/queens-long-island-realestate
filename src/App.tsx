import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

const App = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Wrap ALL routes in LanguageProvider to prevent context errors */}
          <LanguageProvider defaultLanguage="en">
            <Routes>
              {/* All routes now have guaranteed LanguageProvider context */}
              <Route path="/" element={<Index />} />
              <Route path="/en" element={<Index />} />
              <Route path="/en/*" element={<Index />} />
              <Route path="/zh" element={<Index />} />
              <Route path="/zh/*" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ErrorBoundary>
  </HelmetProvider>
);

export default App;