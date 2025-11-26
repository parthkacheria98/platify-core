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
  
  const [outcomes, setOutcomes] = useState([
    "Operational clarity through unified systems",
    "Faster decision-making with real-time data",
    "Fewer errors via automated workflows",
    "One source of truth for your entire team",
    "Tools that perfectly match your workflow",
  ]);

  useEffect(() => {
    // Load outcomes from localStorage
    const saved = localStorage.getItem("signatureOutcomes");
    if (saved) {
      const parsedOutcomes = JSON.parse(saved);
      setOutcomes(parsedOutcomes.map((o: any) => o.text));
    }
  }, []);

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
        
        {/* Spinning proper gears - matching reference positions with exact 8-tooth shape */}
        {[
          { size: 80, top: "80px", left: "40px", speed: 6 },
          { size: 100, top: "80px", right: "80px", speed: 5 },
          { size: 140, top: "420px", right: "120px", speed: 7 },
          { size: 70, bottom: "150px", left: "30px", speed: 5.5 },
        ].map((gear, i) => {
          // Exact 8-tooth gear from reference image with rounded bulbous teeth
          const pathData = `
            M 50,12 
            C 53,12 55,14 56,17 
            L 58,24 
            C 59,27 61,29 64,29 
            C 67,29 69,27 70,24 
            L 72,17 
            C 73,14 75,12 78,12 
            C 81,12 83,14 84,17 
            L 86,24 
            C 87,27 89,29 92,29 
            C 95,29 97,27 98,24 
            L 100,17 
            C 101,14 103,12 106,12 
            L 106,38 
            C 103,38 101,40 100,43 
            L 98,50 
            C 97,53 95,55 92,55 
            C 89,55 87,53 86,50 
            L 84,43 
            C 83,40 81,38 78,38 
            C 75,38 73,40 72,43 
            L 70,50 
            C 69,53 67,55 64,55 
            C 61,55 59,53 58,50 
            L 56,43 
            C 55,40 53,38 50,38 
            C 47,38 45,40 44,43 
            L 42,50 
            C 41,53 39,55 36,55 
            C 33,55 31,53 30,50 
            L 28,43 
            C 27,40 25,38 22,38 
            C 19,38 17,40 16,43 
            L 14,50 
            C 13,53 11,55 8,55 
            C 5,55 3,53 2,50 
            L 0,43 
            C -1,40 -3,38 -6,38 
            L -6,12 
            C -3,12 -1,14 0,17 
            L 2,24 
            C 3,27 5,29 8,29 
            C 11,29 13,27 14,24 
            L 16,17 
            C 17,14 19,12 22,12 
            C 25,12 27,14 28,17 
            L 30,24 
            C 31,27 33,29 36,29 
            C 39,29 41,27 42,24 
            L 44,17 
            C 45,14 47,12 50,12 
            Z
          `.replace(/\s+/g, ' ').trim();
          
          // Simpler, more accurate 8-tooth gear based on reference
          const teeth = 8;
          const center = 50;
          const innerRadius = 32;
          const outerRadius = 50;
          const toothWidth = 18;
          
          let gearPath = "";
          
          for (let t = 0; t < teeth; t++) {
            const angle = (t * 360 / teeth) - 90; // Start at top
            const nextAngle = ((t + 1) * 360 / teeth) - 90;
            
            // Angles for tooth curves
            const valleyStart = angle * Math.PI / 180;
            const toothTip = (angle + (nextAngle - angle) / 2) * Math.PI / 180;
            const valleyEnd = nextAngle * Math.PI / 180;
            
            // Valley start point
            const x1 = center + Math.cos(valleyStart) * innerRadius;
            const y1 = center + Math.sin(valleyStart) * innerRadius;
            
            // Tooth tip (bulbous peak)
            const tipX = center + Math.cos(toothTip) * outerRadius;
            const tipY = center + Math.sin(toothTip) * outerRadius;
            
            // Valley end point
            const x2 = center + Math.cos(valleyEnd) * innerRadius;
            const y2 = center + Math.sin(valleyEnd) * innerRadius;
            
            // Control points for smooth, bulbous curves
            const cp1x = center + Math.cos(valleyStart + 0.2) * (innerRadius + 14);
            const cp1y = center + Math.sin(valleyStart + 0.2) * (innerRadius + 14);
            
            const cp2x = center + Math.cos(toothTip - 0.15) * (outerRadius - 3);
            const cp2y = center + Math.sin(toothTip - 0.15) * (outerRadius - 3);
            
            const cp3x = center + Math.cos(toothTip + 0.15) * (outerRadius - 3);
            const cp3y = center + Math.sin(toothTip + 0.15) * (outerRadius - 3);
            
            const cp4x = center + Math.cos(valleyEnd - 0.2) * (innerRadius + 14);
            const cp4y = center + Math.sin(valleyEnd - 0.2) * (innerRadius + 14);
            
            if (t === 0) {
              gearPath += `M ${x1},${y1} `;
            }
            
            // Smooth curve up to tooth tip
            gearPath += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${tipX},${tipY} `;
            // Smooth curve down from tooth tip
            gearPath += `C ${cp3x},${cp3y} ${cp4x},${cp4y} ${x2},${y2} `;
          }
          
          gearPath += "Z";
          
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
              <motion.svg
                width={gear.size}
                height={gear.size}
                viewBox="0 0 100 100"
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                }}
                transition={{
                  duration: gear.speed,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <defs>
                  <filter id={`glow-${i}`}>
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* 8-tooth gear with exact rounded bulbous teeth from reference */}
                <path
                  d={gearPath}
                  fill="hsl(var(--primary))"
                  fillOpacity="0.35"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  filter={`url(#glow-${i})`}
                />
                
                {/* Center hole */}
                <circle
                  cx="50"
                  cy="50"
                  r="18"
                  fill="hsl(var(--background))"
                  fillOpacity="0.9"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
              </motion.svg>
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
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.3, 
                  delay: i * 0.15,
                  ease: "easeOut"
                }}
                className="relative p-4 bg-muted/60 backdrop-blur-sm rounded-lg border border-border/30 text-center overflow-hidden"
              >
                <motion.span 
                  className="relative z-10 inline-block"
                  initial={{ opacity: 1 }}
                  whileInView={{ opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.15 + 0.3 }}
                >
                  {tool}
                </motion.span>
                
                {/* Violent strike-through line */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scaleX: 0, rotate: -8 }}
                  whileInView={{ scaleX: 1, rotate: -8 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: i * 0.15 + 0.3,
                    ease: [0.68, -0.55, 0.265, 1.55]
                  }}
                >
                  <div className="w-full h-1 bg-destructive shadow-[0_0_10px_hsl(var(--destructive))]" 
                    style={{
                      transformOrigin: 'center',
                    }}
                  />
                </motion.div>
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
      <section className="relative py-24 md:py-32 px-6 lg:px-12 border-t border-border/50 overflow-hidden">
        {/* Animated gradient background */}
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
              {/* Glowing background effect */}
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
