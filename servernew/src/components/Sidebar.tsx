import Link from "next/link";
import { IconType } from "react-icons";

function Sidebar({
  navItems,
}: {
  navItems: { id: number; name: string; href: string; icon: IconType }[];
}) {
  return (
    <aside className="w-64 h-screen text-black bg-gray-100 flex flex-col fixed left-0 top-0">
      {navItems.map((item) => {
        const { id, href, name, icon: Icon } = item;
        return (
          <Link key={id} href={href} className="flex p-2">
            <Icon />
            {name}
          </Link>
        );
      })}
    </aside>
  );
}
export default Sidebar;
