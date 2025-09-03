import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import { OptimizedErrorBoundary } from "./components/OptimizedErrorBoundary";

const App = () => (
  <HelmetProvider>
    <OptimizedErrorBoundary>
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
            
            {/* All content pages redirect to homepage with appropriate language */}
            <Route path="/en/*" element={
              <LanguageProvider defaultLanguage="en">
                <Index />
              </LanguageProvider>
            } />
            
            <Route path="/zh/*" element={
              <LanguageProvider defaultLanguage="zh">
                <Index />
              </LanguageProvider>
            } />
            
            {/* Legacy routes without language prefix - redirect to English */}
            <Route path="/investment-analysis" element={
              <LanguageProvider defaultLanguage="en">
                <Index />
              </LanguageProvider>
            } />
            
            <Route path="/queens-real-estate" element={
              <LanguageProvider defaultLanguage="en">
                <Index />
              </LanguageProvider>
            } />
            
            <Route path="/manhattan-properties" element={
              <LanguageProvider defaultLanguage="en">
                <Index />
              </LanguageProvider>
            } />
            
            <Route path="/nassau-county-homes" element={
              <LanguageProvider defaultLanguage="en">
                <Index />
              </LanguageProvider>
            } />
            
            <Route path="/roi-calculator" element={
              <LanguageProvider defaultLanguage="en">
                <Index />
              </LanguageProvider>
            } />
            
            <Route path="/contact" element={
              <LanguageProvider defaultLanguage="en">
                <Index />
              </LanguageProvider>
            } />
            
            <Route path="/blog" element={
              <LanguageProvider defaultLanguage="en">
                <Index />
              </LanguageProvider>
            } />
            
            <Route path="/blog/*" element={
              <LanguageProvider defaultLanguage="en">
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