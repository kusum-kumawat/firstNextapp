import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, requiredL: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "categories", required: true },
  inStock: { type: Boolean, default: true },
  productImage: { type: String, required: true },
  
});

export const Products = model("products", ProductSchema);
