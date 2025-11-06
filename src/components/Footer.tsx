import { Link } from "react-router-dom";
import { Youtube, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-muted/50 to-background border-t mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-2xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ZESTMON
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Fresh, handcrafted lemonades made daily with real fruit and natural ingredients.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com/channel/UCofvtlvoXM0ElgAgcrrWhqQ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://discord.gg/NgU8dNap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors"
                aria-label="Discord Community"
              >
                <MessageSquare className="h-5 w-5 text-accent" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/#products" className="text-muted-foreground hover:text-primary transition-colors">
                  Lemonades
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about-us" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} ZESTMON. All rights reserved.</p>
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/channel/UCofvtlvoXM0ElgAgcrrWhqQ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                YouTube
              </a>
              <span>•</span>
              <a
                href="https://discord.gg/NgU8dNap"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Discord Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
