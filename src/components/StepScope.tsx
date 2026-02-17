import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Layers, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { segments, modules, type ProjectConfig } from "@/lib/mock-data";

interface Props {
  config: ProjectConfig;
  onChange: (c: Partial<ProjectConfig>) => void;
}

const StepScope = ({ config, onChange }: Props) => {
  const filteredModules = config.segment
    ? modules.filter((m) => m.segment === config.segment)
    : modules;

  const toggleModule = (id: string) => {
    const next = config.modules.includes(id)
      ? config.modules.filter((m) => m !== id)
      : [...config.modules, id];
    onChange({ modules: next });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Layers className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Select Scope</h2>
          <p className="text-sm text-muted-foreground">Choose segment and modules to include</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Segment</Label>
        <Select value={config.segment} onValueChange={(v) => onChange({ segment: v, modules: [] })}>
          <SelectTrigger>
            <SelectValue placeholder="Select segment" />
          </SelectTrigger>
          <SelectContent>
            {segments.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Modules</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredModules.map((m) => {
            const checked = config.modules.includes(m.id);
            return (
              <label
                key={m.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                  checked
                    ? "border-accent bg-accent/5 shadow-sm"
                    : "border-border hover:border-accent/40 hover:bg-muted/50"
                )}
              >
                <Checkbox checked={checked} onCheckedChange={() => toggleModule(m.id)} />
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{m.name}</span>
                </div>
              </label>
            );
          })}
        </div>
        {filteredModules.length === 0 && (
          <p className="text-sm text-muted-foreground italic">Select a segment first to see available modules.</p>
        )}
      </div>
    </div>
  );
};

export default StepScope;
