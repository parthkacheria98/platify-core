import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import platifyLogo from "@/assets/platify-logo.png";
import platypusLogo from "@/assets/platifyplatypuslogo.png";

const Navigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Services", path: "/services" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Insights", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-600 ease-premium",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"
      )}
    >
      <div className="max-w-9xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2 md:py-0 gap-2 md:gap-4 md:h-20 lg:h-24">
          <Link
            to="/"
            className="hover:opacity-70 transition-opacity duration-300 flex-shrink-0 flex items-center gap-2 md:gap-3"
          >
            <img src={platypusLogo} alt="Platify Platypus" className="h-10 md:h-16 w-auto md:relative md:-top-[1px]" />
            <div className="overflow-hidden flex items-center h-12 md:h-16">
              <img src={platifyLogo} alt="Platify" className="h-16 md:h-20 w-auto dark:invert scale-125" />
            </div>
          </Link>

          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 sm:gap-4 md:gap-8 lg:gap-12">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm sm:text-base md:text-lg font-light tracking-wide transition-all duration-300 whitespace-nowrap flex-shrink-0",
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
