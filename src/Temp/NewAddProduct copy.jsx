import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  price: yup.number().positive("Price must be positive").required("Price is required"),
  salePrice: yup
    .number()
    .nullable()
    .test("is-valid", "Sale price must be less than price", function (value) {
      return value === null || value < this.parent.price;
    }),
  quantity: yup.number().integer().min(1, "Quantity must be at least 1").required("Quantity is required"),
  tags: yup.string().optional(),
  description: yup.string().required("Description is required"),
});

const AddProduct = () => {
  const [hasVariants, setHasVariants] = useState(false);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const addSize = () => setSizes([...sizes, ""]);
  const handleSizeChange = (index, value) => {
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };
  const removeSize = (index) => setSizes(sizes.filter((_, i) => i !== index));

  const addColor = () => setColors([...colors, ""]);
  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };
  const removeColor = (index) => setColors(colors.filter((_, i) => i !== index));

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-5">
      <h2 className="text-2xl font-semibold mb-2">Add Product</h2>
      <p className="text-gray-500 mb-4">Add your product and necessary information from here</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block font-medium">Product Title/Name</label>
          <input {...register("productName")} className="w-full p-2 border rounded-md" />
          <p className="text-red-500 text-sm">{errors.productName?.message}</p>
        </div>
        <div>
          <label className="block font-medium">Product Price</label>
          <input type="number" {...register("price")} className="w-full p-2 border rounded-md" />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>
        </div>
        <div>
          <label className="block font-medium">Sale Price</label>
          <input type="number" {...register("salePrice")} className="w-full p-2 border rounded-md" />
          <p className="text-red-500 text-sm">{errors.salePrice?.message}</p>
        </div>
        <div>
          <label className="block font-medium">Product Quantity</label>
          <input type="number" {...register("quantity")} className="w-full p-2 border rounded-md" />
          <p className="text-red-500 text-sm">{errors.quantity?.message}</p>
        </div>
        <div>
          <label className="block font-medium">Product Description</label>
          <textarea {...register("description")} className="w-full p-2 border rounded-md" rows="4" />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>
        <div className="mt-4">
          <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
