"use client";

import { useError } from "../_context/ErrorContext";
import { useEffect } from "react";

export const ErrorPopup = () => {
  const { error, setError } = useError();

  // Auto-hide after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (!error) return null;

  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white p-4 rounded shadow-lg z-50">
      {error}
    </div>
  );
};
