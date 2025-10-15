// app/vendor/layout.tsx
"use client";

import VendorSidebar from "@/components/layout/VendorSidebar";
import { useState } from "react";

const mockVendorUser = {
  name: "Tech Gadgets Inc.",
  email: "vendor@techgadgets.com",
  role: "vendor",
};

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    console.log("Vendor logging out...");
    // Add your logout logic here
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
      {/* Page content */}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <VendorSidebar
        user={mockVendorUser}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
