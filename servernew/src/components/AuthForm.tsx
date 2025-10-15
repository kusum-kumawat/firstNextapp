"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

interface FieldConfig {
  name: string;
  type: string;
  placeholder: string;
  validation?: object;
}

interface AuthFormProps {
  title: string;
  fields: FieldConfig[];
  buttonText: string;
  onSubmit: SubmitHandler<FieldValues>;
}

export default function AuthForm({
  title,
  fields,
  buttonText,
  onSubmit,
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {title}
        </h2>

        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register(field.name, field.validation)}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {field.placeholder} is required
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
