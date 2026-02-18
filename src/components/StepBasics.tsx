import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Briefcase, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { type ProjectConfig } from "@/lib/mock-data";
import { useCountries } from "@/hooks/use-api-data";

interface Props {
  config: ProjectConfig;
  onChange: (c: Partial<ProjectConfig>) => void;
}

const StepBasics = ({ config, onChange }: Props) => {
  const { data: countries = [], isLoading } = useCountries();

  const regions = [...new Set(countries.map((c) => c.region).filter(Boolean))];
  const filteredCountries = config.region
    ? countries.filter((c) => c.region === config.region)
    : countries;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Project Basics</h2>
          <p className="text-sm text-muted-foreground">Define core project information</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            placeholder="e.g., Alpha Bank Retail Transformation"
            value={config.projectName}
            onChange={(e) => onChange({ projectName: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Region</Label>
            <Select value={config.region} onValueChange={(v) => onChange({ region: v, country: "" })}>
              <SelectTrigger>
                <SelectValue placeholder={isLoading ? "Loading…" : "Select region"} />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Country</Label>
            <Select value={config.country} onValueChange={(v) => onChange({ country: v })}>
              <SelectTrigger>
                <SelectValue placeholder={isLoading ? "Loading…" : "Select country"} />
              </SelectTrigger>
              <SelectContent>
                {filteredCountries.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      {c.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !config.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {config.startDate ? format(config.startDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={config.startDate}
                onSelect={(d) => onChange({ startDate: d })}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default StepBasics;
