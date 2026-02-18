import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { type ProjectConfig } from "@/lib/mock-data";
import { usePhases } from "@/hooks/use-api-data";

interface Props {
  config: ProjectConfig;
  onChange: (c: Partial<ProjectConfig>) => void;
}

const StepResources = ({ config, onChange }: Props) => {
  const { data: phases = [] } = usePhases();

  const updateResource = (phaseId: string, field: "offsite" | "onsite", value: number) => {
    const next = config.resources.map((r) =>
      r.phaseId === phaseId ? { ...r, [field]: value } : r
    );
    onChange({ resources: next });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Resource Mix</h2>
          <p className="text-sm text-muted-foreground">Define off-site and on-site resources per phase</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/60">
              <th className="text-left p-3 font-semibold text-foreground">Phase</th>
              <th className="text-center p-3 font-semibold text-foreground">Off-site</th>
              <th className="text-center p-3 font-semibold text-foreground">On-site</th>
              <th className="text-center p-3 font-semibold text-muted-foreground">Total</th>
            </tr>
          </thead>
          <tbody>
            {phases.map((phase) => {
              const res = config.resources.find((r) => r.phaseId === phase.id) || {
                phaseId: phase.id,
                offsite: 0,
                onsite: 0,
              };
              return (
                <tr key={phase.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-foreground">{phase.name}</td>
                  <td className="p-3">
                    <Input
                      type="number"
                      min={0}
                      className="w-20 mx-auto text-center"
                      value={res.offsite}
                      onChange={(e) => updateResource(phase.id, "offsite", parseInt(e.target.value) || 0)}
                    />
                  </td>
                  <td className="p-3">
                    <Input
                      type="number"
                      min={0}
                      className="w-20 mx-auto text-center"
                      value={res.onsite}
                      onChange={(e) => updateResource(phase.id, "onsite", parseInt(e.target.value) || 0)}
                    />
                  </td>
                  <td className="p-3 text-center font-semibold text-accent">
                    {res.offsite + res.onsite}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StepResources;
