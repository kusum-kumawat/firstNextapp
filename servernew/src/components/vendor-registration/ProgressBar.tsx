// components/vendor-registration/ProgressBar.tsx
interface Step {
  id: number;
  title: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="flex mb-4">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`flex flex-col items-center ${
            index < steps.length - 1 ? "flex-1" : ""
          }`}
        >
          <div className="flex items-center w-full">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.id <= currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step.id}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step.id < currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
          <span
            className={`text-xs mt-2 ${
              step.id <= currentStep
                ? "text-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
}
