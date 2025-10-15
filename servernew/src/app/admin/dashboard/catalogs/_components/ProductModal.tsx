"use client";
import ReactModal from "react-modal";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { productsApi } from "@/common/apis/products.api";
import React, { useEffect, useState } from "react";
import { useError } from "@/app/_context/ErrorContext";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: FileList | null;
}

// import { Profiler } from "react";

// function onRenderCallback(
//   id: string, // the "id" prop of the Profiler tree
//   phase: "mount" | "update",
//   actualDuration: number, // time spent rendering
//   baseDuration: number, // estimated render time without memoization
//   startTime: number,
//   commitTime: number,
//   interactions: Set<any>
// ) {
//   console.log({ id, phase, actualDuration, startTime, commitTime });
// }

const getCategories = async () => {
  const res = await productsApi.getCategories();
  if (res.statusText === "OK") {
    return res.data.data;
  }
};

interface CategoryType {
  _id: string;
  name: string;
}

// * -------------------------------------------------------------------
// * --------------------- Product Modal Component ----------------------
// * --------------------------------------------------------------------

export default function ProductModal({
  isOpen,
  onClose,
  onProductAdded,
}: {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => Promise<any>;
}) {
  const { register, handleSubmit, watch } = useForm<ProductFormData>();
  const [preview, setPreview] = useState<File | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { setError } = useError();

  useEffect(() => {
    (async () => {
      const categories = await getCategories();
      setCategories(categories);
    })();
  }, []);

  // const selectedCategories = watch("category");

  // * ---------------------- Product Image Preview Handler ---------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPreview(file ?? null);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => setPreview(reader.result as string);
    //   reader.readAsDataURL(file);
    // } else {
    //   setPreview(null);
    // }
  };

  console.log("Product Modal is rendered.");

  // * ------------------------- Product Add Handler -------------------------

  const handleProductAdd = async (product: ProductFormData) => {
    console.log(product);
    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", String(product.price));

      // append file (assuming imageUrl is FileList from <input type="file" />)
      if (product.imageUrl && product.imageUrl[0]) {
        if (product.imageUrl && product.imageUrl[0]) {
          formData.append("imageUrl", product.imageUrl[0]); //
        }
      }

      // send multipart/form-data request
      const res = await productsApi.addProduct(formData);

      if (res.status < 400) {
        console.log("Product added successfully.");
        onProductAdded(); // <-- refresh products
        onClose(); // optionally close modal
      }
    } catch (err: any) {
      console.error("Error adding product:", err);
      setError(
        err?.response?.data?.message || err?.message || "Failed to add product."
      );
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      className="bg-white p-4 rounded max-w-xl mx-h-xl  mt-20 outline-none shadow-lg"
      overlayClassName="fixed inset-0 bg-opacity-80 flex items-center justify-center"
    >
      <form onSubmit={handleSubmit((product) => handleProductAdd(product))}>
        <h2 className="text-xl mb-4">Add New Product</h2>
        <hr />
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          placeholder="Product Name."
          {...register("name", {
            required: { value: true, message: "Product Name is required." },
          })}
        />
        <label htmlFor="description">Product Description</label>
        <input
          type="textarea"
          placeholder="Product Description."
          {...register("description", {
            required: {
              value: true,
              message: "Product Description is required.",
            },
          })}
        />
        <label htmlFor="Product Image">Product Image</label>
        <input
          type="file"
          {...register("imageUrl", {
            required: { value: true, message: "Product Image is required." },
          })}
          onChange={handleImageChange}
        />
        {preview && (
          <img
            src={URL.createObjectURL(preview)}
            alt="Preview"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        )}

        <label htmlFor="category">Category</label>
        <select {...register("category")}>
          {categories &&
            categories.map((cat) => {
              return <option value={cat._id}>{cat.name}</option>;
            })}
        </select>

        <label htmlFor="price">Price</label>
        <input
          type="number"
          {...register("price", {
            required: {
              value: true,
              message: "Product Price is required.",
            },
          })}
        />
        <button className="bg-blue-500 text-white p-1">Add product</button>
      </form>
    </ReactModal>
  );
}
