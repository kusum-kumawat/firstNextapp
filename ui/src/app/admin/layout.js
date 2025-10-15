import Sidebar from "../../components/Sidebar";

export default function layout({ children }) {
  const sideBarLinks = [
    { tab: "home", icon: "", navTo: "/admin" },
    { tab: "products", icon: "", navTo: "/admin/products" },
    { tab: "vendors", icon: "", navTo: "/admin/vendors" },
    { tab: "customer", icon: "", navTo: "/admin/customers" },
    { tab: "subAdmins", icon: "", navto: "/admin/subAdmins" },
  ];
  return (
    <>
      <Sidebar sideBarLinks={sideBarLinks} />
      {children}
    </>
  );
}
