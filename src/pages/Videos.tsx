import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Videos = () => {
  const videos = [
    {
      id: "1",
      title: "Order Management Platform",
      description: "Complete order-to-delivery workflow with automated routing, approvals, and real-time tracking.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      category: "Platform Demo",
    },
    {
      id: "2",
      title: "Custom Dashboard System",
      description: "Executive dashboard showing real-time metrics, trends, and actionable insights across operations.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      category: "Dashboard",
    },
    {
      id: "3",
      title: "Vendor Portal Interface",
      description: "Secure portal enabling vendors to submit quotes, track orders, and manage documentation.",
      thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800",
      category: "Portal",
    },
    {
      id: "4",
      title: "Approval Workflow Engine",
      description: "Multi-stage approval system with conditional routing, notifications, and audit trails.",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      category: "Automation",
    },
    {
      id: "5",
      title: "Inventory Management System",
      description: "Real-time inventory tracking with automated reordering, location management, and reporting.",
      thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      category: "Operations",
    },
    {
      id: "6",
      title: "Client Communication Hub",
      description: "Unified client portal for project updates, document sharing, and milestone tracking.",
      thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
      category: "Portal",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="mb-8 md:mb-12">Product Demos</h1>
          </div>
          
          <div className="animate-fade-in-up delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
              See how custom platforms transform operations—from concept to execution.
            </p>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="group animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="border border-border/50 overflow-hidden hover:border-primary transition-all duration-500">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <svg 
                          className="w-6 h-6 text-white ml-1" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-xs text-muted-foreground mb-3">{video.category}</div>
                    <h4 className="mb-3 group-hover:text-primary transition-colors duration-500">
                      {video.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Videos;
