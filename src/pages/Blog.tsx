import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Blog = () => {
  const posts = [
    {
      slug: "operational-clarity",
      title: "The Cost of Operational Chaos",
      excerpt: "Every spreadsheet, every Notion page, every scattered email trail—they all compound into something far more expensive than you realize.",
      date: "2024-03-15",
      readTime: "8 min read",
      category: "Operations",
    },
    {
      slug: "systems-thinking",
      title: "Systems Over Solutions",
      excerpt: "Most businesses don't need another tool. They need one system that reflects how they actually work.",
      date: "2024-03-10",
      readTime: "6 min read",
      category: "Strategy",
    },
    {
      slug: "workflow-redesign",
      title: "Redesigning Workflows for Scale",
      excerpt: "The workflows that got you here won't get you there. Here's how we approach workflow transformation.",
      date: "2024-03-05",
      readTime: "10 min read",
      category: "Process",
    },
    {
      slug: "bespoke-engineering",
      title: "Why Bespoke Still Matters",
      excerpt: "In a world of templates and low-code tools, custom engineering delivers clarity, control, and competitive advantage.",
      date: "2024-02-28",
      readTime: "7 min read",
      category: "Engineering",
    },
    {
      slug: "family-business-platforms",
      title: "Building Systems for Family Businesses",
      excerpt: "Family businesses operate differently. Their systems should reflect that nuance and long-term thinking.",
      date: "2024-02-20",
      readTime: "9 min read",
      category: "Industry",
    },
    {
      slug: "dashboard-design",
      title: "The Art of Dashboard Design",
      excerpt: "A dashboard should answer questions before they're asked. Here's our approach to intelligent information design.",
      date: "2024-02-15",
      readTime: "6 min read",
      category: "Design",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="mb-8 md:mb-12">Insights</h1>
          </div>
          
          <div className="animate-fade-in-up delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
              Perspectives on systems, operations, and building platforms that transform how businesses work.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <article className="border border-border/50 p-8 h-full flex flex-col hover:border-primary transition-all duration-500">
                  <div className="text-sm text-muted-foreground mb-4">{post.category}</div>
                  
                  <h3 className="mb-4 group-hover:text-primary transition-colors duration-500">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                    <span>{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
