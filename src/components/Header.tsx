import { ShoppingCart, Search, User, Menu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import SocialLinks from "@/components/SocialLinks";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
}

const Header = ({ cartItemCount, onCartClick, onSearchClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .single()
          .then(({ data }) => setIsAdmin(!!data));
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .single()
          .then(({ data }) => setIsAdmin(!!data));
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 
            className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            ZESTMON
          </h1>
          
          <nav className="hidden md:flex gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="font-medium"
            >
              Shop
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/about-us")}
              className="font-medium"
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/contact")}
              className="font-medium"
            >
              Contact
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex">
            <SocialLinks variant="compact" showLabels={false} />
          </div>
          
          <div className="h-6 w-px bg-border hidden lg:block" />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearchClick}
            className="hidden sm:flex"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {isAdmin && (
            <Button 
              variant="outline"
              size="icon"
              onClick={() => navigate('/admin-room')}
              className="border-destructive text-destructive hover:bg-destructive/10"
              title="Admin Room"
            >
              <Shield className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold shadow-md">
                {cartItemCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(user ? "/profile" : "/auth")}
          >
            <User className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-2 animate-in slide-in-from-top-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
          >
            Shop
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              navigate("/about-us");
              setMobileMenuOpen(false);
            }}
          >
            About
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              navigate("/contact");
              setMobileMenuOpen(false);
            }}
          >
            Contact
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start sm:hidden"
            onClick={() => {
              onSearchClick();
              setMobileMenuOpen(false);
            }}
          >
            Search
          </Button>
          <div className="pt-4 border-t lg:hidden">
            <p className="text-sm font-semibold mb-3 px-2">Join Our Community:</p>
            <div className="flex justify-center">
              <SocialLinks variant="default" showLabels={false} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
