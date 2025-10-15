// components/layout/VendorSidebar.tsx
import Sidebar from "./SidebarOld";
import { SidebarItem } from "../../types/layout";

const vendorItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/vendor",
    icon: "📊",
  },
  {
    name: "Products",
    href: "/vendor/products",
    icon: "📦",
    badge: 3,
    subItems: [
      { name: "All Products", href: "/vendor/products", icon: "📦" },
      { name: "Add New", href: "/vendor/products/new", icon: "➕" },
      { name: "Categories", href: "/vendor/products/categories", icon: "🏷️" },
      { name: "Inventory", href: "/vendor/products/inventory", icon: "📊" },
    ],
  },
  {
    name: "Orders",
    href: "/vendor/orders",
    icon: "🛒",
    badge: 8,
    subItems: [
      { name: "All Orders", href: "/vendor/orders", icon: "🛒" },
      { name: "Pending", href: "/vendor/orders/pending", icon: "⏳", badge: 3 },
      { name: "To Ship", href: "/vendor/orders/to-ship", icon: "🚚", badge: 2 },
      { name: "Completed", href: "/vendor/orders/completed", icon: "✅" },
    ],
  },
  {
    name: "Customers",
    href: "/vendor/customers",
    icon: "👤",
  },
  {
    name: "Analytics",
    href: "/vendor/analytics",
    icon: "📈",
    subItems: [
      { name: "Sales", href: "/vendor/analytics/sales", icon: "💰" },
      { name: "Products", href: "/vendor/analytics/products", icon: "📊" },
      { name: "Traffic", href: "/vendor/analytics/traffic", icon: "🌐" },
    ],
  },
  {
    name: "Promotions",
    href: "/vendor/promotions",
    icon: "🎯",
    subItems: [
      { name: "Discounts", href: "/vendor/promotions/discounts", icon: "🏷️" },
      { name: "Coupons", href: "/vendor/promotions/coupons", icon: "🎫" },
      { name: "Campaigns", href: "/vendor/promotions/campaigns", icon: "📢" },
    ],
  },
  {
    name: "Store Settings",
    href: "/vendor/settings",
    icon: "⚙️",
    subItems: [
      { name: "Store Profile", href: "/vendor/settings/profile", icon: "🏪" },
      { name: "Shipping", href: "/vendor/settings/shipping", icon: "🚚" },
      { name: "Payment", href: "/vendor/settings/payment", icon: "💳" },
      {
        name: "Notifications",
        href: "/vendor/settings/notifications",
        icon: "🔔",
      },
    ],
  },
  {
    name: "Support",
    href: "/vendor/support",
    icon: "💬",
    subItems: [
      { name: "Help Center", href: "/vendor/support/help", icon: "❓" },
      { name: "Contact Admin", href: "/vendor/support/contact", icon: "📞" },
      { name: "Documentation", href: "/vendor/support/docs", icon: "📚" },
    ],
  },
];

interface VendorSidebarProps {
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onLogout?: () => void;
  collapsed?: boolean;
}

export default function VendorSidebar({
  user,
  onLogout,
  collapsed = false,
}: VendorSidebarProps) {
  return (
    <Sidebar
      items={vendorItems}
      title="Vendor Panel"
      user={user}
      onLogout={onLogout}
      collapsed={collapsed}
      collapsible={true}
    />
  );
}
