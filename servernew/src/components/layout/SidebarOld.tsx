// components/layout/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItem, SidebarProps } from "@/types/layout";

// Sidebar Item Component
function SidebarItemComponent({
  item,
  isActive,
  collapsed,
  onClick,
}: {
  item: SidebarItem;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleClick = () => {
    if (item.subItems) {
      setShowSubmenu(!showSubmenu);
    } else {
      onClick();
    }
  };

  const content = (
    <div
      className={`
        flex items-center px-3 py-3 text-sm font-medium rounded-lg
        transition-all duration-200
        ${
          isActive
            ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }
        ${item.subItems ? "cursor-pointer" : ""}
      `}
      onClick={handleClick}
    >
      <span className="text-lg mr-3 flex-shrink-0">{item.icon}</span>

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.name}</span>
          {item.badge && (
            <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              {item.badge}
            </span>
          )}
          {item.subItems && (
            <span
              className={`ml-2 transform transition-transform ${
                showSubmenu ? "rotate-90" : ""
              }`}
            >
              ›
            </span>
          )}
        </>
      )}
    </div>
  );

  return (
    <div>
      {item.href && !item.subItems ? (
        <Link href={item.href}>{content}</Link>
      ) : (
        content
      )}

      {/* Submenu */}
      {item.subItems && !collapsed && showSubmenu && (
        <div className="ml-6 mt-1 space-y-1">
          {item.subItems.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              onClick={onClick}
              className={`
                block px-3 py-2 text-sm rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-blue-25 text-blue-600 border border-blue-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }
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
    </div>
  );
}

export default function SidebarOld({
  items,
  title = "Dashboard",
  user,
  onLogout,
  collapsed: defaultCollapsed = false,
  collapsible = true,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 shadow-lg 
          transform transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-800 truncate">
              {title}
            </h1>
          )}

          {collapsible && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? "→" : "←"}
            </button>
          )}
        </div>

        {/* User Info */}
        {user && !collapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto">
          <div className="px-2 space-y-1">
            {items.map((item) => (
              <SidebarItemComponent
                key={item.href}
                item={item}
                isActive={isActive(item.href)}
                collapsed={collapsed}
                onClick={closeMobile}
              />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {onLogout && (
            <button
              onClick={onLogout}
              className={`
                w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg
                text-gray-700 hover:bg-gray-100 hover:text-gray-900
                transition-colors
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <span className="text-lg mr-3">🚪</span>
              {!collapsed && "Logout"}
            </button>
          )}
        </div>
      </div>

      {/* Mobile header */}
      <header className="bg-white w-screen shadow-sm border-b border-gray-200 lg:hidden">
        <div className="flex items-center justify-between h-16 px-4">
          <button
            onClick={toggleMobile}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          <div className="w-8" /> {/* Spacer for balance */}
        </div>
      </header>
    </div>
  );
}
