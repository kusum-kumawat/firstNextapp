// components/admin/VendorDetailModal.tsx
import { Vendor } from "@/types/admin";
import { useState } from "react";

interface VendorDetailModalProps {
  vendor: Vendor;
  onClose: () => void;
  onStatusUpdate: (
    vendorId: string,
    status: Vendor["status"],
    reason?: string
  ) => void;
}

export default function VendorDetailModal({
  vendor,
  onClose,
  onStatusUpdate,
}: VendorDetailModalProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "documents" | "performance"
  >("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "documents", label: "Documents" },
    { id: "performance", label: "Performance" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {vendor.businessName}
            </h2>
            <p className="text-gray-600">
              {vendor.contactName} • {vendor.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "overview" && <OverviewTab vendor={vendor} />}
          {activeTab === "documents" && <DocumentsTab vendor={vendor} />}
          {activeTab === "performance" && <PerformanceTab vendor={vendor} />}
        </div>

        {/* Footer Actions */}
        {vendor.status === "pending" && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={() => onStatusUpdate(vendor.id, "approved")}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Approve Vendor
            </button>
            <button
              onClick={() =>
                onStatusUpdate(
                  vendor.id,
                  "rejected",
                  "Manual rejection from admin panel"
                )
              }
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reject Vendor
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Tab Components
function OverviewTab({ vendor }: { vendor: Vendor }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Business Information
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-500">
              Business Type
            </label>
            <p className="text-gray-900 capitalize">{vendor.businessType}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Registration Date
            </label>
            <p className="text-gray-900">
              {new Date(vendor.registrationDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Categories
            </label>
            <div className="flex flex-wrap gap-1 mt-1">
              {vendor.categories.map((category) => (
                <span
                  key={category}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs capitalize"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Contact Information
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-500">
              Contact Person
            </label>
            <p className="text-gray-900">{vendor.contactName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-gray-900">{vendor.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Phone</label>
            <p className="text-gray-900">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsTab({ vendor }: { vendor: Vendor }) {
  const documents = [
    {
      name: "Business License.pdf",
      type: "Business License",
      status: "verified",
      uploaded: "2024-01-15",
    },
    {
      name: "Tax_ID_Document.pdf",
      type: "Tax Document",
      status: "verified",
      uploaded: "2024-01-15",
    },
    {
      name: "Government_ID.jpg",
      type: "Government ID",
      status: "pending",
      uploaded: "2024-01-15",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Uploaded Documents</h3>
      <div className="space-y-3">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-lg">📄</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-500">
                  {doc.type} • Uploaded {doc.uploaded}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  doc.status === "verified"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {doc.status === "verified" ? "Verified" : "Pending Review"}
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PerformanceTab({ vendor }: { vendor: Vendor }) {
  if (vendor.status !== "approved") {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          Performance data available only for approved vendors
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-2xl font-bold text-gray-900">{vendor.reviewScore}</p>
        <p className="text-gray-600">Average Rating</p>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-2xl font-bold text-gray-900">
          {vendor.totalProducts}
        </p>
        <p className="text-gray-600">Total Products</p>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-2xl font-bold text-gray-900">
          ${vendor.monthlyRevenue.toLocaleString()}
        </p>
        <p className="text-gray-600">Monthly Revenue</p>
      </div>
    </div>
  );
}
