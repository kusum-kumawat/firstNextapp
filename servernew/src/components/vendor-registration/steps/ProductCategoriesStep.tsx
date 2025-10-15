"use client";

import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

const productCategories = [
  {
    id: "electronics",
    name: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Audio", "Cameras"],
  },
  {
    id: "fashion",
    name: "Fashion",
    subcategories: ["Men", "Women", "Kids", "Accessories"],
  },
  {
    id: "home",
    name: "Home & Garden",
    subcategories: ["Furniture", "Decor", "Kitchen", "Garden"],
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    subcategories: ["Fitness", "Outdoor", "Team Sports", "Cycling"],
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances"],
  },
  {
    id: "books",
    name: "Books & Media",
    subcategories: ["Fiction", "Non-Fiction", "Educational", "Media"],
  },
];

// Reusable Checkbox component
interface CheckboxProps {
  checked: boolean;
  label: string;
  onChange: () => void;
  className?: string;
}
function Checkbox({ checked, label, onChange, className = "" }: CheckboxProps) {
  return (
    <label className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-800">{label}</span>
    </label>
  );
}

export default function ProductCategoriesStep() {
  const { watch, setValue } = useFormContext();

  // Watch the 'categories' field from form
  // Expected shape: { electronics: ["Smartphones"], fashion: [] }
  const selectedCategories = watch("categories") || {};

  // Local state to track selected categories & subcategories
  // Mirrors the form state, but allows us to manage UI interactions
  const [selectedSubcategories, setSelectedSubcategories] =
    useState<Record<string, string[]>>(selectedCategories);

  // Whenever local state changes, sync it with react-hook-form
  useEffect(() => {
    setValue("categories", selectedSubcategories, { shouldValidate: true });
  }, [selectedSubcategories, setValue]);

  // Helper function to toggle a value in an array
  const handleToggle = (list: string[], value: string): string[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  // Toggle a category on/off
  const toggleCategory = (categoryId: string) => {
    setSelectedSubcategories((prev) => {
      const copy = { ...prev };
      if (copy[categoryId]) {
        // Category was selected → remove it and all subcategories
        delete copy[categoryId];
      } else {
        // Category was not selected → add it with empty subcategories
        copy[categoryId] = [];
      }
      return copy;
    });
  };

  // Toggle a subcategory on/off for a specific category
  const toggleSubcategory = (categoryId: string, subcategory: string) => {
    setSelectedSubcategories((prev) => ({
      ...prev,
      [categoryId]: handleToggle(prev[categoryId] || [], subcategory),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Product Categories</h2>
      <p className="text-gray-600">
        Select the categories and subcategories you plan to sell in
      </p>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {productCategories.map(({ id, name, subcategories }) => {
          // Determine if the category is selected
          const isSelected = selectedSubcategories.hasOwnProperty(id);
          // Get currently selected subcategories for this category
          const selectedSubs = selectedSubcategories[id] || [];

          return (
            <div key={id} className="border border-gray-200 rounded-lg p-4">
              {/* Category checkbox */}
              <Checkbox
                checked={isSelected}
                label={name}
                onChange={() => toggleCategory(id)}
                className="items-start"
              />

              {/* Show subcategories only if category is selected */}
              {isSelected && (
                <div className="mt-3 space-y-2">
                  <span className="text-sm text-gray-600">Subcategories:</span>
                  <div className="flex flex-wrap gap-2">
                    {subcategories.map((sub) => (
                      <Checkbox
                        key={sub}
                        checked={selectedSubs.includes(sub)}
                        label={sub}
                        onChange={() => toggleSubcategory(id, sub)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
