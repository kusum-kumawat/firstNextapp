// types/layout.ts
export interface SidebarItem {
  name: string;
  href: string;
  icon: string;
  badge?: number | string;
  subItems?: SidebarItem[];
}

export interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  title: string;
  user?: User;
  onLogout?: () => void;
  collapsed?: boolean;
  collapsible?: boolean;
}
