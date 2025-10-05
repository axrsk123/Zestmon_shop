import { ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
}

const Header = ({ cartItemCount, onCartClick, onSearchClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Zestmon
          </h1>
          <nav className="hidden md:flex gap-6">
            <a 
              href="#products" 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Lemonade
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About Us
            </a>
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
