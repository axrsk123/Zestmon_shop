import { ShoppingCart, Search, User, Menu, Shield, Sun, Moon, Sparkles, Gift, HelpCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import SocialLinks from "@/components/SocialLinks";
import { useTheme } from "@/components/ThemeProvider";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
}

const Header = ({ cartItemCount, onCartClick, onSearchClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
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
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-yellow-400 to-primary opacity-20 blur-sm group-hover:opacity-40 transition-opacity rounded-lg" />
            <h1 
              className="relative text-2xl font-bold cursor-pointer bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent hover:scale-105 transition-transform"
              onClick={() => navigate("/")}
            >
              ZESTMON
            </h1>
          </div>
          
          <nav className="hidden md:flex gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="font-medium hover:bg-primary/10"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Shop
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/about-us")}
              className="font-medium hover:bg-primary/10"
            >
              <Award className="mr-2 h-4 w-4" />
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/contact")}
              className="font-medium hover:bg-primary/10"
            >
              Contact
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/faq")}
              className="font-medium hover:bg-primary/10"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/gift-box")}
              className="font-medium border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <Gift className="mr-2 h-4 w-4" />
              Gifts
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
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            title="Toggle theme"
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 hover:rotate-12 transition-transform" />
            ) : (
              <Sun className="h-5 w-5 hover:rotate-90 transition-transform" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearchClick}
            className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-colors"
            title="Search products"
          >
            <Search className="h-5 w-5 hover:scale-110 transition-transform" />
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
            className="relative hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={onCartClick}
            title="View cart"
          >
            <ShoppingCart className="h-5 w-5 hover:scale-110 transition-transform" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-primary to-yellow-400 text-primary-foreground text-xs flex items-center justify-center font-bold shadow-lg animate-pulse">
                {cartItemCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(user ? "/profile" : "/auth")}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
            title={user ? "Profile" : "Sign in"}
          >
            <User className="h-5 w-5 hover:scale-110 transition-transform" />
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
