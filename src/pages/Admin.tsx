import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Video, Users, Settings } from "lucide-react";

const Admin = () => {
  const sections = [
    {
      title: "Blog Posts",
      description: "Manage insights and articles",
      icon: FileText,
      link: "/admin/blog",
      count: 6,
    },
    {
      title: "Case Studies",
      description: "Manage client success stories",
      icon: Briefcase,
      link: "/admin/case-studies",
      count: 4,
    },
    {
      title: "Videos",
      description: "Manage product demos",
      icon: Video,
      link: "/admin/videos",
      count: 6,
    },
    {
      title: "Testimonials",
      description: "Manage client testimonials",
      icon: Users,
      link: "/admin/testimonials",
      count: 0,
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
