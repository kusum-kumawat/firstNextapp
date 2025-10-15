"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import { useState } from "react";
import { SidebarItem } from "@/types/layout";
import Sidebar from "@/components/layout/Sidebar";

const mockAdminUser = {
  name: "Admin User",
  email: "admin@ecommerce.com",
  role: "administrator",
};

const adminItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: "📊",
  },
  {
    name: "Vendors",
    href: "/admin/dashboard/vendors",
    icon: "👥",
    badge: 5,
    subItems: [
      { name: "All Vendors", href: "/admin/dashboard/vendors", icon: "👥" },
      {
        name: "Pending",
        href: "/admin/dashboard/vendors/pending",
        icon: "⏳",
        badge: 3,
      },
      {
        name: "Approved",
        href: "/admin/dashboard/vendors/approved",
        icon: "✅",
      },
      {
        name: "Rejected",
        href: "/admin/dashboard/vendors/rejected",
        icon: "❌",
      },
    ],
  },
  {
    name: "Catalogs",
    href: "/admin/dashboard/catalogs",
    icon: "📦",
    subItems: [
      { name: "All Products", href: "/admin/dashboard/catalogs/products", icon: "📦" },
      {
        name: "Categories",
        href: "/admin/dashboard/catalogs/categories",
        icon: "🏷️",
      },
      {
        name: "Inventory",
        href: "/admin/dashboard/catalogs/inventory",
        icon: "📊",
      },
      {
        name: "Reviews",
        href: "/admin/dashboard/catalogs/reviews",
        icon: "⭐",
      },
    ],
  },
  {
    name: "Orders",
    href: "/admin/dashboard/orders",
    icon: "🛒",
    badge: 12,
    subItems: [
      { name: "All Orders", href: "/admin/dashboard/orders", icon: "🛒" },
      { name: "Pending", href: "/admin/orders/pending", icon: "⏳", badge: 5 },
      { name: "Processing", href: "/admin/orders/processing", icon: "⚡" },
      { name: "Completed", href: "/admin/orders/completed", icon: "✅" },
    ],
  },
  {
    name: "Customers",
    href: "/admin/dashboard/customers",
    icon: "👤",
    subItems: [
      { name: "All Customers", href: "/admin/dashboard/customers", icon: "👤" },
      {
        name: "Segments",
        href: "/admin/dashboard/customers/segments",
        icon: "🎯",
      },
      {
        name: "Feedback",
        href: "/admin/dashboard/customers/feedback",
        icon: "💬",
      },
    ],
  },
  {
    name: "Analytics",
    href: "/admin/dashboard/analytics",
    icon: "📈",
    subItems: [
      { name: "Overview", href: "/admin/dashboard/analytics", icon: "📊" },
      { name: "Sales", href: "/admin/dashboard/analytics/sales", icon: "💰" },
      {
        name: "Traffic",
        href: "/admin/dashboard/analytics/traffic",
        icon: "🌐",
      },
      {
        name: "Vendor Performance",
        href: "/admin/dashboard/analytics/vendors",
        icon: "📊",
      },
    ],
  },
  {
    name: "Settings",
    href: "/admin/dashboard/settings",
    icon: "⚙️",
    subItems: [
      { name: "General", href: "/admin/dashboard/settings", icon: "⚙️" },
      {
        name: "Payment",
        href: "/admin/dashboard/settings/payment",
        icon: "💳",
      },
      {
        name: "Shipping",
        href: "/admin/dashboard/settings/shipping",
        icon: "🚚",
      },
      {
        name: "Notifications",
        href: "/admin/dashboard/settings/notifications",
        icon: "🔔",
      },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    console.log("Admin logging out...");
  };
  return (
    <div className="flex h-screen bg-gray-50">
      {/* <AdminSidebar
        user={mockAdminUser}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
      /> */}

      <Sidebar
        items={adminItems}
        title="Admin Panel"
        user={mockAdminUser}
        // onLogout={onLogout}
        // collapsed={collapsed}
        collapsible={true}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
