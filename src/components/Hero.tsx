import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SocialLinks from "@/components/SocialLinks";
import heroImage from "@/assets/hero-lemonade.jpg";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background py-20 md:py-32 border-b">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-foreground text-sm font-semibold border border-border/50 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Premium Handcrafted Lemonades
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
              <span 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate("/treasure")}
              >
                Refresh
              </span>{" "}
              Your Day
              <span className="block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent mt-2">
                One Sip at a{" "}
                <span 
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => navigate("/konami")}
                >
                  Time
                </span>
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-[600px] leading-relaxed">
              Handcrafted lemonades made{" "}
              <span 
                className="cursor-pointer hover:text-primary transition-colors font-semibold"
                onClick={() => navigate("/gift-box")}
              >
                fresh
              </span>{" "}
              daily with real fruit and natural ingredients. Pure refreshment in every glass.
            </p>
            
            <div className="flex flex-col gap-6">
              <Button 
                variant="default" 
                size="lg" 
                className="w-fit text-base shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Order Now
              </Button>
              
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Join Our Community:</p>
                <SocialLinks variant="hero" />
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-3xl blur-3xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border/50">
              <img 
                src={heroImage} 
                alt="Fresh lemonade pitcher with ice and lemons" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-foreground to-foreground/90 text-background px-6 py-3 rounded-2xl shadow-xl font-bold text-sm border border-border/20">
              ✨ Made Fresh Daily
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
