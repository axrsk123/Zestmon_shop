import { useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl border-border/50">
      <div className="relative aspect-square overflow-hidden bg-secondary/20">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div 
          className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => navigate("/lab")}
          title="🤫"
        >
          {product.category}
        </div>
        <div className="absolute top-3 left-3">
          <Badge 
            variant={product.stock === 0 ? "destructive" : product.stock! < 20 ? "outline" : "secondary"}
            className="gap-1"
          >
            <Package className="h-3 w-3" />
            {product.stock === 0 ? "Out of Stock" : `${product.stock} in stock`}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5 space-y-3">
        <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 cursor-pointer ${i < product.rating ? 'fill-primary text-primary' : 'fill-muted text-muted'} hover:scale-125 transition-transform`}
              onClick={() => i === 2 && navigate("/vault")}
            />
          ))}
          <span 
            className="text-sm text-muted-foreground ml-2 cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigate("/matrix")}
          >
            ({product.rating}.0)
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">
          ${product.price}
        </div>
        <Button 
          onClick={() => onAddToCart(product)}
          size="sm"
          className="gap-2"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock === 0 ? "Out of Stock" : "Add"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
