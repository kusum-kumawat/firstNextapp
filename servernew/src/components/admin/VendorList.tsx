// components/admin/VendorList.tsx
import { useState } from "react";
import { Vendor } from "@/types/admin";

interface VendorListProps {
  vendors: Vendor[];
  onStatusUpdate: (
    vendorId: string,
    status: Vendor["status"],
    reason?: string
  ) => void;
  onBulkAction: (vendorIds: string[], action: "approve" | "reject") => void;
  onVendorSelect: (vendor: Vendor) => void;
}

export default function VendorList({
  vendors,
  onStatusUpdate,
  onBulkAction,
  onVendorSelect,
}: VendorListProps) {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleSelectAll = (checked: boolean) => {
    setSelectedVendors(checked ? vendors.map((v) => v.id) : []);
  };

  const handleSelectVendor = (vendorId: string, checked: boolean) => {
    setSelectedVendors((prev) =>
      checked ? [...prev, vendorId] : prev.filter((id) => id !== vendorId)
    );
  };

  const handleBulkApprove = () => {
    onBulkAction(selectedVendors, "approve");
    setSelectedVendors([]);
  };

  const handleBulkReject = () => {
    if (selectedVendors.length === 1) {
      setShowRejectModal(selectedVendors[0]);
    } else {
      onBulkAction(selectedVendors, "reject");
      setSelectedVendors([]);
    }
  };

  const handleRejectConfirm = () => {
    if (showRejectModal) {
      onStatusUpdate(showRejectModal, "rejected", rejectionReason);
      setShowRejectModal(null);
      setRejectionReason("");
      setSelectedVendors((prev) => prev.filter((id) => id !== showRejectModal));
    }
  };

  const getStatusBadge = (status: Vendor["status"]) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      approved: { color: "bg-green-100 text-green-800", label: "Approved" },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <>
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={
              selectedVendors.length === vendors.length && vendors.length > 0
            }
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">
            {selectedVendors.length} selected
          </span>
        </div>

        {selectedVendors.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleBulkApprove}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              Approve Selected
            </button>
            <button
              onClick={handleBulkReject}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              Reject Selected
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={
                    selectedVendors.length === vendors.length &&
                    vendors.length > 0
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categories
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registration Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedVendors.includes(vendor.id)}
                    onChange={(e) =>
                      handleSelectVendor(vendor.id, e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <button
                      onClick={() => onVendorSelect(vendor)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 text-left"
                    >
                      {vendor.businessName}
                    </button>
                    <p className="text-sm text-gray-500">
                      {vendor.contactName}
                    </p>
                    <p className="text-sm text-gray-500">{vendor.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(vendor.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {vendor.categories.map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(vendor.registrationDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vendor.status === "approved" ? (
                    <div className="text-sm">
                      <div className="flex items-center gap-1">
                        <span>⭐ {vendor.reviewScore}</span>
                        <span>•</span>
                        <span>{vendor.totalProducts} products</span>
                      </div>
                      <div className="text-green-600 font-medium">
                        ${vendor.monthlyRevenue.toLocaleString()}/mo
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    {vendor.status === "pending" && (
                      <>
                        <button
                          onClick={() => onStatusUpdate(vendor.id, "approved")}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setShowRejectModal(vendor.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onVendorSelect(vendor)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Reject Vendor Application
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Rejection
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide a reason for rejection..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(null);
                  setRejectionReason("");
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                disabled={!rejectionReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
