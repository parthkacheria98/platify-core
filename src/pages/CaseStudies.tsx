import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  slug: string;
  problem: string;
  solution: string;
  impact: string[];
  image: string;
  videoUrl: string;
  published: boolean;
}

const CaseStudies = () => {
  const [cases, setCases] = useState<CaseStudy[]>([]);

  useEffect(() => {
    // Load cases from localStorage
    const saved = localStorage.getItem("caseStudies");
    if (saved) {
      const allCases = JSON.parse(saved);
      // Only show published cases
      setCases(allCases.filter((c: CaseStudy) => c.published));
    } else {
      // Default cases if nothing in localStorage
      const defaults: CaseStudy[] = [
        {
          id: "1",
          client: "Heritage Jewellery House",
          industry: "Luxury Jewellery",
          title: "Unifying a $20M Jewellery Operation",
          slug: "luxury-jewellery-operations",
          problem: "Orders tracked in spreadsheets, inventory managed offline, vendor communication via WhatsApp, and zero visibility across the business.",
          solution: "Complete custom platform integrating order management, inventory tracking, vendor portals, and real-time dashboards.",
          impact: ["60% faster order processing", "Zero inventory discrepancies", "Complete workflow visibility"],
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
        {
          id: "2",
          client: "Precision Manufacturing Co.",
          industry: "Manufacturing",
          title: "Transforming Shop Floor to Boardroom",
          slug: "manufacturing-workflow-system",
          problem: "Production data scattered across Notion, Excel, and paper. No real-time visibility into capacity, bottlenecks, or delivery timelines.",
          solution: "End-to-end manufacturing platform with shop floor data capture, automated routing, client portals, and executive dashboards.",
          impact: ["40% reduction in production delays", "Real-time capacity planning", "Automated client updates"],
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
        {
          id: "3",
          client: "Premium D2C Brand",
          industry: "E-commerce",
          title: "Building Operational Intelligence for Scale",
          slug: "d2c-brand-operations",
          problem: "Rapid growth exposed cracks: customer data in Shopify, operations in Notion, fulfillment via email threads, and reporting through manual exports.",
          solution: "Unified operations platform connecting e-commerce, fulfillment, customer service, and analytics with intelligent automation.",
          impact: ["3x order volume with same team", "Sub-24hr fulfillment time", "Single source of truth"],
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
        {
          id: "4",
          client: "Multi-Generational Family Office",
          industry: "Family Business",
          title: "Institutionalizing Family Business Operations",
          slug: "family-office-platform",
          problem: "Five business units, each with their own systems, reporting, and workflows. Leadership had no unified view of performance or operations.",
          solution: "Cross-entity platform with consolidated reporting, approval workflows, document management, and strategic dashboards.",
          impact: ["Unified operational view", "Faster decision-making", "Institutional-grade governance"],
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
      ];
      setCases(defaults);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="mb-8 md:mb-12">Case Studies</h1>
          </div>
          
          <div className="animate-fade-in-up delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
              Real transformations. Real results. See how we've helped businesses replace chaos with clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-32">
          {cases.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg">No case studies published yet.</p>
            </div>
          ) : (
            cases.map((study, index) => (
              <article
                key={study.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Video */}
                <div className="mb-12 overflow-hidden border-2 border-border rounded-lg">
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={study.videoUrl}
                      title={study.title}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-12 gap-12">
                  {/* Sidebar */}
                  <div className="md:col-span-4">
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Client</div>
                        <div className="font-light">{study.client}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Industry</div>
                        <div className="font-light">{study.industry}</div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="md:col-span-8 space-y-12">
                    <h2>{study.title}</h2>

                    <div>
                      <h4 className="mb-4">The Problem</h4>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {study.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-4">The Solution</h4>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {study.solution}
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-6">Impact</h4>
                      <ul className="space-y-4">
                        {study.impact.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-4 text-xl">—</span>
                            <span className="text-muted-foreground text-lg">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link 
                      to="/contact"
                      className="inline-flex items-center text-primary hover:text-primary-hover transition-colors duration-300"
                    >
                      <span>Discuss your project</span>
                      <span className="ml-2">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
