"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

const handleAddProduct = (data) => {
  console.log(data);
};

export default function ProductModal({ children, isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(isOpen);
  return (
    <Modal
      isOpen={isOpen}
      onAfterClose={onClose}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: { value: true, message: "Product name is required." },
          })}
        />
        <input
          type="text"
          placeholder="Description"
          {...register("description", {
            required: { value: true, message: "Description is required." },
          })}
        />
        <select
          type="text"
          placeholder="Category"
          {...register("category", {
            required: { value: true, message: "Product categoryis required." },
          })}
        >
          <option value="">Select Product.</option>
          <option value="Electronics">Electronics</option>
          <option value="Cloths">Cloths</option>
          <option value="Kitchen Assesaries">Kitchen Assesaries</option>
        </select>

        <button>Add product</button>
      </form>

      {children}
    </Modal>
  );
}
