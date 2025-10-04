import { Button } from "@/components/ui/button";
import laptopImage from "@/assets/product-laptop.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary/50 to-background py-20 md:py-32">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Elevate Your Tech
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-[600px]">
              Discover the latest in cutting-edge technology. Premium devices, unbeatable prices, and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-base">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="text-base">
                View Deals
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={laptopImage} 
                alt="Featured laptop product" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg font-semibold">
              New Arrival
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
