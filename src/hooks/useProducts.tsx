import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { products as staticProducts } from "@/data/products";
import { Product } from "@/types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('drinks_stock_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'drinks_stock'
        },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("drinks_stock")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data) {
        const mergedProducts = staticProducts.map(staticProduct => {
          const dbProduct = data.find(d => d.name === staticProduct.name);
          return {
            ...staticProduct,
            price: dbProduct?.price || staticProduct.price,
            stock: dbProduct?.stock || 0,
            category: dbProduct?.category || staticProduct.category,
          };
        });
        setProducts(mergedProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading };
};
