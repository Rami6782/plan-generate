import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import { type ProjectConfig, type CommercialParams } from "@/lib/mock-data";

interface Props {
  config: ProjectConfig;
  onChange: (c: Partial<ProjectConfig>) => void;
}

const fields: { key: keyof CommercialParams; label: string; prefix?: string; suffix?: string }[] = [
  { key: "offsiteCostRate", label: "Off-site Cost Rate", prefix: "$", suffix: "/day" },
  { key: "onsiteCostRate", label: "On-site Cost Rate", prefix: "$", suffix: "/day" },
  { key: "flightCost", label: "Flight / Transport", prefix: "$" },
  { key: "perDiem", label: "Per Diem", prefix: "$", suffix: "/day" },
  { key: "hotelCost", label: "Hotel", prefix: "$", suffix: "/night" },
  { key: "manDayCost", label: "Man-Day Cost", prefix: "$" },
  { key: "coefficient", label: "Coefficient", suffix: "×" },
];

const StepCommercial = ({ config, onChange }: Props) => {
  const updateField = (key: keyof CommercialParams, value: number) => {
    onChange({ commercial: { ...config.commercial, [key]: value } });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Commercial Parameters</h2>
          <p className="text-sm text-muted-foreground">Pre-filled from defaults — adjust as needed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {f.label}
            </Label>
            <div className="relative">
              {f.prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {f.prefix}
                </span>
              )}
              <Input
                type="number"
                step={f.key === "coefficient" ? 0.05 : 10}
                min={0}
                className={f.prefix ? "pl-7" : ""}
                value={config.commercial[f.key]}
                onChange={(e) => updateField(f.key, parseFloat(e.target.value) || 0)}
              />
              {f.suffix && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {f.suffix}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepCommercial;
