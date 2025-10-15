import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Products } from "../models/products.js";
import { Category } from "../models/categories.js";

// * --------------------------- Get products ---------------------

export const getAll = asyncHandler(async (req, res) => {
  const products = await Products.find().populate("category");
  return res
    .status(200)
    .json(new ApiResponse(200, products, "sucessfully get all the products."));
});

// * --------------------- Add Product -------------------------

export const AddProduct = asyncHandler(async (req, res) => {
  //  get product image path
  const imagePath = req.file.path;

  //  get product detail
  const { name, description, category, price } = req.body;

  if (!imagePath) {
    throw ApiError.badRequest("Product image is required.");
  }

  if (!(name && description && category && price)) {
    throw ApiError.badRequest("All fields are required.");
  }
  const imageUrl = `${process.env.BACKEND_URI}/${imagePath.replace("\\", "/")}`;
  console.log(imageUrl);
  const product = Products({
    name,
    description,
    category,
    price,
    productImage: imageUrl,
  });

  const savedProduct = await product.save();

  if (!savedProduct) {
    throw ApiError.internal("Facing problem while saving product.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, savedProduct, "product is added successfully."));
});

// * ---------------------- Add category -------------------------

export const AddCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    throw ApiError.badRequest("Category name is required.");
  }

  const category = Category({ name: categoryName });

  const savedCategory = await category.save();

  if (!savedCategory) {
    throw ApiError.internal("Facing problem while saving category.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, savedCategory, "Category is added successfullly.")
    );
});

// * ------------------- Get Category ----------------------------------

export const GetCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  if (!categories) {
    throw ApiError.notFound("No category found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fatched successfully."));
});
