"use client";

import VendorDetailModal from "@/components/admin/VendorDetailModal";
import VendorFilters from "@/components/admin/VendorFilters";
import VendorList from "@/components/admin/VendorList";
import VendorStats from "@/components/admin/VendorStats";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Vendor, VendorStats as Stats } from "@/types/admin";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

const mockVendors: Vendor[] = [
  {
    id: "1",
    businessName: "Tech Gadgets Inc.",
    contactName: "John Smith",
    email: "john@techgadgets.com",
    status: "approved",
    registrationDate: "2024-01-15",
    businessType: "corporation",
    categories: ["electronics", "home"],
    reviewScore: 4.8,
    totalProducts: 45,
    monthlyRevenue: 12500,
  },
  {
    id: "2",
    businessName: "Fashion Trends LLC",
    contactName: "Sarah Johnson",
    email: "sarah@fashiontrends.com",
    status: "pending",
    registrationDate: "2024-01-18",
    businessType: "llc",
    categories: ["fashion"],
    reviewScore: null,
    totalProducts: 0,
    monthlyRevenue: 0,
  },
  {
    id: "3",
    businessName: "Home & Garden Co.",
    contactName: "Mike Wilson",
    email: "mike@homegarden.com",
    status: "rejected",
    registrationDate: "2024-01-10",
    businessType: "corporation",
    categories: ["home"],
    reviewScore: null,
    totalProducts: 0,
    monthlyRevenue: 0,
    rejectionReason: "Incomplete documentation",
  },
  {
    id: "4",
    businessName: "Sports Equipment Pro",
    contactName: "Alex Thompson",
    email: "alex@sportspro.com",
    status: "approved",
    registrationDate: "2024-01-05",
    businessType: "partnership",
    categories: ["sports"],
    reviewScore: 4.6,
    totalProducts: 78,
    monthlyRevenue: 18900,
  },
];

export default function VendorManagementPage() {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(mockVendors);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    dateRange: "all",
  });

  const stats: Stats = {
    total: vendors.length,
    pending: vendors.filter((v) => v.status === "pending").length,
    approved: vendors.filter((v) => v.status === "approved").length,
    rejected: vendors.filter((v) => v.status === "rejected").length,
    totalRevenue: vendors
      .filter((v) => v.status === "approved")
      .reduce((sum, vendor) => sum + vendor.monthlyRevenue, 0),
  };

  useEffect(() => {
    let filtered = vendors;

    if (filters.status !== "all") {
      filtered = filtered.filter((vendor) => vendor.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (vendor) =>
          vendor.businessName.toLowerCase().includes(searchLower) ||
          vendor.contactName.toLowerCase().includes(searchLower) ||
          vendor.email.toLowerCase().includes(searchLower)
      );
    }

    setFilteredVendors(filtered);
  }, [filters, vendors]);

  const handleStatusUpdate = (
    vendorId: string,
    status: Vendor["status"],
    reason?: string
  ) => {
    setVendors((prev) =>
      prev.map((vendor) =>
        vendor.id === vendorId
          ? { ...vendor, status, rejectionReason: reason }
          : vendor
      )
    );
  };

  const handleBulkAction = (
    vendorIds: string[],
    action: "approve" | "reject"
  ) => {
    setVendors((prev) =>
      prev.map((vendor) =>
        vendorIds.includes(vendor.id)
          ? {
              ...vendor,
              status: action === "approve" ? "approved" : "rejected",
            }
          : vendor
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Vendor Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage vendor applications and performance
          </p>
        </div>

        <VendorStats stats={stats} />

        <div className="mt-8 bg-white rounded-lg shadow">
          <VendorFilters
            filters={filters}
            onFiltersChange={setFilters}
            selectedCount={filteredVendors.length}
          />

          <VendorList
            vendors={filteredVendors}
            onStatusUpdate={handleStatusUpdate}
            onBulkAction={handleBulkAction}
            onVendorSelect={setSelectedVendor}
          />
        </div>
      </div>

      {selectedVendor && (
        <VendorDetailModal
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}
