import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Video, Users, Target } from "lucide-react";

const Admin = () => {
  const [counts, setCounts] = useState({
    blog: 0,
    caseStudies: 0,
    videos: 0,
    outcomes: 0,
  });

  useEffect(() => {
    // Load counts from localStorage
    const updateCounts = () => {
      // Initialize defaults if they don't exist
      if (!localStorage.getItem("blogPosts")) {
        const defaults = [
          { id: "1", title: "The Cost of Operational Chaos", slug: "operational-clarity", excerpt: "Every spreadsheet, every Notion page, every scattered email trail, all compound into something far more expensive than you realize.", category: "Operations", date: "2024-03-15", readTime: "8 min read", content: "", published: true },
          { id: "2", title: "Systems Over Solutions", slug: "systems-thinking", excerpt: "Most businesses don't need another tool. They need one system that reflects how they actually work.", category: "Strategy", date: "2024-03-10", readTime: "6 min read", content: "", published: true },
          { id: "3", title: "Redesigning Workflows for Scale", slug: "workflow-redesign", excerpt: "The workflows that got you here won't get you there. Here's how we approach workflow transformation.", category: "Process", date: "2024-03-05", readTime: "10 min read", content: "", published: true },
          { id: "4", title: "Why Bespoke Still Matters", slug: "bespoke-engineering", excerpt: "In a world of templates and low-code tools, custom engineering delivers clarity, control, and competitive advantage.", category: "Engineering", date: "2024-02-28", readTime: "7 min read", content: "", published: true },
          { id: "5", title: "Building Systems for Family Businesses", slug: "family-business-platforms", excerpt: "Family businesses operate differently. Their systems should reflect that nuance and long-term thinking.", category: "Industry", date: "2024-02-20", readTime: "9 min read", content: "", published: true },
          { id: "6", title: "The Art of Dashboard Design", slug: "dashboard-design", excerpt: "A dashboard should answer questions before they're asked. Here's our approach to intelligent information design.", category: "Design", date: "2024-02-15", readTime: "6 min read", content: "", published: true },
        ];
        localStorage.setItem("blogPosts", JSON.stringify(defaults));
      }

      if (!localStorage.getItem("caseStudies")) {
        const defaults = [
          { id: "1", client: "Heritage Jewellery House", industry: "Luxury Jewellery", title: "Unifying a $20M Jewellery Operation", slug: "luxury-jewellery-operations", problem: "Orders tracked in spreadsheets, inventory managed offline, vendor communication via WhatsApp, and zero visibility across the business.", solution: "Complete custom platform integrating order management, inventory tracking, vendor portals, and real-time dashboards.", impact: ["60% faster order processing", "Zero inventory discrepancies", "Complete workflow visibility"], image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
          { id: "2", client: "Precision Manufacturing Co.", industry: "Manufacturing", title: "Transforming Shop Floor to Boardroom", slug: "manufacturing-workflow-system", problem: "Production data scattered across Notion, Excel, and paper. No real-time visibility into capacity, bottlenecks, or delivery timelines.", solution: "End-to-end manufacturing platform with shop floor data capture, automated routing, client portals, and executive dashboards.", impact: ["40% reduction in production delays", "Real-time capacity planning", "Automated client updates"], image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
          { id: "3", client: "Premium D2C Brand", industry: "E-commerce", title: "Building Operational Intelligence for Scale", slug: "d2c-brand-operations", problem: "Rapid growth exposed cracks: customer data in Shopify, operations in Notion, fulfillment via email threads, and reporting through manual exports.", solution: "Unified operations platform connecting e-commerce, fulfillment, customer service, and analytics with intelligent automation.", impact: ["3x order volume with same team", "Sub-24hr fulfillment time", "Single source of truth"], image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
          { id: "4", client: "Multi-Generational Family Office", industry: "Family Business", title: "Institutionalizing Family Business Operations", slug: "family-office-platform", problem: "Five business units, each with their own systems, reporting, and workflows. Leadership had no unified view of performance or operations.", solution: "Cross-entity platform with consolidated reporting, approval workflows, document management, and strategic dashboards.", impact: ["Unified operational view", "Faster decision-making", "Institutional-grade governance"], image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
        ];
        localStorage.setItem("caseStudies", JSON.stringify(defaults));
      }

      if (!localStorage.getItem("videos")) {
        const defaults = [
          { id: "1", title: "Order Management Platform", description: "Complete order-to-delivery workflow with automated routing, approvals, and real-time tracking.", category: "Platform Demo", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
          { id: "2", title: "Custom Dashboard System", description: "Executive dashboard showing real-time metrics, trends, and actionable insights across operations.", category: "Dashboard", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
          { id: "3", title: "Vendor Portal Interface", description: "Secure portal enabling vendors to submit quotes, track orders, and manage documentation.", category: "Portal", thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
          { id: "4", title: "Approval Workflow Engine", description: "Multi-stage approval system with conditional routing, notifications, and audit trails.", category: "Automation", thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
          { id: "5", title: "Inventory Management System", description: "Real-time inventory tracking with automated reordering, location management, and reporting.", category: "Operations", thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
          { id: "6", title: "Client Communication Hub", description: "Unified client portal for project updates, document sharing, and milestone tracking.", category: "Portal", thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
        ];
        localStorage.setItem("videos", JSON.stringify(defaults));
      }

      if (!localStorage.getItem("signatureOutcomes")) {
        const defaults = [
          { id: "1", text: "Operational clarity through unified systems" },
          { id: "2", text: "Faster decision-making with real-time data" },
          { id: "3", text: "Fewer errors via automated workflows" },
          { id: "4", text: "One source of truth for your entire team" },
          { id: "5", text: "Tools that perfectly match your workflow" },
        ];
        localStorage.setItem("signatureOutcomes", JSON.stringify(defaults));
      }

      const blogPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
      const caseStudies = JSON.parse(localStorage.getItem("caseStudies") || "[]");
      const videos = JSON.parse(localStorage.getItem("videos") || "[]");
      const outcomes = JSON.parse(localStorage.getItem("signatureOutcomes") || "[]");

      setCounts({
        blog: blogPosts.length,
        caseStudies: caseStudies.length,
        videos: videos.length,
        outcomes: outcomes.length || 5,
      });
    };

    updateCounts();

    // Listen for storage changes (in case admin opens multiple tabs)
    window.addEventListener('storage', updateCounts);
    
    // Also check periodically for same-tab updates
    const interval = setInterval(updateCounts, 1000);

    return () => {
      window.removeEventListener('storage', updateCounts);
      clearInterval(interval);
    };
  }, []);

  const sections = [
    {
      title: "Blog Posts",
      description: "Manage insights and articles",
      icon: FileText,
      link: "/admin/blog",
      count: counts.blog,
    },
    {
      title: "Case Studies",
      description: "Manage client success stories",
      icon: Briefcase,
      link: "/admin/case-studies",
      count: counts.caseStudies,
    },
    {
      title: "Videos",
      description: "Manage product demos",
      icon: Video,
      link: "/admin/videos",
      count: counts.videos,
    },
    {
      title: "Signature Outcomes",
      description: "Manage homepage outcomes",
      icon: Target,
      link: "/admin/outcomes",
      count: counts.outcomes,
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <h2 className="text-2xl font-light">Admin Panel</h2>
              <p className="text-muted-foreground mt-1">Manage your website content</p>
            </div>
            
            <Link to="/">
              <Button variant="outline">
                Back to Website
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link 
                  key={section.title}
                  to={section.link}
                  className="group"
                >
                  <div className="bg-background border border-border/50 p-8 hover:border-primary transition-all duration-500 hover:scale-105">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-3xl font-light">{section.count}</span>
                    </div>
                    
                    <h3 className="text-xl font-light mb-2 group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-background border border-border/50 p-8">
            <h3 className="text-xl font-light mb-6">Quick Actions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link to="/admin/blog">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  New Blog Post
                </Button>
              </Link>
              
              <Link to="/admin/case-studies">
                <Button variant="outline" className="w-full justify-start">
                  <Briefcase className="w-4 h-4 mr-2" />
                  New Case Study
                </Button>
              </Link>
              
              <Link to="/admin/videos">
                <Button variant="outline" className="w-full justify-start">
                  <Video className="w-4 h-4 mr-2" />
                  New Video
                </Button>
              </Link>
              
              <Link to="/admin/outcomes">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  New Outcome
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
