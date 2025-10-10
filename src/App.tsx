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
import Lab from "./pages/Lab";
import Vault from "./pages/Vault";
import Matrix from "./pages/Matrix";
import ControlRoom from "./pages/ControlRoom";
import AdminRoom from "./pages/AdminRoom";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/secret-menu" element={<SecretMenu />} />
          <Route path="/treasure" element={<TreasureRoom />} />
          <Route path="/konami" element={<KonamiZone />} />
          <Route path="/dev-room" element={<DevRoom />} />
          <Route path="/gift-box" element={<GiftBox />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/matrix" element={<Matrix />} />
          <Route path="/control-room" element={<ControlRoom />} />
          <Route path="/admin-room" element={<AdminRoom />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
