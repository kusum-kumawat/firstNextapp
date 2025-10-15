import Sidebar from "@/components/Sidebar";
import React from "react";

// *-------------- import icons -----------------

import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuStore } from "react-icons/lu";

const adminNavTabs = [
  {
    id: 1,
    name: "Dashboard",
    icon: MdOutlineSpaceDashboard,
    href: "/vendor",
  },
  {
    id: 2,
    name: "Catalogs",
    icon: LuStore,
    href: "/admin/catalogs",
    submenu: [
      { name: "Add catagory", link: "/admin/add-category" },
      { name: "All Categories", link: "/admin/categories" },
    ],
  },
  { id: 3, name: "Vendors", icon: FaUsers, href: "/admin/vendors" },
  { id: 4, name: "Customers", icon: FaUser, href: "/admin/customers" },
  { id: 5, name: "SubAdmin", icon: FaUser, href: "/admin/subAdmin" },
];

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar navItems={adminNavTabs} />
      <main className="ml-64 flex-1  min-h-screen p-6">{children}</main>
    </>
  );
}
