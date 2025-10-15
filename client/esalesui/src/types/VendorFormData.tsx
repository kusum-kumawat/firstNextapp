export interface VendorFormData {
  businessInfo: {
    businessType: "individual" | "partnership" | "corporation" | "llc";
    businessName: string;
    taxId: string;
    registrationNumber?: string;
    website?: string;
    description: string;
  };
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  bankDetails: {
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    routingNumber: string;
    currency: string;
    accountType: "checking" | "savings";
  };
  categories: {};
  documents: {
    businessLicense?: string;
    taxDocument?: string;
    governmentId?: string;
  };
}
