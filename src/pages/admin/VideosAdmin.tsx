import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  published: boolean;
}

const VideosAdmin = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    videoUrl: "",
    published: true,
  });

  useEffect(() => {
    // Load videos from localStorage
    const saved = localStorage.getItem("videos");
    if (saved) {
      setVideos(JSON.parse(saved));
    } else {
      // Default videos
      const defaults: Video[] = [
        {
          id: "1",
          title: "Order Management Platform",
          description: "Complete order-to-delivery workflow with automated routing, approvals, and real-time tracking.",
          category: "Platform Demo",
          thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
        {
          id: "2",
          title: "Custom Dashboard System",
          description: "Executive dashboard showing real-time metrics, trends, and actionable insights across operations.",
          category: "Dashboard",
          thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
        {
          id: "3",
          title: "Vendor Portal Interface",
          description: "Secure portal enabling vendors to submit quotes, track orders, and manage documentation.",
          category: "Portal",
          thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
        {
          id: "4",
          title: "Approval Workflow Engine",
          description: "Multi-stage approval system with conditional routing, notifications, and audit trails.",
          category: "Automation",
          thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
        {
          id: "5",
          title: "Inventory Management System",
          description: "Real-time inventory tracking with automated reordering, location management, and reporting.",
          category: "Operations",
          thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
        {
          id: "6",
          title: "Client Communication Hub",
          description: "Unified client portal for project updates, document sharing, and milestone tracking.",
          category: "Portal",
          thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
      ];
      setVideos(defaults);
      localStorage.setItem("videos", JSON.stringify(defaults));
    }
  }, []);

  const saveVideos = (newVideos: Video[]) => {
    setVideos(newVideos);
    localStorage.setItem("videos", JSON.stringify(newVideos));
  };

  const handleSubmit = (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingId) {
      const updated = videos.map((v) =>
        v.id === editingId 
          ? { ...v, ...formData, published: publish ? true : v.published }
          : v
      );
      saveVideos(updated);
      toast.success("Video updated successfully");
    } else {
      const newVideo: Video = {
        id: Date.now().toString(),
        ...formData,
        published: publish,
      };
      saveVideos([...videos, newVideo]);
      toast.success(publish ? "Video published successfully" : "Video saved as draft");
    }

    resetForm();
  };

  const handleEdit = (video: Video) => {
    setFormData({
      title: video.title,
      description: video.description,
      category: video.category,
      thumbnail: video.thumbnail,
      videoUrl: video.videoUrl,
      published: video.published,
    });
    setEditingId(video.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      const updated = videos.filter((v) => v.id !== id);
      saveVideos(updated);
      toast.success("Video deleted successfully");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      thumbnail: "",
      videoUrl: "",
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
                <h2 className="text-2xl font-light">Product Videos</h2>
                <p className="text-muted-foreground text-sm mt-1">{videos.length} videos</p>
              </div>
            </div>
            
            <Button onClick={() => { resetForm(); setShowForm(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              New Video
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
                {editingId ? "Edit Video" : "Add New Video"}
              </h3>
              
              <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Title *</label>
                  <Input 
                    placeholder="Video title" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Category *</label>
                  <Input 
                    placeholder="Platform Demo, Dashboard, Portal, etc." 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Description</label>
                  <Textarea 
                    placeholder="Brief description of the video content..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Video URL</label>
                  <Input 
                    placeholder="https://youtube.com/embed/... or direct video URL" 
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Thumbnail Image URL</label>
                  <Input 
                    placeholder="https://..." 
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
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

          {/* Videos Grid */}
          <div className="bg-background border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="font-light">All Videos</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {videos.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground py-12">
                  No videos yet. Add your first video!
                </div>
              ) : (
                videos.map((video) => (
                  <div key={video.id} className="border border-border/50 overflow-hidden hover:border-primary transition-colors">
                    <div className="aspect-video bg-muted">
                      {video.thumbnail ? (
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No thumbnail
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          video.published 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {video.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      
                      <h4 className="text-sm font-light mb-1">{video.title}</h4>
                      <p className="text-xs text-muted-foreground mb-4">{video.category}</p>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(video)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(video.id)}>
                          <Trash2 className="w-3 h-3" />
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

export default VideosAdmin;
