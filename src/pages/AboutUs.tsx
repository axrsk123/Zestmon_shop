import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useState } from "react";
import Cart from "@/components/Cart";
import { CartItem } from "@/types/product";

const AboutUs = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => {}}
      />
      
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 
              className="text-3xl font-bold tracking-tight cursor-pointer hover:text-primary transition-colors"
              onClick={() => navigate("/dev-room")}
            >
              About{" "}
              <span className="opacity-50 hover:opacity-100 transition-opacity">
                Zestmon
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              At Zestmon, we believe in the power of simple, fresh ingredients. Every bottle 
              is crafted with care using real fruit, fresh lemons, and natural ingredients. 
              No artificial flavors, no preservatives – just pure, refreshing taste.
              made by a 12 years old kid and organized by a parent 
            </p>
            <p className="text-lg text-muted-foreground">
              From our classic lemonade to exotic tropical blends, each flavor is designed to 
              bring a moment of refreshment to your day. Made fresh daily and bottled with love.
            </p>
          </div>
        </div>
      </section>

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
      />
    </div>
  );
};

export default AboutUs;
