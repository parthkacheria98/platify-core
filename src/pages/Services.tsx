import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      title: "Custom Internal Software",
      description: "Tailored platforms engineered to match your exact workflow. From lead capture to delivery, we build systems that reflect how your business actually operates.",
      features: ["Bespoke engineering", "Zero compromises", "Built for your team"],
    },
    {
      title: "Client & Vendor Portals",
      description: "Give your stakeholders access to what they need. Nothing more, nothing less. Beautiful, secure portals that enhance relationships and reduce back-and-forth.",
      features: ["Branded experience", "Secure access", "Real-time updates"],
    },
    {
      title: "Beautiful, High Performance Websites",
      description: "From fully custom websites to Shopify and ecommerce setups, everything that needs to change is built to be editable, without calling a developer for every update.",
      features: ["Beautiful designs and animations", "Customized Admin Panels that actually give you control", "Seamless Integrations with your existing systems"],
    },
    {
      title: "Analytics & Business Insights",
      description: "We act as your analytics team and transform your data into clear, regular insights so you always know what is working, what is not, and where to focus next.",
      features: ["Fully automate businesss reporting", "Get to truly know your customers", ""],
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="mb-8 md:mb-12">Services</h1>
          </div>
          
          <div className="animate-fade-in-up delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
            Bespoke platforms designed, built, and operated around how your business actually works.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="animate-fade-in-up border border-border/50 p-8 md:p-12 hover:border-foreground/20 transition-all duration-600 ease-premium"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="mb-6">{service.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="text-muted-foreground mr-3">—</span>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 md:py-32 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-12 md:mb-16">Our Approach</h2>
          
          <div className="space-y-8">
            <div className="border-l-2 border-foreground/20 pl-8">
              <h4 className="mb-4">White-Glove Service</h4>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From the first consultation to post-launch refinement, we provide dedicated support and clear communication throughout.
              </p>
            </div>

            <div className="border-l-2 border-foreground/20 pl-8">
              <h4 className="mb-4">Bespoke Engineering</h4>
              <p className="text-muted-foreground text-lg leading-relaxed">
                No templates, no shortcuts. Every system is engineered specifically for your workflow, your team, and your business.
              </p>
            </div>

            <div className="border-l-2 border-foreground/20 pl-8">
              <h4 className="mb-4">Fixed-Cost Clarity</h4>
              <p className="text-muted-foreground text-lg leading-relaxed">
                One transparent price for a complete platform. No surprises, no hourly billing, no endless change orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8 md:mb-12">Let's Discuss Your Project</h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-light">
            Schedule a private consultation to explore how we can build the system your business needs.
          </p>

          <Link to="/contact">
            <Button variant="hero" size="xl">
              Book a Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
