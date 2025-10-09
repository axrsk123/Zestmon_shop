import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import SecretMenu from "./pages/SecretMenu";
import TreasureRoom from "./pages/TreasureRoom";
import KonamiZone from "./pages/KonamiZone";
import DevRoom from "./pages/DevRoom";
import GiftBox from "./pages/GiftBox";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/secret-menu" element={<SecretMenu />} />
          <Route path="/treasure" element={<TreasureRoom />} />
          <Route path="/konami" element={<KonamiZone />} />
          <Route path="/dev-room" element={<DevRoom />} />
          <Route path="/gift-box" element={<GiftBox />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
