import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="mb-8 md:mb-12">About Platify</h1>
          </div>
          
          <div className="animate-fade-in-up delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
              We are a boutique software studio that designs and engineers complete business platforms for serious operators.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="mb-8">Our Philosophy</h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Most businesses don't need more tools. They need fewer, better systems that actually reflect how they work.
                </p>
                <p>
                  We believe that clarity, precision, and craftsmanship matter. That software should be invisible when it works and obvious when it doesn't.
                </p>
                <p>
                  We build platforms that give serious operators what they deserve: operational clarity, faster decisions, and tools that match their workflow.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-8">How We Think</h2>
              <div className="space-y-8">
                <div className="border-l-2 border-foreground/20 pl-6">
                  <h4 className="mb-3">Clarity First</h4>
                  <p className="text-muted-foreground">
                    Before writing a single line of code, we map your workflow. We study how information moves, where decisions happen, and where friction exists.
                  </p>
                </div>

                <div className="border-l-2 border-foreground/20 pl-6">
                  <h4 className="mb-3">Precision Engineering</h4>
                  <p className="text-muted-foreground">
                    Every system is engineered specifically for your operations. No templates, no generic solutions, no compromises.
                  </p>
                </div>

                <div className="border-l-2 border-foreground/20 pl-6">
                  <h4 className="mb-3">Ongoing Partnership</h4>
                  <p className="text-muted-foreground">
                    Your business evolves, and your platform should too. We build systems designed to grow and adapt with you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 md:py-32 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-12 md:mb-16">Why Clients Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="mb-4">No Patchwork Solutions</h4>
              <p className="text-muted-foreground">
                We don't stitch together off-the-shelf tools. We engineer unified platforms that replace your scattered systems.
              </p>
            </div>

            <div>
              <h4 className="mb-4">Fixed-Cost Clarity</h4>
              <p className="text-muted-foreground">
                One transparent price for a complete platform. No hourly billing, no scope creep, no surprises.
              </p>
            </div>

            <div>
              <h4 className="mb-4">White-Glove Execution</h4>
              <p className="text-muted-foreground">
                Dedicated support from discovery to deployment and beyond. You work with experts who understand your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pt-24 md:pt-32 pb-0 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 md:mb-24">What Guides Us</h2>
          
          <div className="space-y-12 md:space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-border/50 pb-12">
              <div className="md:col-span-1">
                <p className="text-3xl font-light">01</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="mb-4">Intent Over Impulse</h3>
                <p className="text-muted-foreground text-lg">
                Every decision is deliberate, so the system holds up as complexity grows.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-border/50 pb-12">
              <div className="md:col-span-1">
                <p className="text-3xl font-light">02</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="mb-4">Clarity Over Complexity</h3>
                <p className="text-muted-foreground text-lg">
                  Simple is hard. We engineer platforms that feel obvious to use and elegant to operate.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-border/50 pb-12">
              <div className="md:col-span-1">
                <p className="text-3xl font-light">03</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="mb-4">Partnership Over Transactions</h3>
                <p className="text-muted-foreground text-lg">
                  We're not here to deliver and disappear. We build long-term relationships with clients who value excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-12 md:pt-16 pb-24 md:pb-32 px-6 lg:px-12 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8 md:mb-12">Work With Us</h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-light">
            If you value clarity, precision, and craftsmanship, let's discuss your project.
          </p>

          <Link to="/contact">
            <Button variant="hero" size="xl">
              Let's Talk
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
