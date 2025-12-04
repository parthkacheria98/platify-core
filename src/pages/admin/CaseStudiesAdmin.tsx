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
    // Load cases from localStorage
    const saved = localStorage.getItem("caseStudies");
    if (saved) {
      setCases(JSON.parse(saved));
    } else {
      // Default cases
      const defaults: CaseStudy[] = [
        {
          id: "1",
          client: "Heritage Jewellery House",
          industry: "Luxury Jewellery",
          title: "Unifying a $20M Jewellery Operation",
          slug: "luxury-jewellery-operations",
          problem: "Orders tracked in spreadsheets, inventory managed offline, vendor communication via WhatsApp, and zero visibility across the business.",
          solution: "Complete custom platform integrating order management, inventory tracking, vendor portals, and real-time dashboards.",
          impact: ["60% faster order processing", "Zero inventory discrepancies", "Complete workflow visibility"],
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
        {
          id: "2",
          client: "Precision Manufacturing Co.",
          industry: "Manufacturing",
          title: "Transforming Shop Floor to Boardroom",
          slug: "manufacturing-workflow-system",
          problem: "Production data scattered across Notion, Excel, and paper. No real-time visibility into capacity, bottlenecks, or delivery timelines.",
          solution: "End-to-end manufacturing platform with shop floor data capture, automated routing, client portals, and executive dashboards.",
          impact: ["40% reduction in production delays", "Real-time capacity planning", "Automated client updates"],
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
        {
          id: "3",
          client: "Premium D2C Brand",
          industry: "E-commerce",
          title: "Building Operational Intelligence for Scale",
          slug: "d2c-brand-operations",
          problem: "Rapid growth exposed cracks: customer data in Shopify, operations in Notion, fulfillment via email threads, and reporting through manual exports.",
          solution: "Unified operations platform connecting e-commerce, fulfillment, customer service, and analytics with intelligent automation.",
          impact: ["3x order volume with same team", "Sub-24hr fulfillment time", "Single source of truth"],
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
        {
          id: "4",
          client: "Multi-Generational Family Office",
          industry: "Family Business",
          title: "Institutionalizing Family Business Operations",
          slug: "family-office-platform",
          problem: "Five business units, each with their own systems, reporting, and workflows. Leadership had no unified view of performance or operations.",
          solution: "Cross-entity platform with consolidated reporting, approval workflows, document management, and strategic dashboards.",
          impact: ["Unified operational view", "Faster decision-making", "Institutional-grade governance"],
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          published: true,
        },
      ];
      setCases(defaults);
      localStorage.setItem("caseStudies", JSON.stringify(defaults));
    }
  }, []);

  const saveCases = (newCases: CaseStudy[]) => {
    setCases(newCases);
    localStorage.setItem("caseStudies", JSON.stringify(newCases));
  };

  const handleSubmit = (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.client || !formData.industry) {
      toast.error("Please fill in all required fields");
      return;
    }

    const impactArray = formData.impact
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (editingId) {
      const updated = cases.map((c) =>
        c.id === editingId 
          ? { 
              ...c, 
              ...formData, 
              impact: impactArray,
              published: publish ? true : c.published 
            }
          : c
      );
      saveCases(updated);
      toast.success("Case study updated successfully");
    } else {
      const newCase: CaseStudy = {
        id: Date.now().toString(),
        ...formData,
        impact: impactArray,
        published: publish,
      };
      saveCases([...cases, newCase]);
      toast.success(publish ? "Case study published successfully" : "Case study saved as draft");
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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this case study?")) {
      const updated = cases.filter((c) => c.id !== id);
      saveCases(updated);
      toast.success("Case study deleted successfully");
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
                  <label className="text-sm text-muted-foreground mb-2 block">The Problem *</label>
                  <Textarea 
                    placeholder="Describe the client's challenges..."
                    rows={4}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">The Solution *</label>
                  <Textarea 
                    placeholder="Describe how you solved it..."
                    rows={4}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Impact (one per line) *</label>
                  <Textarea 
                    placeholder="60% faster processing&#10;Zero discrepancies&#10;Complete visibility"
                    rows={4}
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
