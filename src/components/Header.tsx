import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
}

const Header = ({ cartItemCount, onCartClick, onSearchClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-transform"
            onClick={() => navigate("/secret-menu")}
            title="🤫 Secret Menu"
          >
            Zestmon
          </h1>
          <nav className="hidden md:flex gap-6">
            <a 
              href="#products" 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                // Ak sme na hlavnej stránke, scroll na products sekciu
                if (window.location.pathname === '/') {
                  document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // Ak sme na inej stránke, naviguj na hlavnú stránku
                  navigate('/');
                }
              }}
            >
              Lemonades
            </a>
            <button 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => navigate("/about-us")}
            >
              About Us
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex"
            onClick={onSearchClick}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant={isLoggedIn ? "default" : "outline"}
            size="sm"
            onClick={() => navigate(isLoggedIn ? "/profile" : "/auth")}
          >
            <User className="h-4 w-4 mr-2" />
            {isLoggedIn ? "Profile" : "Login"}
          </Button>
          <Button
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
