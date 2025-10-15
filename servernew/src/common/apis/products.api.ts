import { api } from "./api";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: FileList | null;
}

export const productsApi = {
  getProducts: async () => api.get("/products"),
  addProduct: async (productData: FormData) =>
    api.post("/products", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getCategories: async () => api.get("/products/categories"),
};
