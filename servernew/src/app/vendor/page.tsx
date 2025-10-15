import DashboardLayout from "@/components/layout/DashboardLayout";
import VendorSidebar from "@/components/layout/VendorSidebar";

const mockVendorUser = {
  name: "Tech Gadgets Inc.",
  email: "vendor@techgadgets.com",
  role: "vendor",
};

export default function VendorDashboard() {
  return (
    <DashboardLayout sidebar={<VendorSidebar user={mockVendorUser} />}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Vendor Dashboard
        </h1>
        {/* Vendor dashboard content */}
      </div>
    </DashboardLayout>
  );
}
