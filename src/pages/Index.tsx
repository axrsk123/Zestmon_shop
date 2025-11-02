import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import About from "@/components/About";
import SearchDialog from "@/components/SearchDialog";
import GameHub from "@/components/games/GameHub";
import { CustomerAIChat } from "@/components/CustomerAIChat";
import { useProducts } from "@/hooks/useProducts";
import { CartItem, Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Gamepad2, Sparkles, Trophy, Zap, Gift, MessageCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        toast({
          title: "Updated cart",
          description: `Increased quantity of ${product.name}`,
          duration: 4000,
        });
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
        duration: 4000,
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
      duration: 4000,
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
      />
      <Hero />
      
      <section id="products" className="container py-16">
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <h2 
              className="text-3xl font-bold tracking-tight cursor-pointer hover:text-accent transition-colors"
              onClick={() => navigate("/control-room")}
            >
              Fresh Lemonades
            </h2>
            <p className="text-muted-foreground">
              Discover our{" "}
              <span 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate("/matrix")}
              >
                handcrafted
              </span>{" "}
              collection of refreshing lemonade flavors
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <About />

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleAddToCart}
      />

      <GameHub
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
      />

      {isChatOpen && (
        <div className="fixed bottom-6 right-24 z-50 animate-in slide-in-from-bottom-5">
          <CustomerAIChat onClose={() => setIsChatOpen(false)} />
        </div>
      )}

      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50 bg-yellow-500 hover:bg-yellow-600"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Button
        onClick={() => setIsGameOpen(true)}
        size="icon"
        className="fixed bottom-24 right-6 h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        variant="hero"
      >
        <Gamepad2 className="h-5 w-5" />
      </Button>

      <Button
        onClick={() => toast({ title: "Easter Egg!", description: "🎉 You found a secret button! Keep exploring...", duration: 4000 })}
        size="icon"
        className="fixed bottom-40 right-6 h-10 w-10 rounded-full shadow-lg hover:scale-110 transition-transform z-50 opacity-30 hover:opacity-100"
        variant="outline"
      >
        <Sparkles className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => {
          const randomProduct = products[Math.floor(Math.random() * products.length)];
          handleAddToCart(randomProduct);
          toast({ title: "Lucky Pick!", description: `🎲 Random flavor added: ${randomProduct.name}`, duration: 4000 });
        }}
        size="icon"
        className="fixed bottom-6 left-6 h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-transform z-50 opacity-40 hover:opacity-100"
        variant="outline"
      >
        <Gift className="h-5 w-5" />
      </Button>

      <Button
        onClick={() => {
          setIsCartOpen(true);
          toast({ title: "Cart Shortcut", description: "🛒 Quick access to your cart!", duration: 4000 });
        }}
        size="icon"
        className="fixed top-24 right-6 h-10 w-10 rounded-full shadow-lg hover:scale-110 transition-transform z-40 opacity-20 hover:opacity-100 hidden md:flex"
        variant="outline"
      >
        <Trophy className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => {
          toast({ 
            title: "Power Up!", 
            description: "⚡ Extra energy boost! (Not really, but the thought counts!)",
            duration: 4000
          });
        }}
        size="icon"
        className="fixed bottom-6 left-24 h-10 w-10 rounded-full shadow-lg hover:scale-110 transition-transform z-50 opacity-20 hover:opacity-100 hidden sm:flex"
        variant="outline"
      >
        <Zap className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Index;
