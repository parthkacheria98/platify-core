import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
}

const CaseStudiesAdmin = () => {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    client: "",
    industry: "",
    title: "",
    slug: "",
    problem: "",
    solution: "",
    impact: "",
    image: "",
    videoUrl: "",
    published: true,
  });

  useEffect(() => {
    // Fetch case studies from API
    const fetchCases = async () => {
      try {
        const response = await fetch('/api/case-studies');
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
        console.error('Error fetching case studies:', error);
        setCases([]);
      }
    };

    fetchCases();
  }, []);

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.client || !formData.industry) {
      toast.error("Please fill in all required fields");
      return;
    }

    const impactArray = formData.impact
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    try {
      if (editingId) {
        // Update existing case study
        const updatedCase = {
          ...formData,
          impact: impactArray,
          published: publish ? true : formData.published,
        };
        
        const response = await fetch(`/api/case-studies/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCase),
        });

        if (!response.ok) {
          throw new Error('Failed to update case study');
        }

        const result = await response.json();
        if (result.success) {
          // Update local state
          const updated = cases.map((c) =>
            c.id === editingId ? result.data : c
          );
          setCases(updated);
          toast.success("Case study updated successfully");
        }
      } else {
        // Create new case study
        const newCase: CaseStudy = {
          id: Date.now().toString(),
          ...formData,
          impact: impactArray,
          published: publish,
        };
        
        const response = await fetch('/api/case-studies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCase),
        });

        if (!response.ok) {
          throw new Error('Failed to create case study');
        }

        const result = await response.json();
        if (result.success) {
          // Update local state
          setCases([...cases, result.data]);
          toast.success(publish ? "Case study published successfully" : "Case study saved as draft");
        }
      }
    } catch (error) {
      console.error('Error saving case study:', error);
      toast.error("Failed to save case study. Please try again.");
      return;
    }

    resetForm();
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setFormData({
      client: caseStudy.client,
      industry: caseStudy.industry,
      title: caseStudy.title,
      slug: caseStudy.slug,
      problem: caseStudy.problem,
      solution: caseStudy.solution,
      impact: caseStudy.impact.join('\n'),
      image: caseStudy.image,
      videoUrl: caseStudy.videoUrl,
      published: caseStudy.published,
    });
    setEditingId(caseStudy.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) {
      return;
    }

    try {
      const response = await fetch(`/api/case-studies/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete case study');
      }

      const result = await response.json();
      if (result.success) {
        // Update local state
        const updated = cases.filter((c) => c.id !== id);
        setCases(updated);
        toast.success("Case study deleted successfully");
      }
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast.error("Failed to delete case study. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      client: "",
      industry: "",
      title: "",
      slug: "",
      problem: "",
      solution: "",
      impact: "",
      image: "",
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
                <h2 className="text-2xl font-light">Case Studies</h2>
                <p className="text-muted-foreground text-sm mt-1">{cases.length} case studies</p>
              </div>
            </div>
            
            <Button onClick={() => { resetForm(); setShowForm(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              New Case Study
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
                {editingId ? "Edit Case Study" : "Create New Case Study"}
              </h3>
              
              <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Client Name *</label>
                    <Input 
                      placeholder="Company name" 
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Industry *</label>
                    <Input 
                      placeholder="Manufacturing, Jewellery, etc." 
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Title *</label>
                  <Input 
                    placeholder="Case study title" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Slug *</label>
                  <Input 
                    placeholder="case-study-slug" 
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Featured Image URL</label>
                  <Input 
                    placeholder="https://..." 
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Video URL</label>
                  <Input 
                    placeholder="https://youtube.com/embed/..." 
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">The Problem * (supports markdown)</label>
                  <Textarea 
                    placeholder="Describe the client's challenges...&#10;&#10;You can use **bold**, *italic*, lists, and more markdown formatting."
                    rows={6}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">The Solution * (supports markdown)</label>
                  <Textarea 
                    placeholder="Describe how you solved it...&#10;&#10;You can use **bold**, *italic*, lists, and more markdown formatting."
                    rows={6}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Impact (one per line, supports markdown) *</label>
                  <Textarea 
                    placeholder="60% faster processing&#10;Zero discrepancies&#10;Complete visibility&#10;&#10;Each line will be rendered as a separate impact item. You can use markdown formatting like **bold** or *italic*."
                    rows={6}
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                    required
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

          {/* Cases List */}
          <div className="bg-background border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="font-light">All Case Studies</h3>
            </div>
            
            <div className="divide-y divide-border">
              {cases.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No case studies yet. Create your first case study!
                </div>
              ) : (
                cases.map((caseStudy) => (
                  <div key={caseStudy.id} className="p-6 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-light">{caseStudy.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            caseStudy.published 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {caseStudy.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span>{caseStudy.client}</span>
                          <span>•</span>
                          <span>{caseStudy.industry}</span>
                        </div>
                        
                        <div className="text-xs text-primary">
                          /case-studies/{caseStudy.slug}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-6">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(caseStudy)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(caseStudy.id)}>
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

export default CaseStudiesAdmin;
