import { useFormContext } from "react-hook-form";

interface FormFieldPropsType {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  as?: "input" | "select" | "textarea";
  options?: { label: string; value: string }[];
  validation?: Record<string, any>;
}

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  as = "input",
  options = [],
  validation,
}: FormFieldPropsType) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const sharedProps = {
    ...register(name, validation),
    className:
      "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
    placeholder,
  };

  const fieldError = name
    .split(".")
    .reduce((acc, key) => (acc ? acc[key] : undefined), errors as any);

  return (
    <div className="p-2">
      <label htmlFor="" className="">{label}</label>
      {as === "select" ? (
        <select {...sharedProps}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea {...sharedProps} rows={4} />
      ) : (
        <input type={type} {...sharedProps} />
      )}

      {fieldError && (
        <p className="text-red-500 text-sm mt-1">{fieldError.message}</p>
      )}
    </div>
  );
}
