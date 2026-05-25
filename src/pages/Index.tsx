import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  // const [outcomes, setOutcomes] = useState([
  //   "Operational clarity through unified systems",
  //   "Faster decision-making with real-time data",
  //   "Fewer errors via automated workflows",
  //   "One source of truth for your entire team",
  //   "Tools that perfectly match your workflow",
  // ]);

  // useEffect(() => {
  //   // Load outcomes from localStorage
  //   const saved = localStorage.getItem("signatureOutcomes");
  //   if (saved) {
  //     const parsedOutcomes = JSON.parse(saved);
  //     setOutcomes(parsedOutcomes.map((o: any) => o.text));
  //   }
  // }, []);

  // const [currentOutcome, setCurrentOutcome] = useState(0);
  // const [isDeleting, setIsDeleting] = useState(false);
  // const [text, setText] = useState("");
  // const [delta, setDelta] = useState(40);

  // useEffect(() => {
  //   const ticker = setInterval(() => {
  //     tick();
  //   }, delta);

  //   return () => clearInterval(ticker);
  // }, [text, isDeleting, currentOutcome, delta]);

  // const tick = () => {
  //   const fullText = outcomes[currentOutcome];
    
  //   if (!isDeleting) {
  //     setText(fullText.substring(0, text.length + 1));
  //     setDelta(40); // Faster typing: 40ms per character (was 100ms)

  //     if (text === fullText) {
  //       setTimeout(() => setIsDeleting(true), 3000); // Display for 3 seconds (was 2s) - good reading time
  //       setDelta(3000);
  //     }
  //   } else {
  //     setText(fullText.substring(0, text.length - 1));
  //     setDelta(30); // Faster deleting: 30ms per character (was 50ms)

  //     if (text === "") {
  //       setIsDeleting(false);
  //       setCurrentOutcome((prev) => (prev + 1) % outcomes.length);
  //       setDelta(300); // Shorter pause before next (was 500ms)
  //     }
  //   }
  // };

  const industries = [
    { name: "Jewellery & Luxury", description: "End-to-end operations platforms for design, production, and retail" },
    { name: "Manufacturing", description: "Workflow systems for production, inventory, and supply chain" },
    { name: "D2C Brands & E-commerce", description: "Insights & operations tools for scaling your business" },
    { name: "Startups & Founders", description: "Internal tools and dashboards for your growing operations" },
  ];

  const buildTypes = [
    { name: "Complete Business Platforms", description: "Full-stack systems that power your entire operation" },
    { name: "Cloud Integrations & Support", description: "AWS, Azure, GCP, Databricks, Snowflake, ClickHouse, ClickUp, Posthog, etc." },
    { name: "Internal Tools", description: "Custom dashboards and admin panels" },
    { name: "Beautiful Websites", description: "Modular and easy to edit" },
    { name: "Client & Vendor Portals", description: "White-label customer and supplier platforms" },
    { name: "Analytics Dashboards", description: "Real-time insights and reporting" }
  ];

  const testimonials = [
    {
      quote: "Platify transformed our jewelry production workflows. We have shifted all our teams onto this and they love it!",
      author: "Nimit Parikh",
      role: "Manager, Trezza Jewels",
      company: "Luxury Jewelry Brand"
    },
    {
      quote: "The custom portal they built connects our 50+ vendors seamlessly. Our customers love the transparency!",
      author: "Aditya Khanna",
      role: "Manager, Jewelart",
      company: "Manufacturing Company"
    },
    {
      quote: "Finally, a platform that actually fits how we work. No more juggling five different tools. Everything is in one place.",
      author: "Binoy Shah",
      role: "Manager, Maxmark",
      company: "Jewelry Manufacturer"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-32 px-6 lg:px-12 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--border)) 1.5px, transparent 1.5px), linear-gradient(90deg, hsl(var(--border)) 1.5px, transparent 1.5px)`,
              backgroundSize: '50px 50px',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Animated light waves moving along grid */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1.5px] w-full"
              style={{
                top: `${i * 12.5}%`,
                background: `linear-gradient(90deg, transparent, hsl(var(--primary)) 50%, transparent)`,
                boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))',
              }}
              animate={{
                x: ['-100%', '200%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-[1.5px] h-full"
              style={{
                left: `${i * 16.66}%`,
                background: `linear-gradient(180deg, transparent, hsl(var(--secondary)) 50%, transparent)`,
                boxShadow: '0 0 10px hsl(var(--secondary)), 0 0 20px hsl(var(--secondary))',
              }}
              animate={{
                y: ['-100%', '200%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 5 + i * 0.6,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Spinning proper gears - matching reference positions with exact 8-tooth shape */}
        {/* Temporarily hidden */}
        {false && [
          { size: 80, top: "80px", left: "40px", speed: 6 },
          { size: 100, top: "80px", right: "80px", speed: 5 },
          { size: 140, top: "420px", right: "120px", speed: 7 },
          { size: 70, bottom: "150px", left: "30px", speed: 5.5 },
        ].map((gear, i) => {
          return (
            <div 
              key={`gear-group-${i}`} 
              className="absolute pointer-events-none" 
              style={{ 
                top: gear.top, 
                left: gear.left, 
                right: gear.right,
                bottom: gear.bottom,
                zIndex: 0
              }}
            >
              <motion.img
                src="/gear-icon.png"
                alt=""
                width={gear.size}
                height={gear.size}
                style={{
                  filter: "hue-rotate(0deg) saturate(1) brightness(1)",
                  opacity: 0.35,
                }}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                }}
                transition={{
                  duration: gear.speed,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          );
        })}

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity, scale }}
          >
            <motion.h1 
              className="mb-8 md:mb-12"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                y: [0, -10, 0]
              }}
              transition={{ 
                opacity: { duration: 1, delay: 0.2 },
                y: { 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }
              }}
            >
              {["We", "Build", "The", "Platform"].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {["Your", "Business", "Runs", "On."].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-12 font-light">
            Drop the spreadsheets. Ditch the duct-taped automations. Get a platform designed exactly for the way you work.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="premium" size="xl" className="animate-glow w-full sm:w-auto">
                Upgrade my workflow!
              </Button>
            </Link>
            <Link to="/case-studies" className="w-full sm:w-auto">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Show me your work!
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Replace Your Patchwork Tools */}
      <HeroSection />

      {/* What We Build */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
          >
            What We Build
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {buildTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="p-8 rounded-xl border-2 bg-card border-border hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-500 h-full">
                  <h4 className="mb-3">{type.name}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{type.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 md:mt-24 text-center"
          >
            <Link to="/services">
              <Button variant="premium" size="xl">
                Our Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Signature Outcomes */}
      {/* <section className="relative py-24 md:py-32 px-6 lg:px-12 border-t border-border/50 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, hsl(var(--primary)/0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, hsl(var(--secondary)/0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, hsl(var(--accent)/0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, hsl(var(--primary)/0.2) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
          >
            Signature Outcomes
          </motion.h2>
          
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative text-3xl md:text-5xl font-light min-h-[120px] flex items-center"
            >
              <motion.div
                className="absolute inset-0 blur-3xl opacity-50"
                animate={{
                  background: [
                    'radial-gradient(ellipse, hsl(var(--primary)/0.4) 0%, transparent 70%)',
                    'radial-gradient(ellipse, hsl(var(--secondary)/0.4) 0%, transparent 70%)',
                    'radial-gradient(ellipse, hsl(var(--primary)/0.4) 0%, transparent 70%)',
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <span className="text-primary relative z-10 px-4">{text}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="border-r-2 border-primary ml-1 relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Industries */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
          >
            Industries We Build For
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <div className="bg-card border-2 border-border p-8 md:p-10 rounded-xl hover:border-secondary hover:shadow-[0_0_30px_hsl(var(--secondary)/0.3)] transition-all duration-500">
                  <h3 className="mb-4 text-secondary">{industry.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{industry.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24 text-center"
          >
            What Our Clients Say
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <div className="bg-card border-2 border-border p-8 rounded-xl hover:border-accent hover:shadow-[0_0_25px_hsl(var(--accent)/0.25)] transition-all duration-500 h-full flex flex-col">
                  <p className="text-lg leading-relaxed mb-6 flex-grow italic text-muted-foreground">"{testimonial.quote}"</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-accent mt-1">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            Ready to Build Your System?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 font-light"
          >
            Let's discuss your workflow and design a platform that brings clarity to your operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/contact">
              <Button variant="premium" size="xl">
                Upgrade my workflow!
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
