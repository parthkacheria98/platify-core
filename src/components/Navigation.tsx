import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

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
        <div className="flex items-center justify-between h-20 md:h-24 gap-4">
          <Link
            to="/"
            className="text-lg md:text-xl font-light tracking-tight hover:opacity-70 transition-opacity duration-300 flex-shrink-0"
          >
            Platify
          </Link>

          <div className="flex items-center gap-4 md:gap-8 lg:gap-12 flex-wrap justify-end">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-xs sm:text-sm md:text-base font-light tracking-wide transition-all duration-300 whitespace-nowrap",
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
