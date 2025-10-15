"use client";

import { useState } from "react";
import ProductModal from "../../../components/productModel";

export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ProductModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
      <button onClick={() => setIsOpen(true)}>Add product</button>
    </>
  );
}
