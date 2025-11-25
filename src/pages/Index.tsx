import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
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
        
        {/* Spinning cogs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`cog-${i}`}
            className="absolute rounded-full border-2 border-accent/30"
            style={{
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              top: `${15 + i * 15}%`,
              left: `${5 + i * 18}%`,
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(8)].map((_, j) => (
              <div
                key={j}
                className="absolute w-1 h-3 bg-accent/40 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${j * 45}deg) translateY(-${30 + i * 20}px)`,
                }}
              />
            ))}
          </motion.div>
        ))}

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
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {["We", "Build", "the", "Systems"].map((word, i) => (
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
              Goodbye spreadsheets, Notion pages, and stitched-together automations. We design and engineer a single, bespoke platform that mirrors your exact workflow—with the precision, clarity, and polish your business deserves.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link to="/contact">
              <Button variant="premium" size="xl" className="animate-glow">
                Book a Private Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Replace Your Patchwork Tools */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            Replace Your Patchwork Tools
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light mb-12"
          >
            Your team shouldn't have to juggle Google Sheets, Notion wikis, WhatsApp threads, email chains, Zapier flows, disconnected forms, and offline steps. We unify them into one elegant platform—designed for the way you actually work.
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Spreadsheets", "Notion", "WhatsApp", "Email", "Zapier", "Forms", "Manual Steps", "Disconnected Tools"].map((tool, i) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-muted/60 backdrop-blur-sm rounded-lg border border-border/30 text-center"
              >
                <span className="text-muted-foreground line-through">{tool}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                whileHover={{ scale: 1.05, rotate: type.highlight ? 0 : 0 }}
                className="group"
              >
                <div className={`p-8 rounded-xl border-2 transition-all duration-500 h-full ${
                  type.highlight 
                    ? "bg-primary text-primary-foreground border-primary hover:border-primary-hover hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]" 
                    : "bg-card border-border hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                }`}>
                  <h4 className="mb-3">{type.name}</h4>
                  <p className={`text-sm leading-relaxed ${type.highlight ? "text-primary-foreground/90" : "text-muted-foreground"}`}>{type.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Outcomes */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-light min-h-[120px] flex items-center"
            >
              <span className="text-primary">{text}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="border-r-2 border-primary ml-1"
              />
            </motion.div>
          </div>
        </div>
      </section>

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

      {/* Process */}
      <section className="py-24 md:py-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
          >
            How We Work
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {["Consult", "Scope", "Design", "Build", "Refine"].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <motion.div
                  className="mb-4 text-6xl font-light text-muted-foreground/30"
                  whileHover={{ color: "hsl(var(--primary))" }}
                  transition={{ duration: 0.3 }}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </motion.div>
                <h4 className="font-light">{step}</h4>
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
                Book a Private Consultation
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
