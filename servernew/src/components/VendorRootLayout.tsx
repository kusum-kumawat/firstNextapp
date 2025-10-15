import Sidebar from "@/components/Sidebar";

// *-------------- import icons -----------------

import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuStore } from "react-icons/lu";

const vendorNavTabs = [
  { id: 1, name: "Dashboard", icon: MdOutlineSpaceDashboard, href: "/vendor" },
  { id: 2, name: "Catalogs", icon: LuStore, href: "/vendor/catalogs" },
  { id: 3, name: "Customers", icon: FaUser, href: "/vendor/customers" },
];
export default function VendorRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar navItems={vendorNavTabs} />
      <main className="ml-64 flex-1  min-h-screen p-6">{children}</main>
    </>
  );
}
