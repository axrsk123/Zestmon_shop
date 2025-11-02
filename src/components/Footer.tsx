import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-secondary/30 border-t mt-16">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Zestmon</h3>
            <p className="text-sm text-muted-foreground">
              Fresh, natural lemonade made with love by a 12-year-old entrepreneur.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-primary transition-colors">
                  Shop
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/about-us")} className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/contact")} className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/faq")} className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate("/privacy")} className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/terms")} className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/refund-policy")} className="text-muted-foreground hover:text-primary transition-colors">
                  Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/shipping-policy")} className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Policy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@zestmon.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Lemon Street<br />Fresh Valley, CA 90210</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zestmon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
