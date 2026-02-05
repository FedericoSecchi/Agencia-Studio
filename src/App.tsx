import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HashRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/i18n/context";
import ScrollToTop from "@/components/ScrollToTop";
import SeoSchema from "@/components/SeoSchema";
import Index from "./pages/Index";
import ProjectCase from "./pages/ProjectCase";
import NotFound from "./pages/NotFound";

const App = () => (
  <I18nProvider defaultLanguage="en">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SeoSchema />
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/project/:projectId" element={<ProjectCase />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </I18nProvider>
);

export default App;
