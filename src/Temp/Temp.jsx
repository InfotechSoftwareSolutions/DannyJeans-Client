import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const AddProduct = () => {
  const [hasVariants, setHasVariants] = useState(false);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const validationSchema = Yup.object({
    productName: Yup.string().required("Product name is required"),
    price: Yup.number().required("Price is required").positive("Must be a positive number"),
    salePrice: Yup.number().positive("Must be a positive number"),
    quantity: Yup.number().required("Quantity is required").integer("Must be an integer"),
    description: Yup.string().required("Description is required"),
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Formik
      initialValues={{
        productName: "",
        price: "",
        salePrice: "",
        quantity: "",
        description: "",
        tags: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form submitted", values);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-5">
          <h2 className="text-2xl font-semibold mb-2">Add Product</h2>
          <p className="text-gray-500 mb-4">Add your product and necessary information from here</p>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Product Title/Name</label>
              <input
                type="text"
                name="productName"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.productName}
              />
              {touched.productName && errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
            </div>

            <div>
              <label className="block font-medium">Product Price</label>
              <input
                type="number"
                name="price"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
              {touched.price && errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-medium">Product Description</label>
            <textarea
              name="description"
              className="w-full p-2 border rounded-md"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            ></textarea>
            {touched.description && errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button type="button" className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Add Product</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProduct;
