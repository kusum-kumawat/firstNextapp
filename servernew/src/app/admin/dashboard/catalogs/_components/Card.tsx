"use client";

export default function Card({
  product,
}: {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: { name: string };
    inStock: boolean;
    productImage: string;
  };
}) {
  const { _id, name, description, price, category, inStock, productImage } =
    product;

  const categoryName = category.name;
  return (
    <div className="shadow-sm pt-2">
      <img
        src={productImage}
        alt={name}
        className="w-40 h-40 object-cover mb-2"
      />
      <h3>{name}</h3>
      <p className="text-sm">{description}</p>
      <p>{price}</p>
      {/* <p>{categoryName}</p> */}
      <p>{inStock ? "In Stock" : "Out of stock"}</p>
    </div>
  );
}
