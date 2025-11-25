import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";

const VideosAdmin = () => {
  const [videos, setVideos] = useState([
    {
      id: "1",
      title: "Order Management Platform",
      category: "Platform Demo",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      published: true,
    },
    {
      id: "2",
      title: "Custom Dashboard System",
      category: "Dashboard",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
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
                <h2 className="text-2xl font-light">Product Videos</h2>
                <p className="text-muted-foreground text-sm mt-1">{videos.length} videos</p>
              </div>
            </div>
            
            <Button onClick={() => setShowForm(!showForm)}>
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
              <h3 className="text-xl font-light mb-6">Add New Video</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Title</label>
                  <Input placeholder="Video title" />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                  <Input placeholder="Platform Demo, Dashboard, Portal, etc." />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Description</label>
                  <Textarea 
                    placeholder="Brief description of the video content..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Video URL</label>
                  <Input placeholder="https://youtube.com/... or direct video URL" />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Thumbnail Image URL</label>
                  <Input placeholder="https://..." />
                </div>

                <div className="flex gap-4">
                  <Button>Save & Publish</Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </div>
            </div>
          )}

          {/* Videos Grid */}
          <div className="bg-background border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="font-light">All Videos</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {videos.map((video) => (
                <div key={video.id} className="border border-border/50 overflow-hidden hover:border-primary transition-colors">
                  <div className="aspect-video bg-muted">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
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
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-3 h-3" />
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

export default VideosAdmin;
