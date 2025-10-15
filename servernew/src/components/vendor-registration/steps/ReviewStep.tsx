"use client";

import { useFormContext } from "react-hook-form";

interface FieldProps {
  label: string;
  value?: string | number | React.ReactNode;
}

const ReviewField = ({ label, value }: FieldProps) => (
  <div>
    <span className="text-gray-600">{label}:</span>
    <p className="font-medium break-words">{value || ""}</p>
  </div>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const ReviewSection = ({ title, children }: SectionProps) => (
  <div className="border border-gray-200 rounded-lg p-6">
    <h3 className="font-medium text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

export default function ReviewStep() {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900">
        Review Your Application
      </h2>
      <p className="text-gray-600">
        Please review all information before submitting.
      </p>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* ✅ Business Info */}
        {/* <ReviewSection title="Business Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ReviewField
              label="Business Name"
              value={formData.businessInfo?.businessName}
            />
            <ReviewField
              label="Business Type"
              value={formData.businessInfo?.businessType}
            />
            <ReviewField label="Tax ID" value={formData.businessInfo?.taxId} />
            <ReviewField
              label="Description"
              value={formData.businessInfo?.description}
            />
          </div>
        </ReviewSection> */}

        {/* ✅ Contact Info */}
        <ReviewSection title="Contact Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ReviewField
              label="Name"
              value={`${formData.contactInfo?.firstName || ""} ${
                formData.contactInfo?.lastName || ""
              }`}
            />
            <ReviewField label="Email" value={formData.contactInfo?.email} />
            <ReviewField label="Phone" value={formData.contactInfo?.phone} />
            <ReviewField
              label="Address"
              value={`${formData.contactInfo?.address || ""}, ${
                formData.contactInfo?.city || ""
              }, ${formData.contactInfo?.state || ""} ${
                formData.contactInfo?.zipCode || ""
              }`}
            />
          </div>
        </ReviewSection>

        {/* ✅ Bank Details */}
        <ReviewSection title="Bank Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ReviewField
              label="Account Holder"
              value={formData.bankDetails?.accountHolderName}
            />
            <ReviewField
              label="Bank Name"
              value={formData.bankDetails?.bankName}
            />
            <ReviewField
              label="Account Number"
              value={
                formData.bankDetails?.accountNumber
                  ? `•••• ${formData.bankDetails.accountNumber.slice(-4)}`
                  : ""
              }
            />
            <ReviewField
              label="Currency"
              value={formData.bankDetails?.currency}
            />
          </div>
        </ReviewSection>

        {/* ✅ Product Categories */}
        <ReviewSection title="Product Categories">
          <div className="text-sm">
            <span className="text-gray-600">Selected Categories:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.categories?.length ? (
                formData.categories.map((cat: string) => (
                  <span
                    key={cat}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
                  >
                    {cat}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No categories selected.</p>
              )}
            </div>
          </div>
        </ReviewSection>

        {/* ✅ Documents */}
        <ReviewSection title="Documents">
          <div className="text-sm space-y-2">
            {formData.documents?.businessLicense && (
              <p className="text-green-600">✓ Business License uploaded</p>
            )}
            {formData.documents?.taxDocument && (
              <p className="text-green-600">✓ Tax Document uploaded</p>
            )}
            {formData.documents?.governmentId && (
              <p className="text-green-600">✓ Government ID uploaded</p>
            )}
            {!formData.documents && (
              <p className="text-gray-500">No documents uploaded.</p>
            )}
          </div>
        </ReviewSection>
      </div>

      {/* ✅ Footer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          By submitting this application, you agree to our Vendor Agreement and
          Terms of Service. Your application will be reviewed within 2–3
          business days.
        </p>
      </div>
    </div>
  );
}
