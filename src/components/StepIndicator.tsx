import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 mb-10">
      {steps.map((label, i) => {
        const isComplete = i < currentStep;
        const isActive = i === currentStep;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  isComplete && "bg-step-complete text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground shadow-lg",
                  !isComplete && !isActive && "bg-secondary text-muted-foreground"
                )}
              >
                {isComplete ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors whitespace-nowrap",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-12 h-0.5 mx-2 mt-[-18px] transition-colors duration-300",
                  i < currentStep ? "bg-step-complete" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
