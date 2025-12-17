import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CaseStudyMarkdown } from "@/components/CaseStudyMarkdown";

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
  content?: string; // Optional full markdown content
}

const CaseStudies = () => {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch case studies from API with timeout and caching
    const fetchCases = async () => {
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
        
        const response = await fetch('/api/case-studies?published=true', {
          signal: controller.signal,
          headers: {
            'Cache-Control': 'max-age=300' // Cache for 5 minutes
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error('Failed to fetch case studies');
        }
        const result = await response.json();
        if (result.success && result.data) {
          setCases(result.data);
        } else {
          setCases([]);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching case studies:', error);
        }
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
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
          {loading ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg">Loading case studies...</p>
            </div>
          ) : cases.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg">No case studies published yet.</p>
            </div>
          ) : (
            cases.map((study, index) => (
              <article
                key={`${study.id}-${index}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index * 0.08, 0.5)}s` }}
              >
                {/* If content field exists, render full markdown */}
                {study.content ? (
                  <div className="grid md:grid-cols-12 gap-12">
                    {/* Sidebar */}
                    <div className="md:col-span-4">
                      <div className="space-y-6 sticky top-24">
                        <div>
                          <div className="text-base text-muted-foreground mb-2">Client</div>
                          <div className="font-light text-lg">{study.client}</div>
                        </div>
                        
                        <div>
                          <div className="text-base text-muted-foreground mb-2">Industry</div>
                          <div className="font-light text-lg">{study.industry}</div>
                        </div>
                      </div>
                    </div>

                    {/* Main Content - Full Markdown */}
                    <div className="md:col-span-8">
                      <h2 className="mb-8">{study.title}</h2>
                      <CaseStudyMarkdown content={study.content} />
                      
                      <div className="mt-12 pt-8 border-t border-border">
                        <Link 
                          to="/contact"
                          className="inline-flex items-center text-primary hover:text-primary-hover transition-colors duration-300"
                        >
                          <span>Discuss your project</span>
                          <span className="ml-2">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Legacy structure - Problem/Solution/Impact */
                  <>
                    {/* Video */}
                    {study.videoUrl && (
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
                    )}

                    {/* Content */}
                    <div className="grid md:grid-cols-12 gap-12">
                      {/* Sidebar */}
                      <div className="md:col-span-4">
                        <div className="space-y-6">
                          <div>
                              <div className="text-base text-muted-foreground mb-2">Client</div>
                            <div className="font-light text-lg">{study.client}</div>
                          </div>
                          
                          <div>
                            <div className="text-base text-muted-foreground mb-2">Industry</div>
                            <div className="font-light text-lg">{study.industry}</div>
                          </div>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="md:col-span-8 space-y-12">
                        <h2>{study.title}</h2>

                        <div>
                          <h4 className="mb-4">The Problem</h4>
                          <CaseStudyMarkdown content={study.problem} />
                        </div>

                        <div>
                          <h4 className="mb-4">The Solution</h4>
                          <CaseStudyMarkdown content={study.solution} />
                        </div>

                        <div>
                          <h4 className="mb-6">Impact</h4>
                          <ul className="space-y-4">
                            {study.impact.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-primary mr-4 text-xl flex-shrink-0">—</span>
                                <div className="flex-1">
                                  <CaseStudyMarkdown content={item} />
                                </div>
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
                  </>
                )}
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
