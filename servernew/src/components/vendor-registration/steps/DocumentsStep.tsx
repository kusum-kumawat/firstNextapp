// components/vendor-registration/steps/DocumentsStep.tsx
import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function DocumentsStep() {
  const { register, setValue, watch } = useFormContext();
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );

  const handleFileUpload = async (fieldName: string, file: File) => {
    // Simulate file upload progress
    setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = (prev[fieldName] || 0) + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [fieldName]: 100 };
        }
        return { ...prev, [fieldName]: newProgress };
      });
    }, 100);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearInterval(interval);

    // Store file reference (in real app, you'd store the uploaded file URL)
    setValue(`documents.${fieldName}`, file.name, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Required Documents</h2>
      <p className="text-gray-600">
        Upload the required documents for verification
      </p>

      <div className="space-y-6">
        {/* <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-4">Business Documents</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business License *
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  handleFileUpload("businessLicense", e.target.files[0])
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {uploadProgress.businessLicense !== undefined && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.businessLicense}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {uploadProgress.businessLicense}% uploaded
                  </p>
                </div>
              )}
              {watch("documents.businessLicense") && (
                <p className="text-green-600 text-sm mt-1">
                  ✓ {watch("documents.businessLicense")}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Identification Document *
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  handleFileUpload("taxDocument", e.target.files[0])
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {uploadProgress.taxDocument !== undefined && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.taxDocument}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {uploadProgress.taxDocument}% uploaded
                  </p>
                </div>
              )}
              {watch("documents.taxDocument") && (
                <p className="text-green-600 text-sm mt-1">
                  ✓ {watch("documents.taxDocument")}
                </p>
              )}
            </div>
          </div>
        </div> */}

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-4">
            Identity Verification
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Government Issued ID *
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  handleFileUpload("governmentId", e.target.files[0])
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Passport, Driver's License, or National ID card
              </p>
              {uploadProgress.governmentId !== undefined && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.governmentId}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {uploadProgress.governmentId}% uploaded
                  </p>
                </div>
              )}
              {watch("documents.governmentId") && (
                <p className="text-green-600 text-sm mt-1">
                  ✓ {watch("documents.governmentId")}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> All documents must be clear and legible. File
            size should not exceed 5MB per document. Supported formats: PDF,
            JPG, PNG.
          </p>
        </div>
      </div>
    </div>
  );
}
