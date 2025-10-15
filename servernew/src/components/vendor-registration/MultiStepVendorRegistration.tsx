"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import BusinessInfoStep from "./steps/BusinessInfoStep";
import ContactInfoStep from "./steps/ContactInfoStep";
import BankDetailsStep from "./steps/BankDetailsStep";
import ProductCategoriesStep from "./steps/ProductCategoriesStep";
import DocumentsStep from "./steps/DocumentsStep";
import ReviewStep from "./steps/ReviewStep";
import { VendorFormData } from "@/types/vendor";
import ProgressBar from "./ProgressBar";

// Define all steps for the multi-step form
const steps = [
  // Uncomment and add other steps as needed
  // { id: 1, title: "Business Info", component: BusinessInfoStep },
  // { id: 2, title: "Contact Info", component: ContactInfoStep },
  // { id: 3, title: "Bank Details", component: BankDetailsStep },
  { id: 1, title: "Categories", component: ProductCategoriesStep },
  { id: 2, title: "Documents", component: DocumentsStep },
  { id: 3, title: "Review", component: ReviewStep },
];

export default function MultiStepVendorRegistration() {
  // Track the current step number (1-based)
  const [currentStep, setCurrentStep] = useState(1);

  // Track submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize react-hook-form with type safety
  const methods = useForm<VendorFormData>({
    mode: "onChange", // validation runs on change
    defaultValues: {
      businessInfo: {
        businessType: "individual",
        taxId: "",
      },
      categories: {}, // initialize categories as an object (categoryId: subcategories[])
      documents: {},
    },
  });

  const {
    handleSubmit, // submit handler
    trigger, // validate specific fields
    formState: { isValid }, // check if form is valid
  } = methods;

  // Move to next step after validation
  const nextStep = async () => {
    const fields = getStepFields(currentStep); // get fields for the current step
    const isStepValid = await trigger(fields); // validate only those fields

    if (isStepValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1); // move to next step
    }
  };

  // Move to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Map step numbers to form fields they validate
  const getStepFields = (step: number): (keyof VendorFormData)[] => {
    const fieldMap: Record<number, (keyof VendorFormData)[]> = {
      // Uncomment if adding other steps
      // 1: ["businessInfo"],
      // 2: ["contactInfo"],
      // 3: ["bankDetails"],
      1: ["categories"],
      2: ["documents"],
      3: [], // Review step may not have fields
    };
    return fieldMap[step] || [];
  };

  // Form submit handler
  const onSubmit = async (data: VendorFormData) => {
    console.log("Form submitted...", data);

    // Uncomment and implement API call
    /*
    setIsSubmitting(true);
    try {
      await apiCallToSubmitVendor(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  // Dynamically render the current step component
  const CurrentStepComponent = steps[currentStep - 1].component;

  // Show success message after submission
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Registration Successful!
          </h2>
          <p className="text-green-600 mb-4">
            Your vendor application has been submitted successfully. Our team
            will review your application and contact you within 2-3 business
            days.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Register Another Vendor
          </button>
        </div>
      </div>
    );
  }

  // Render the multi-step form
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Form header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vendor Registration
          </h1>
          <p className="text-gray-600">
            Complete the following steps to become a vendor
          </p>
        </div>

        {/* Progress bar component */}
        <ProgressBar steps={steps} currentStep={currentStep} />

        {/* Wrap form with FormProvider for react-hook-form context */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            {/* Current step content */}
            <div className="bg-gray-50 rounded-lg p-6">
              <CurrentStepComponent />
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {/* Previous button */}
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {/* Next / Submit button */}
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
