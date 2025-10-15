import Sidebar from "../../components/Sidebar";

export default function layout({ children, orders, products, customers }) {
  const sideBarLinks = [
    { tab: "profile", icon: "", navTo: "/vendor" },
    { tab: "products", icon: "", navTo: "/vendor/@products" },
    { tab: "orders", icon: "", navTo: "/vendor/@orders" },
    { tab: "customer", icon: "", navTo: "/vendor/@customers" },
  ];

  console.log("Vendor layout is rendered");
  return (
    <>
      <Sidebar sideBarLinks={sideBarLinks} />
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {/* Default dashboard */}
        <div>{children}</div>

        {/* Slots Grid */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <section className="bg-white rounded-xl p-4 shadow">{orders}</section>
          <section className="bg-white rounded-xl p-4 shadow">
            {products}
          </section>
          <section className="bg-white rounded-xl p-4 shadow">
            {customers}
          </section>
        </div>
      </main>
    </>
  );
}
