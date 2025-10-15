"use client";

import { SidebarProps } from "@/types/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar({
  items,
  title = "Dashboard",
  user,
  onLogout,
  collapsed: defaultCollapsed = false,
  collapsible = true,
}: SidebarProps) {
  const pathname = usePathname();
  // State to track which parent menu is open
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  const toggleMenu = (href: string) => {
    setOpenMenu((prev) => (prev === href ? null : href));
  };
  return (
    <aside className="mr-2 shadow-lg">
      <h1 className="font-bold text-lg">Admin Panel</h1>
      <div className="flex flex-col p-1">
        {items?.map((item) => {
          const isOpen = openMenu === item.href;
          return (
            <>
              <div
                className={`py-2 px-6 m-2 shadow-sm rounded-lg ${
                  isActive(item.href)
                    ? "bg-violet-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
                onClick={() => (item.subItems ? toggleMenu(item.href) : null)}
              >
                {item.icon}
                <span className="p-4">{item.name}</span>
                {item.subItems && (
                  <span className="m-auto">{isOpen ? "▾" : "▸"}</span>
                )}
              </div>

              {item?.subItems && isOpen && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      //   onClick={onClick}
                      className={`
                block px-3 py-2 text-sm rounded-lg transition-colors

              `}
                    >
                      {subItem.name}
                      {subItem.badge && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
                          {subItem.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </>
          );
        })}
      </div>
    </aside>
  );
}
