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
    // Fetch posts from API
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const result = await response.json();
        if (result.success && result.data) {
          setPosts(result.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.excerpt) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingId) {
        // Update existing post
        const updatedPost = {
          ...formData,
          published: publish ? true : formData.published,
        };
        
        const response = await fetch(`/api/blog/posts/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPost),
        });

        if (!response.ok) {
          throw new Error('Failed to update post');
        }

        const result = await response.json();
        if (result.success) {
          // Update local state
          const updated = posts.map((p) =>
            p.id === editingId ? result.data : p
          );
          setPosts(updated);
          toast.success("Post updated successfully");
        }
      } else {
        // Create new post
        const newPost: BlogPost = {
          id: Date.now().toString(),
          ...formData,
          published: publish,
        };
        
        const response = await fetch('/api/blog/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost),
        });

        if (!response.ok) {
          throw new Error('Failed to create post');
        }

        const result = await response.json();
        if (result.success) {
          // Update local state
          setPosts([...posts, result.data]);
          toast.success(publish ? "Post published successfully" : "Post saved as draft");
        }
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error("Failed to save post. Please try again.");
      return;
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      const result = await response.json();
      if (result.success) {
        // Update local state
        const updated = posts.filter((p) => p.id !== id);
        setPosts(updated);
        toast.success("Post deleted successfully");
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("Failed to delete post. Please try again.");
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
                  <label className="text-sm text-muted-foreground mb-2 block">Content (supports markdown)</label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Supports full markdown including images, videos (YouTube, Loom, Vimeo), headings, lists, and blockquotes. Videos on their own line will auto-embed.
                  </p>
                  <Textarea 
                    placeholder="## Introduction&#10;&#10;Write your blog post content here...&#10;&#10;![Image](https://example.com/image.png)&#10;&#10;https://www.loom.com/share/VIDEO_ID"
                    rows={16}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="font-mono text-sm"
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
