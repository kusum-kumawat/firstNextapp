// types/admin.ts
export interface Vendor {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  registrationDate: string;
  businessType: "individual" | "partnership" | "corporation" | "llc";
  categories: string[];
  reviewScore: number | null;
  totalProducts: number;
  monthlyRevenue: number;
  rejectionReason?: string;
}

export interface VendorStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalRevenue: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "support";
  lastLogin: string;
  permissions: string[];
}
