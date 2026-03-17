import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/i18n/context";
import ScrollToTop from "@/components/ScrollToTop";
import SeoSchema from "@/components/SeoSchema";
import Index from "./pages/Index";
import ProjectCase from "./pages/ProjectCase";
import ProjectTopic from "./pages/ProjectTopic";
import ServiceLanding from "./pages/ServiceLanding";
import TopicLanding from "./pages/TopicLanding";
import Brief from "./pages/Brief";
import NotFound from "./pages/NotFound";

const App = () => (
  <I18nProvider defaultLanguage="es">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SeoSchema />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/:serviceSlug" element={<ServiceLanding />} />
          <Route path="/topic/:topicSlug" element={<TopicLanding />} />
          <Route path="/project/:projectId/:topic" element={<ProjectTopic />} />
          <Route path="/project/:projectId" element={<ProjectCase />} />
          <Route path="/brief" element={<Brief />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </I18nProvider>
);

export default App;
