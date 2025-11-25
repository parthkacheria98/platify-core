import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";

const CaseStudiesAdmin = () => {
  const [cases, setCases] = useState([
    {
      id: "1",
      client: "Heritage Jewellery House",
      industry: "Luxury Jewellery",
      title: "Unifying a $20M Jewellery Operation",
      slug: "luxury-jewellery-operations",
      published: true,
    },
    {
      id: "2",
      client: "Precision Manufacturing Co.",
      industry: "Manufacturing",
      title: "Transforming Shop Floor to Boardroom",
      slug: "manufacturing-workflow-system",
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
                <h2 className="text-2xl font-light">Case Studies</h2>
                <p className="text-muted-foreground text-sm mt-1">{cases.length} case studies</p>
              </div>
            </div>
            
            <Button onClick={() => setShowForm(!showForm)}>
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
              <h3 className="text-xl font-light mb-6">Create New Case Study</h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Client Name</label>
                    <Input placeholder="Company name" />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Industry</label>
                    <Input placeholder="Manufacturing, Jewellery, etc." />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Title</label>
                  <Input placeholder="Case study title" />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Slug</label>
                  <Input placeholder="case-study-slug" />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Featured Image URL</label>
                  <Input placeholder="https://..." />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">The Problem</label>
                  <Textarea 
                    placeholder="Describe the client's challenges..."
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">The Solution</label>
                  <Textarea 
                    placeholder="Describe how you solved it..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Impact (one per line)</label>
                  <Textarea 
                    placeholder="60% faster processing&#10;Zero discrepancies&#10;Complete visibility"
                    rows={4}
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

          {/* Cases List */}
          <div className="bg-background border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="font-light">All Case Studies</h3>
            </div>
            
            <div className="divide-y divide-border">
              {cases.map((caseStudy) => (
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

export default CaseStudiesAdmin;
