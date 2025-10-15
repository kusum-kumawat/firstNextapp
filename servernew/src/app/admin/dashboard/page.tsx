import AdminSidebar from "@/components/layout/AdminSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";

const mockAdminUser = {
  name: "Admin User",
  email: "admin@ecommerce.com",
  role: "administrator",
};

const handleLogout = () => {
  console.log("handleLogout is called..");
};

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
    </div>
  );
}
