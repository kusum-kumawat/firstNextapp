// components/vendor-registration/steps/ContactInfoStep.tsx
import FormField from "@/components/form/FromField";

export default function ContactInfoStep() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="contactInfo.firstName"
          label="First Name *"
          rules={{ required: "First name is required." }}
        />
        <FormField
          name="contactInfo.lastName"
          label="Last Name *"
          rules={{ required: "Last name is required." }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="contactInfo.email"
          label="Email Address *"
          type="email"
          rules={{
            required: { value: true, message: "Email is required." },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />
        <FormField
          name="contactInfo.phone"
          label="Phone Number *"
          type="tel"
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[+]?[1-9][\d]{0,15}$/,
              message: "Invalid phone number",
            },
          }}
        />
      </div>

      <div>
        <FormField
          name="contactInfo.address"
          label="Address *"
          placeholder="Street address"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField name="contactInfo.city" label="" placeholder="City" />
          <FormField
            name="contactInfo.state"
            label=""
            placeholder="State"
            rules={{ required: "State is required." }}
          />
          <FormField
            name="contactInfo.zipcode"
            label=""
            placeholder="Zip code"
            rules={{
              required: "ZIP code is requiired.",
              pattern: {
                value: /^[0-9-]+$/,
                message: "Invalid ZIP code",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
