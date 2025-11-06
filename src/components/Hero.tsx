import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-lemonade.jpg";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-background py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] -z-10" />
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-block">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                🍋 Premium Quality
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              <span 
                className="cursor-pointer hover:text-accent transition-colors"
                onClick={() => navigate("/treasure")}
              >
                Refresh
              </span> Your Day
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
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
                className="cursor-pointer hover:text-primary transition-colors font-medium"
                onClick={() => navigate("/gift-box")}
              >
                fresh
              </span>{" "}
              daily with real fruit and natural ingredients. Pure refreshment in every glass.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-base shadow-lg hover:shadow-xl transition-all"
                onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Order Now
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl -z-10" />
            <div className="aspect-video overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
              <img 
                src={heroImage} 
                alt="Fresh lemonade pitcher with ice and lemons" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-8 py-4 rounded-full shadow-xl font-semibold text-sm">
              ✨ Made Fresh Daily
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
