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
import AboutUs from "./pages/AboutUs";
import ProductDetail from "./pages/ProductDetail";
import OrderConfirmation from "./pages/OrderConfirmation";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import AdminOrders from "./pages/AdminOrders";
import AdminCustomers from "./pages/AdminCustomers";
import AdminAnalytics from "./pages/AdminAnalytics";

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
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
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
          <Route path="/about-us" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
