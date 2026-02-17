import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, Calendar, Layers, Users, DollarSign } from "lucide-react";
import { countries, modules, phases, type ProjectConfig } from "@/lib/mock-data";
import CostBreakdownTable from "@/components/CostBreakdownTable";

interface Props {
  config: ProjectConfig;
}

const StepReview = ({ config }: Props) => {
  const country = countries.find((c) => c.id === config.country);
  const selectedModules = modules.filter((m) => config.modules.includes(m.id));
  const totalOffsite = config.resources.reduce((s, r) => s + r.offsite, 0);
  const totalOnsite = config.resources.reduce((s, r) => s + r.onsite, 0);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Review & Generate</h2>
          <p className="text-sm text-muted-foreground">Confirm your project plan configuration</p>
        </div>
      </div>

      {/* Basics */}
      <div className="surface-card p-4 space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" /> Project Basics
        </h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Name</span>
            <p className="font-medium">{config.projectName || "—"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Location</span>
            <p className="font-medium">{country?.name || "—"}, {config.region || "—"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Start</span>
            <p className="font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              {config.startDate ? format(config.startDate, "PP") : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Scope */}
      <div className="surface-card p-4 space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-3.5 h-3.5" /> Scope
        </h3>
        <div className="text-sm space-y-1">
          <p><span className="text-muted-foreground">Segment:</span> <span className="font-medium">{config.segment || "—"}</span></p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {selectedModules.map((m) => (
              <Badge key={m.id} variant="secondary" className="text-xs">{m.name}</Badge>
            ))}
            {selectedModules.length === 0 && <span className="text-muted-foreground text-xs">No modules selected</span>}
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="surface-card p-4 space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Users className="w-3.5 h-3.5" /> Resources
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
          {phases.map((phase) => {
            const res = config.resources.find((r) => r.phaseId === phase.id);
            return (
              <div key={phase.id} className="text-center p-2 rounded-md bg-muted/50">
                <p className="font-semibold text-foreground">{phase.name}</p>
                <p className="text-muted-foreground">{res?.offsite || 0}↗ / {res?.onsite || 0}↘</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cost Breakdown Table */}
      <div className="surface-card p-4 space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5" /> Cost Breakdown (WBS)
        </h3>
        <CostBreakdownTable config={config} />
      </div>
    </div>
  );
};

export default StepReview;
