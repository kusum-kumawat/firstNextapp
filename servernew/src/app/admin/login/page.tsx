"use client";

import { SubmitHandler, FieldValues } from "react-hook-form";
import AuthForm from "@/components/AuthForm";

const onAdminLogin: SubmitHandler<FieldValues> = (data) => {
  console.log("Admin Login Data:", data);
};

export default function AdminLoginPage() {
  return (
    <AuthForm
      title="Admin Login"
      buttonText="Login"
      onSubmit={onAdminLogin}
      fields={[
        {
          name: "adminName",
          type: "text",
          placeholder: "Admin Name",
          validation: { required: true },
        },
        {
          name: "email",
          type: "text",
          placeholder: "Email",
          validation: { required: true },
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          validation: { required: true },
        },
      ]}
    />
  );
}
