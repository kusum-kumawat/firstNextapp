import { AdminSignup } from "@/components/admin/signup/Signup";
import VendorSignup from "@/components/vendor/signup/VendorSignup";
import { redirect } from "next/navigation";

export default async function Signup({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  console.log(role);

  if (role == "admin") {
    return <AdminSignup />;
  } else if (role == "vendor") {
    return <VendorSignup />;
  }

  // 🚀 Redirect to /signup if role is invalid
  redirect("/signup");
}
