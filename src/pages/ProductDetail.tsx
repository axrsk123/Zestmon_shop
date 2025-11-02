import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  };
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { products } = useProducts();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState({ rating: 5, comment: "" });
  const [user, setUser] = useState<any>(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    fetchReviews();
    checkUser();
  }, [id]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user && id) {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", id)
        .eq("user_id", user.id)
        .single();
      if (data) {
        setHasReviewed(true);
        setUserReview({ rating: data.rating, comment: data.comment || "" });
      }
    }
  };

  const fetchReviews = async () => {
    if (!id) return;
    const { data, error } = await supabase
      .from("reviews")
      .select(`
        id,
        rating,
        comment,
        created_at,
        profiles (
          full_name,
          email
        )
      `)
      .eq("product_id", id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(data as any);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to submit a review",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!userReview.comment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please write a comment for your review",
        variant: "destructive",
      });
      return;
    }

    const reviewData = {
      product_id: id,
      user_id: user.id,
      rating: userReview.rating,
      comment: userReview.comment,
    };

    if (hasReviewed) {
      const { error } = await supabase
        .from("reviews")
        .update(reviewData)
        .eq("product_id", id)
        .eq("user_id", user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update review",
          variant: "destructive",
        });
      } else {
        toast({ title: "Review Updated!" });
        fetchReviews();
      }
    } else {
      const { error } = await supabase
        .from("reviews")
        .insert(reviewData);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to submit review",
          variant: "destructive",
        });
      } else {
        toast({ title: "Review Submitted!" });
        setHasReviewed(true);
        fetchReviews();
      }
    }
  };

  const handleAddToCart = () => {
    if (!product || (product.stock !== undefined && product.stock <= 0)) {
      toast({
        title: "Out of Stock",
        description: "This product is currently unavailable",
        variant: "destructive",
      });
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast({ title: "Added to Cart!" });
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Button onClick={() => navigate("/")}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-secondary/20 rounded-lg p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-[500px] object-contain"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <Badge variant="secondary" className="mb-4">
                {product.category}
              </Badge>
              <p className="text-muted-foreground text-lg mb-4">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(parseFloat(averageRating))
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{averageRating}</span>
              <span className="text-muted-foreground">
                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.stock !== undefined && (
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                </Badge>
              )}
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock !== undefined && product.stock <= 0}
              className="w-full"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-8 w-8 cursor-pointer transition-colors ${
                      rating <= userReview.rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setUserReview({ ...userReview, rating })}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Comment</label>
              <Textarea
                placeholder="Share your thoughts about this product..."
                value={userReview.comment}
                onChange={(e) =>
                  setUserReview({ ...userReview, comment: e.target.value })
                }
                rows={4}
              />
            </div>
            <Button onClick={handleSubmitReview}>
              {hasReviewed ? "Update Review" : "Submit Review"}
            </Button>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {review.profiles.full_name?.[0] || review.profiles.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold">
                              {review.profiles.full_name || review.profiles.email}
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-primary text-primary"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
