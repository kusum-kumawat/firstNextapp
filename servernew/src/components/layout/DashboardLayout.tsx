"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function DashboardLayout({
  sidebar,
  children,
  className = "",
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {sidebar}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className={`flex-1 overflow-auto ${className}`}>{children}</main>
      </div>
    </div>
  );
}
