import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use relative path in development (Vite proxy) or env variable in production
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast({
        title: "Message sent",
        description: data.message || "We'll be in touch within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="mb-8 md:mb-12">Let's Talk</h1>
          </div>
          
          <div className="animate-fade-in-up delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
              Schedule a private consultation to discuss your workflow and explore how we can build the system your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Form */}
            <div className="animate-fade-in-up">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-3">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 border-border/50 focus:border-foreground transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-3">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 border-border/50 focus:border-foreground transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-3">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="h-12 border-border/50 focus:border-foreground transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-3">
                    Tell us about your project
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="border-border/50 focus:border-foreground transition-colors duration-300"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="premium" 
                  size="lg" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="animate-fade-in-up delay-200">
              <div className="space-y-12">
                <div>
                  <h3 className="mb-6">Direct Contact</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Email</p>
                      <a
                        href="mailto:build@platify.cloud"
                        className="text-lg hover:text-muted-foreground transition-colors duration-300"
                      >
                        build@platify.cloud
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">WhatsApp</p>
                      <a
                        href="https://wa.me/919769472784"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg hover:text-muted-foreground transition-colors duration-300"
                      >
                        +91 9769472784
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-12">
                  <h4 className="mb-4">What to Expect</h4>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-3">—</span>
                      <span>Response within 24 hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3">—</span>
                      <span>Private consultation call</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3">—</span>
                      <span>Custom project scope</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3">—</span>
                      <span>Transparent fixed pricing</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-border/50 pt-12">
                  <h4 className="mb-4">Office Hours</h4>
                  <p className="text-muted-foreground">
                    Monday – Friday
                    <br />
                    9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
