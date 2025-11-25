import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";

const BlogAdmin = () => {
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "The Cost of Operational Chaos",
      slug: "operational-clarity",
      excerpt: "Every spreadsheet, every Notion page, every scattered email trail...",
      category: "Operations",
      date: "2024-03-15",
      published: true,
    },
    {
      id: "2",
      title: "Systems Over Solutions",
      slug: "systems-thinking",
      excerpt: "Most businesses don't need another tool. They need one system...",
      category: "Strategy",
      date: "2024-03-10",
      published: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

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
                <h2 className="text-2xl font-light">Blog Posts</h2>
                <p className="text-muted-foreground text-sm mt-1">{posts.length} posts</p>
              </div>
            </div>
            
            <Button onClick={() => setShowForm(!showForm)}>
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
              <h3 className="text-xl font-light mb-6">Create New Post</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Title</label>
                  <Input placeholder="Enter post title" />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Slug</label>
                  <Input placeholder="post-slug" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                    <Input placeholder="Operations, Strategy, etc." />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Date</label>
                    <Input type="date" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Excerpt</label>
                  <Textarea 
                    placeholder="Brief description of the post..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Content</label>
                  <Textarea 
                    placeholder="Full post content (supports markdown)..."
                    rows={12}
                  />
                </div>

                <div className="flex gap-4">
                  <Button>Save & Publish</Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </div>
            </div>
          )}

          {/* Posts List */}
          <div className="bg-background border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="font-light">All Posts</h3>
            </div>
            
            <div className="divide-y divide-border">
              {posts.map((post) => (
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
                        <span>•</span>
                        <span className="text-primary">/{post.slug}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-6">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogAdmin;
