import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react";
import { toast } from "sonner";
import StepIndicator from "@/components/StepIndicator";
import StepBasics from "@/components/StepBasics";
import StepScope from "@/components/StepScope";
import StepResources from "@/components/StepResources";
import StepCommercial from "@/components/StepCommercial";
import StepReview from "@/components/StepReview";
import {
  defaultCommercial,
  defaultResources,
  type ProjectConfig,
} from "@/lib/mock-data";

const STEPS = ["Basics", "Scope", "Resources", "Commercial", "Review"];

const PlanWizard = () => {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<ProjectConfig>({
    projectName: "",
    country: "",
    region: "",
    startDate: undefined,
    segment: "",
    modules: [],
    resources: [...defaultResources],
    commercial: { ...defaultCommercial },
  });

  const update = (partial: Partial<ProjectConfig>) =>
    setConfig((prev) => ({ ...prev, ...partial }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const generate = () => {
    toast.success("Project plan generated successfully!", {
      description: `${config.projectName} plan is ready for export.`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Plan Generator</h1>
            <p className="text-xs text-muted-foreground">Configure & generate project plans</p>
          </div>
          <div className="text-xs text-muted-foreground font-mono bg-muted px-2.5 py-1 rounded-md">
            Step {step + 1}/{STEPS.length}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <StepIndicator steps={STEPS} currentStep={step} />

          <div className="surface-elevated p-6 sm:p-8">
            {step === 0 && <StepBasics config={config} onChange={update} />}
            {step === 1 && <StepScope config={config} onChange={update} />}
            {step === 2 && <StepResources config={config} onChange={update} />}
            {step === 3 && <StepCommercial config={config} onChange={update} />}
            {step === 4 && <StepReview config={config} />}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button variant="ghost" onClick={prev} disabled={step === 0} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={next} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={generate} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                <Rocket className="w-4 h-4" /> Generate Plan
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlanWizard;
