import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-light mb-4">Platify</h3>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              We build the systems your business runs on. Bespoke platforms engineered for clarity, precision, and premium execution.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wide">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wide">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@platify.com"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  hello@platify.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">© {currentYear} Platify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
