import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import About from "@/components/About";
import SearchDialog from "@/components/SearchDialog";
import GameHub from "@/components/games/GameHub";
import { products } from "@/data/products";
import { CartItem, Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        toast({
          title: "Updated cart",
          description: `Increased quantity of ${product.name}`,
        });
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
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
            <h2 className="text-3xl font-bold tracking-tight">Fresh Lemonades</h2>
            <p className="text-muted-foreground">
              Discover our handcrafted collection of refreshing lemonade flavors
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

      <Button
        onClick={() => setIsGameOpen(true)}
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        variant="hero"
      >
        <Gamepad2 className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Index;
