import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  published: boolean;
}

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    readTime: "",
    content: "",
    published: true,
  });

  useEffect(() => {
    // Load posts from localStorage
    const saved = localStorage.getItem("blogPosts");
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      // Default posts
      const defaults: BlogPost[] = [
        {
          id: "1",
          title: "The Cost of Operational Chaos",
          slug: "operational-clarity",
          excerpt: "Every spreadsheet, every Notion page, every scattered email trail—they all compound into something far more expensive than you realize.",
          category: "Operations",
          date: "2024-03-15",
          readTime: "8 min read",
          content: "",
          published: true,
        },
        {
          id: "2",
          title: "Systems Over Solutions",
          slug: "systems-thinking",
          excerpt: "Most businesses don't need another tool. They need one system that reflects how they actually work.",
          category: "Strategy",
          date: "2024-03-10",
          readTime: "6 min read",
          content: "",
          published: true,
        },
        {
          id: "3",
          title: "Redesigning Workflows for Scale",
          slug: "workflow-redesign",
          excerpt: "The workflows that got you here won't get you there. Here's how we approach workflow transformation.",
          category: "Process",
          date: "2024-03-05",
          readTime: "10 min read",
          content: "",
          published: true,
        },
        {
          id: "4",
          title: "Why Bespoke Still Matters",
          slug: "bespoke-engineering",
          excerpt: "In a world of templates and low-code tools, custom engineering delivers clarity, control, and competitive advantage.",
          category: "Engineering",
          date: "2024-02-28",
          readTime: "7 min read",
          content: "",
          published: true,
        },
        {
          id: "5",
          title: "Building Systems for Family Businesses",
          slug: "family-business-platforms",
          excerpt: "Family businesses operate differently. Their systems should reflect that nuance and long-term thinking.",
          category: "Industry",
          date: "2024-02-20",
          readTime: "9 min read",
          content: "",
          published: true,
        },
        {
          id: "6",
          title: "The Art of Dashboard Design",
          slug: "dashboard-design",
          excerpt: "A dashboard should answer questions before they're asked. Here's our approach to intelligent information design.",
          category: "Design",
          date: "2024-02-15",
          readTime: "6 min read",
          content: "",
          published: true,
        },
      ];
      setPosts(defaults);
      localStorage.setItem("blogPosts", JSON.stringify(defaults));
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem("blogPosts", JSON.stringify(newPosts));
  };

  const handleSubmit = (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.excerpt) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingId) {
      const updated = posts.map((p) =>
        p.id === editingId 
          ? { ...p, ...formData, published: publish ? true : p.published }
          : p
      );
      savePosts(updated);
      toast.success("Post updated successfully");
    } else {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...formData,
        published: publish,
      };
      savePosts([...posts, newPost]);
      toast.success(publish ? "Post published successfully" : "Post saved as draft");
    }

    resetForm();
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      content: post.content,
      published: post.published,
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const updated = posts.filter((p) => p.id !== id);
      savePosts(updated);
      toast.success("Post deleted successfully");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      readTime: "",
      content: "",
      published: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-10">
        <div className="px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-light">Blog Posts (Insights)</h2>
                <p className="text-muted-foreground text-sm mt-1">{posts.length} posts</p>
              </div>
            </div>
            
            <Button onClick={() => { resetForm(); setShowForm(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Create Form */}
          {showForm && (
            <div className="bg-background border border-border p-8 mb-8 animate-fade-in">
              <h3 className="text-xl font-light mb-6">
                {editingId ? "Edit Post" : "Create New Post"}
              </h3>
              
              <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Title *</label>
                  <Input 
                    placeholder="Enter post title" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Slug *</label>
                  <Input 
                    placeholder="post-slug" 
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Category *</label>
                    <Input 
                      placeholder="Operations, Strategy, etc." 
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Date *</label>
                    <Input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Read Time</label>
                    <Input 
                      placeholder="8 min read" 
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Excerpt *</label>
                  <Textarea 
                    placeholder="Brief description of the post..."
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Content</label>
                  <Textarea 
                    placeholder="Full post content (supports markdown)..."
                    rows={12}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit">Save & Publish</Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={(e) => handleSubmit(e, false)}
                  >
                    Save as Draft
                  </Button>
                  <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>
                </div>
              </form>
            </div>
          )}

          {/* Posts List */}
          <div className="bg-background border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="font-light">All Posts</h3>
            </div>
            
            <div className="divide-y divide-border">
              {posts.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No posts yet. Create your first post!
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="p-6 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-light">{post.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            post.published 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                          {post.readTime && (
                            <>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </>
                          )}
                          <span>•</span>
                          <span className="text-primary">/{post.slug}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-6">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogAdmin;
