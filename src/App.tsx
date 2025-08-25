import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import { OptimizedErrorBoundary } from "./components/OptimizedErrorBoundary";
import PerformanceOptimizer from "./components/PerformanceOptimizer";

const App = () => (
  <HelmetProvider>
    <OptimizedErrorBoundary>
      <PerformanceOptimizer />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Direct root route */}
            <Route path="/" element={
              <LanguageProvider defaultLanguage="en">
                <Index />
              </LanguageProvider>
            } />
            
            {/* Language-specific routes */}
            <Route path="/en" element={
              <LanguageProvider defaultLanguage="en">
                <Index />
              </LanguageProvider>
            } />
            
            <Route path="/zh" element={
              <LanguageProvider defaultLanguage="zh">
                <Index />
              </LanguageProvider>
            } />
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </OptimizedErrorBoundary>
  </HelmetProvider>
);

export default App;