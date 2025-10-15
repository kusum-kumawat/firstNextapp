"use client";
import { VendorFormData } from "@/types/VendorFormData";
import { useForm, FormProvider } from "react-hook-form";
import personalInfo from "./steps/Personalndo";
import { FormField } from "@/components/form/FormField";

const steps = [
  { id: 1, name: "Personal Info", component: personalInfo },
  { id: 1, name: "Bank Detail", component: personalInfo },
];

export default function VendorSignup() {
  const methods = useForm<VendorFormData>({});
  const { handleSubmit } = methods;

  const onVendorSignup = async (VendorData: VendorFormData) => {
    console.log(VendorData);
  };

  return (
    <>
      <FormProvider {...methods}>
        <div className="h-screen flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onVendorSignup)}
            className="border m-2 p-2"
          >
            <div className="flex">
              <FormField name="firstName" label="First Name" type="text" />
              <FormField name="lastName" label="Last Name" type="text" />
            </div>
          </form>
        </div>
      </FormProvider>
    </>
  );
}
