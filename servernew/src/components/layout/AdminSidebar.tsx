// components/layout/AdminSidebar.tsx
import Sidebar from "./Sidebar";
import { SidebarItem } from "../../types/layout";

const adminItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: "📊",
  },
  {
    name: "Vendors",
    href: "/admin/vendors",
    icon: "👥",
    badge: 5,
    subItems: [
      { name: "All Vendors", href: "/admin/vendors", icon: "👥" },
      { name: "Pending", href: "/admin/vendors/pending", icon: "⏳", badge: 3 },
      { name: "Approved", href: "/admin/vendors/approved", icon: "✅" },
      { name: "Rejected", href: "/admin/vendors/rejected", icon: "❌" },
    ],
  },
  {
    name: "Catalogs",
    href: "/admin/catalogs",
    icon: "📦",
    subItems: [
      { name: "All Products", href: "/admin/products", icon: "📦" },
      { name: "Categories", href: "/admin/catalogs/categories", icon: "🏷️" },
      { name: "Inventory", href: "/admin/catalogs/inventory", icon: "📊" },
      { name: "Reviews", href: "/admin/catalogs/reviews", icon: "⭐" },
    ],
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: "🛒",
    badge: 12,
    subItems: [
      { name: "All Orders", href: "/admin/orders", icon: "🛒" },
      { name: "Pending", href: "/admin/orders/pending", icon: "⏳", badge: 5 },
      { name: "Processing", href: "/admin/orders/processing", icon: "⚡" },
      { name: "Completed", href: "/admin/orders/completed", icon: "✅" },
    ],
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: "👤",
    subItems: [
      { name: "All Customers", href: "/admin/customers", icon: "👤" },
      { name: "Segments", href: "/admin/customers/segments", icon: "🎯" },
      { name: "Feedback", href: "/admin/customers/feedback", icon: "💬" },
    ],
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: "📈",
    subItems: [
      { name: "Overview", href: "/admin/analytics", icon: "📊" },
      { name: "Sales", href: "/admin/analytics/sales", icon: "💰" },
      { name: "Traffic", href: "/admin/analytics/traffic", icon: "🌐" },
      {
        name: "Vendor Performance",
        href: "/admin/analytics/vendors",
        icon: "📊",
      },
    ],
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: "⚙️",
    subItems: [
      { name: "General", href: "/admin/settings", icon: "⚙️" },
      { name: "Payment", href: "/admin/settings/payment", icon: "💳" },
      { name: "Shipping", href: "/admin/settings/shipping", icon: "🚚" },
      {
        name: "Notifications",
        href: "/admin/settings/notifications",
        icon: "🔔",
      },
    ],
  },
];

interface AdminSidebarProps {
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onLogout?: () => void;
  collapsed?: boolean;
}

export default function AdminSidebar({
  user,
  onLogout,
  collapsed = false,
}: AdminSidebarProps) {
  console.log("Admin Sidebar rendered..");
  return (
    <Sidebar
      items={adminItems}
      title="Admin Panel"
      user={user}
      onLogout={onLogout}
      collapsed={collapsed}
      collapsible={true}
    />
  );
}
