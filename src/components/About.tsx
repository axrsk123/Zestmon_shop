import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, Sparkles, Users } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-secondary/30 to-background border-y">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 
              className="text-4xl font-bold tracking-tight cursor-pointer hover:text-primary transition-colors"
              onClick={() => navigate("/dev-room")}
            >
              About{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Zestmon
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              At Zestmon, we believe in the power of simple, fresh ingredients. Every bottle 
              is crafted with care using real fruit, fresh lemons, and natural ingredients. 
              No artificial flavors, no preservatives – just pure, refreshing taste.
            </p>
            <p className="text-lg text-muted-foreground">
              Made by a 12-year-old entrepreneur and organized by a parent. From our classic lemonade 
              to exotic tropical blends, each flavor is designed to bring a moment of refreshment to your day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background/50 border hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="p-3 rounded-full bg-primary/10">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold">100% Natural</h3>
              <p className="text-sm text-muted-foreground">Only real ingredients</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background/50 border hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="p-3 rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold">Made with Love</h3>
              <p className="text-sm text-muted-foreground">Handcrafted daily</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background/50 border hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="p-3 rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold">Fresh & Pure</h3>
              <p className="text-sm text-muted-foreground">No preservatives</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button 
              variant="default" 
              size="lg"
              onClick={() => navigate("/about-us")}
              className="shadow-md hover:shadow-lg transition-all"
            >
              <Users className="mr-2 h-5 w-5" />
              Our Story
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/contact")}
              className="border-2 hover:border-primary"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
