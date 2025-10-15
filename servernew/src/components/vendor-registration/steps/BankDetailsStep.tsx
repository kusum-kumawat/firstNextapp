// components/vendor-registration/steps/BankDetailsStep.tsx
import FormField from "@/components/form/FromField";
import { useFormContext } from "react-hook-form";

export default function BankDetailsStep() {
  const { register, formState, watch } = useFormContext();

  const currency = watch("bankDetails.currency");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Bank Details</h2>
      <p className="text-gray-600">
        Provide your bank account information for payments
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="bankDetails.accountHolderName"
          label="Account Holder Name *"
          rules={{ required: "Account holder name is required" }}
        />

        <FormField
          name="bankDetails.accountNumber"
          label="Account Number *"
          rules={{
            required: "Account number is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Account number must contain only numbers",
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="bankDetails.bankName"
          label="Bank Name *"
          rules={{ required: "Bank name is required" }}
        />

        <FormField
          name="bankDetails.routingNumber"
          label="Routing Number *"
          rules={{
            required: "Routing number is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Routing number must contain only numbers",
            },
            minLength: {
              value: 9,
              message: "Routing number must be 9 digits",
            },
            maxLength: {
              value: 9,
              message: "Routing number must be 9 digits",
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="bankDetails.accountType"
          label="Account Type *"
          rules={{ required: "Account type is required" }}
          as="select"
          options={[
            { label: "Checking", value: "checking" },
            { label: "Savings", value: "savings" },
          ]}
        />

        <FormField
          name="businessInfo.businessType"
          label="Currency *"
          as="select"
          rules={{ required: "Currency is required" }}
          options={[
            { label: "USD - US Dollar", value: "USD" },
            { label: "EUR - Euro", value: "EUR" },
            { label: "GBP - British Pound", value: "GBP" },
            { label: "CAD - Canadian Dollar", value: "CAD" },
          ]}
        />
      </div>

      {currency === "USD" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            For US bank accounts, please ensure your routing number is correct.
            We support both ACH and wire transfers.
          </p>
        </div>
      )}
    </div>
  );
}
