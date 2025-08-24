import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { CrossBrowserCompatibility } from "./components/CrossBrowserCompatibility";

const App = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <CrossBrowserCompatibility />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Default redirect to English */}
            <Route path="/" element={<Navigate to="/en" replace />} />
            
            {/* Language-specific routes */}
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
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ErrorBoundary>
  </HelmetProvider>
);

export default App;
