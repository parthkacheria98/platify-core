import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const Index = () => {
  const outcomes = [
    "Operational clarity through unified systems",
    "Faster decision-making with real-time data",
    "Fewer errors via automated workflows",
    "One source of truth for your entire team",
    "Tools that perfectly match your workflow",
  ];

  const [currentOutcome, setCurrentOutcome] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(150);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, isDeleting, currentOutcome]);

  const tick = () => {
    const fullText = outcomes[currentOutcome];
    
    if (!isDeleting) {
      setText(fullText.substring(0, text.length + 1));
      setDelta(100);

      if (text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
        setDelta(2000);
      }
    } else {
      setText(fullText.substring(0, text.length - 1));
      setDelta(50);

      if (text === "") {
        setIsDeleting(false);
        setCurrentOutcome((prev) => (prev + 1) % outcomes.length);
        setDelta(500);
      }
    }
  };

  const industries = [
    { name: "Jewellery & Luxury", description: "End-to-end operations platforms for design, production, and retail" },
    { name: "Manufacturing", description: "Workflow systems for production, inventory, and supply chain" },
    { name: "D2C Brands", description: "Insights & operations tools for scaling your direct-to-consumer business" },
    { name: "Startups & Founders", description: "Internal tools and dashboards to streamline your growing operations" },
  ];

  const buildTypes = [
    { 
      name: "Complete Business Platforms", 
      description: "Full-stack systems that power your entire operation",
      highlight: true 
    },
    { name: "Internal Tools", description: "Custom dashboards and admin panels" },
    { name: "Workflow Automation", description: "Streamline repetitive processes" },
    { name: "Client Portals", description: "White-label customer platforms" },
    { name: "Vendor Portals", description: "Supplier collaboration systems" },
    { name: "Analytics Dashboards", description: "Real-time insights and reporting" },
  ];

  const testimonials = [
    {
      quote: "Nohov transformed our jewelry production workflow. What used to take days in spreadsheets now happens instantly in one beautiful platform.",
      author: "Sarah Chen",
      role: "Founder, Lumière Jewelry",
      company: "Luxury Jewelry Brand"
    },
    {
      quote: "The custom portal they built connects our 50+ vendors seamlessly. Our supply chain has never been this transparent.",
      author: "Michael Rodriguez",
      role: "Operations Director",
      company: "Manufacturing Company"
    },
    {
      quote: "Finally, a platform that actually fits how we work. No more juggling five different tools. Everything is in one place.",
      author: "Priya Patel",
      role: "CEO",
      company: "D2C Fashion Brand"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-32 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="mb-8 md:mb-12 animate-hero">
              We Build the Systems
              <br />
              Your Business Runs On.
            </h1>
          </div>
          
          <div className="animate-fade-in-up delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-12 font-light">
              Goodbye spreadsheets, Notion pages, and stitched-together automations. We design and engineer a single, bespoke platform that mirrors your exact workflow—with the precision, clarity, and polish your business deserves.
            </p>
          </div>

          <div className="animate-fade-in-up delay-300">
            <Link to="/contact">
              <Button variant="premium" size="xl" className="animate-glow">
                Book a Private Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Replace Your Patchwork Tools */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-12 md:mb-16">Replace Your Patchwork Tools</h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light mb-12">
            Your team shouldn't have to juggle Google Sheets, Notion wikis, WhatsApp threads, email chains, Zapier flows, disconnected forms, and offline steps. We unify them into one elegant platform—designed for the way you actually work.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Spreadsheets", "Notion", "WhatsApp", "Email", "Zapier", "Forms", "Manual Steps", "Disconnected Tools"].map((tool, i) => (
              <div key={tool} className="animate-fade-in-up p-4 bg-muted/60 backdrop-blur-sm rounded-lg border border-border/30 text-center" style={{ animationDelay: `${i * 0.05}s` }}>
                <span className="text-muted-foreground line-through">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-16 md:mb-24">What We Build</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {buildTypes.map((type, index) => (
              <div
                key={type.name}
                className="animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className={`p-8 rounded-xl border-2 transition-all duration-500 h-full ${
                  type.highlight 
                    ? "bg-primary text-primary-foreground border-primary hover:border-primary-hover hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:scale-105" 
                    : "bg-card border-border hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] hover:scale-105"
                }`}>
                  <h4 className="mb-3">{type.name}</h4>
                  <p className={`text-sm leading-relaxed ${type.highlight ? "text-primary-foreground/90" : "text-muted-foreground"}`}>{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Outcomes */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-16 md:mb-24">Signature Outcomes</h2>
          
          <div className="flex justify-center">
            <div className="text-3xl md:text-5xl font-light min-h-[120px] flex items-center">
              <span className="text-primary">{text}</span>
              <span className="border-r-2 border-primary animate-pulse ml-1"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-16 md:mb-24">Industries We Build For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {industries.map((industry, index) => (
              <div
                key={industry.name}
                className="animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card border-2 border-border p-8 md:p-10 rounded-xl hover:border-secondary hover:shadow-[0_0_30px_hsl(var(--secondary)/0.3)] transition-all duration-500 group-hover:scale-105">
                  <h3 className="mb-4 text-secondary">{industry.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-16 md:mb-24 text-center">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="bg-card border-2 border-border p-8 rounded-xl hover:border-accent hover:shadow-[0_0_25px_hsl(var(--accent)/0.25)] transition-all duration-500 h-full flex flex-col">
                  <p className="text-lg leading-relaxed mb-6 flex-grow italic text-muted-foreground">"{testimonial.quote}"</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-accent mt-1">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-16 md:mb-24">How We Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {["Consult", "Scope", "Design", "Build", "Refine"].map((step, index) => (
              <div
                key={step}
                className="animate-fade-in-up text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 text-6xl font-light text-muted-foreground/30">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <h4 className="font-light">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8 md:mb-12">Ready to Build Your System?</h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-light">
            Let's discuss your workflow and design a platform that brings clarity to your operations.
          </p>

          <Link to="/contact">
            <Button variant="premium" size="xl">
              Book a Private Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
