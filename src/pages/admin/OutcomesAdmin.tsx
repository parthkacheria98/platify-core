import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Outcome {
  id: string;
  text: string;
}

const OutcomesAdmin = () => {
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formText, setFormText] = useState("");

  useEffect(() => {
    // Load outcomes from localStorage
    const saved = localStorage.getItem("signatureOutcomes");
    if (saved) {
      setOutcomes(JSON.parse(saved));
    } else {
      // Default outcomes
      const defaults = [
        { id: "1", text: "Operational clarity through unified systems" },
        { id: "2", text: "Faster decision-making with real-time data" },
        { id: "3", text: "Fewer errors via automated workflows" },
        { id: "4", text: "One source of truth for your entire team" },
        { id: "5", text: "Tools that perfectly match your workflow" },
      ];
      setOutcomes(defaults);
      localStorage.setItem("signatureOutcomes", JSON.stringify(defaults));
    }
  }, []);

  const saveOutcomes = (newOutcomes: Outcome[]) => {
    setOutcomes(newOutcomes);
    localStorage.setItem("signatureOutcomes", JSON.stringify(newOutcomes));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formText.trim()) {
      toast.error("Please enter outcome text");
      return;
    }

    if (editingId) {
      const updated = outcomes.map((o) =>
        o.id === editingId ? { ...o, text: formText } : o
      );
      saveOutcomes(updated);
      toast.success("Outcome updated successfully");
    } else {
      const newOutcome = {
        id: Date.now().toString(),
        text: formText,
      };
      saveOutcomes([...outcomes, newOutcome]);
      toast.success("Outcome added successfully");
    }

    setFormText("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (outcome: Outcome) => {
    setFormText(outcome.text);
    setEditingId(outcome.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this outcome?")) {
      const updated = outcomes.filter((o) => o.id !== id);
      saveOutcomes(updated);
      toast.success("Outcome deleted successfully");
    }
  };

  const handleCancel = () => {
    setFormText("");
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-light">Signature Outcomes</h2>
                <p className="text-muted-foreground mt-1">
                  {outcomes.length} outcome{outcomes.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              {showForm ? "Cancel" : "Add Outcome"}
            </Button>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          {showForm && (
            <div className="bg-background border border-border p-8 mb-8">
              <h3 className="text-xl font-light mb-6">
                {editingId ? "Edit Outcome" : "New Outcome"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Outcome Text
                  </label>
                  <Input
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    placeholder="e.g., Operational clarity through unified systems"
                    className="w-full"
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit">
                    {editingId ? "Update" : "Create"} Outcome
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {outcomes.map((outcome, index) => (
              <div
                key={outcome.id}
                className="bg-background border border-border p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-lg">{outcome.text}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(outcome)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(outcome.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {outcomes.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No outcomes yet. Click "Add Outcome" to create one.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OutcomesAdmin;
