import FormField from "@/components/form/FromField";
import { useFormContext } from "react-hook-form";

export default function BusinessInfoStep() {
  const { register, formState, watch } = useFormContext();

  const errors: any = formState.errors;

  const businessType = watch("businessInfo.businessType");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type *
          </label>
          <select
            {...register("businessInfo.businessType", {
              required: "Business type is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="individual">Individual/Sole Proprietor</option>
            <option value="partnership">Partnership</option>
            <option value="corporation">Corporation</option>
            <option value="llc">LLC</option>
          </select>
          {errors.businessInfo?.businessType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessInfo.businessType.message}
            </p>
          )}
        </div> */}

        <FormField
          name="businessInfo.businessType"
          label="Business Type *"
          as="select"
          options={[
            { label: "Individual/Sole Proprietor", value: "individual" },
            { label: "Partnership", value: "Partnership" },
            { label: "Corporation", value: "Corporation" },
            { label: "LLC", value: "llc" },
          ]}
          rules={{ required: "Business type is required." }}
        />

        <FormField
          name="businessInfo.businessName"
          label=""
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            {...register("businessInfo.businessName", {
              required: "Business name is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your business name"
          />
          {errors.businessInfo?.businessName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessInfo.businessName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax ID/EIN *
          </label>
          <input
            type="text"
            {...register("businessInfo.taxId", {
              required: "Tax ID is required",
              pattern: {
                value: /^[0-9-]+$/,
                message: "Please enter a valid Tax ID",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="XX-XXXXXXX"
          />
          {errors.businessInfo?.taxId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessInfo.taxId.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Registration Number
          </label>
          <input
            type="text"
            {...register("businessInfo.registrationNumber")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="If applicable"
          />
        </div>
      </div>

      {businessType !== "individual" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Website
          </label>
          <input
            type="url"
            {...register("businessInfo.website")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Description *
        </label>
        <textarea
          {...register("businessInfo.description", {
            required: "Business description is required",
            minLength: {
              value: 50,
              message: "Description must be at least 50 characters",
            },
          })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your business, products, and services..."
        />
        {errors.businessInfo?.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.businessInfo.description.message}
          </p>
        )}
      </div>
    </div>
  );
}
