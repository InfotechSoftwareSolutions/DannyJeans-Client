// import React, { useState } from "react";

// const AddProduct = () => {
//   const [hasVariants, setHasVariants] = useState(false);
//   const [images, setImages] = useState([]);

//   const handleImageChange = (event) => {
//     const files = Array.from(event.target.files);
//     setImages((prevImages) => [...prevImages, ...files]);
//   };

//   const removeImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-5">
//       <h2 className="text-2xl font-semibold mb-2">Add Product</h2>
//       <p className="text-gray-500 mb-4">Add your product and necessary information from here</p>

//       {/* Variants Toggle */}
//       <div className="flex justify-end items-center mb-5">
//         <span className="text-orange-500 mr-2">Does this product have variants?</span>
//         <button
//           className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${
//             hasVariants ? "bg-green-500" : "bg-red-500"
//           }`}
//           onClick={() => setHasVariants(!hasVariants)}
//         >
//           <div
//             className={`w-6 h-6 bg-white rounded-full shadow-md transform ${
//               hasVariants ? "translate-x-7" : "translate-x-0"
//             }`}
//           ></div>
//         </button>
//       </div>

//       {/* Form Fields */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block font-medium">Product Title/Name</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Product Price</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Sale Price</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Product Quantity</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>
//       </div>

//       <div className="mt-4">
//         <label className="block font-medium">Product Tags (comma separated)</label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//       </div>

//       <div className="mt-4">
//         <label className="block font-medium">Product Description</label>
//         <textarea
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           rows="4"
//         ></textarea>
//       </div>

//       {/* Image Upload */}
//       <div className="mt-4">
//         <label className="block font-medium">Product Images</label>
//         <div className="border border-dashed border-gray-400 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer">
//           <input
//             type="file"
//             multiple
//             accept="image/jpeg, image/png, image/webp"
//             className="hidden"
//             id="imageUpload"
//             onChange={handleImageChange}
//           />
//           <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
//             <svg
//               className="w-12 h-12 text-gray-400 mb-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M7 16l4-4m0 0l4 4m-4-4v12M3 16V4a1 1 0 011-1h16a1 1 0 011 1v12"
//               ></path>
//             </svg>
//             <span className="text-gray-500">Drag your images here or click to upload</span>
//           </label>
//         </div>
//         <div className="mt-2 flex flex-wrap gap-2">
//           {images.map((image, index) => (
//             <div key={index} className="relative">
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt="Product Preview"
//                 className="w-20 h-20 object-cover rounded-md shadow-md"
//               />
//               <button
//                 onClick={() => removeImage(index)}
//                 className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
//               >
//                 X
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-between mt-6">
//         <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Cancel</button>
//         <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Add Product</button>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;









import React, { useState } from "react";
import { Formik, Form, ErrorMessage} from "formik";
import * as Yup from "yup";


const AddProduct = () => {

  const [hasVariants, setHasVariants] = useState(false);
    const [images, setImages] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
  
    const validationSchema = Yup.object({
      productName: Yup.string().required("Product name is required"),
      price: Yup.number().required("Price is required").positive("Must be a positive number"),
      salePrice: Yup.number().required ("Must be a positive number"),
      quantity: Yup.number().required("Quantity is required").integer("Must be an integer"),
      description: Yup.string().required("Description is required"),
      sizes: Yup.array().of(Yup.string()).min(1, "At least one size is required"),
  colors: Yup.array().of(Yup.string()).min(1, "At least one color is required"),
  images: Yup.array()
    .min(1, "At least one image is required")
    .test("fileFormat", "Unsupported file format", (value) => {
      if (!value) return true; // No files uploaded is fine
      const acceptedFormats = ["image/jpeg", "image/png", "image/webp"];
      return value.every((file) => acceptedFormats.includes(file.type));
    }),
    });
  
    const handleImageChange = (event) => {
      const files = Array.from(event.target.files);
      setImages((prevImages) => [...prevImages, ...files]);
    };
  
    const removeImage = (index) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

  // const [hasVariants, setHasVariants] = useState(false);
  // const [images, setImages] = useState([]);
  // const [sizes, setSizes] = useState([]);
  // const [colors, setColors] = useState([]);

  // const handleImageChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   setImages((prevImages) => [...prevImages, ...files]);
  // };

  // const removeImage = (index) => {
  //   setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  // };

  const addSize = () => {
    setSizes((prevSizes) => [...prevSizes, ""]);
  };

  const handleSizeChange = (index, value) => {
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index] = value;
      return newSizes;
    });
  };

  const removeSize = (index) => {
    setSizes((prevSizes) => prevSizes.filter((_, i) => i !== index));
  };

  const addColor = () => {
    setColors((prevColors) => [...prevColors, ""]);
  };

  // const handleColorChange = (index, value) => {
  //   setColors((prevColors) => {
  //     const newColors = [...prevColors];
  //     newColors[index] = value;
  //     return newColors;
  //   });
  // };

  // const removeColor = (index) => {
  //   setColors((prevColors) => prevColors.filter((_, i) => i !== index));
  // };

  return (
        <Formik
          initialValues={{
            productName: "",
            price: "",
            salePrice: "",
            quantity: "",
            description: "",
            tags: "",
            sizes:[],
            colors:[],
            images: [],
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

      {/* Variants Toggle */}
      <div className="flex justify-end items-center mb-5">
        <span className="text-orange-500 mr-2">Does this product have variants?</span>
        <button
          className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${
            hasVariants ? "bg-green-500" : "bg-red-500"
          }`}
          onClick={() => setHasVariants(!hasVariants)}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform ${
              hasVariants ? "translate-x-7" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Product Title/Name</label>
          <input
            type="text"
            name="productName"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
           {touched.price && errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        <div>
          <label className="block font-medium">Sale Price</label>
          <input
          type="number"
          name="salePrice"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.salePrice}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
           {touched.salePrice && errors.salePrice && <p className="text-red-500 text-sm">{errors.salePrice}</p>}
        </div>

        <div>
          <label className="block font-medium">Product Quantity</label>
          <input
            type="number"
            name="quantity"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.quantity}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
           {touched.quantity && errors.quantity && <p className="text-red-500   text-sm">{errors.quantity}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-medium">Product Tags (comma separated)</label>
        <input
          type="text"
            name="productName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.productName}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">Product Description</label>
        <textarea
         type="text"
         name="description"
         onChange={handleChange}
         onBlur={handleBlur}
         value={values.description}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="4"
        ></textarea>
           {touched.description && errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        
      </div>

    <div className="mt-4">
  <label className="block font-medium mb-2">Sizes</label>
  <div className="flex flex-wrap gap-2">
    {sizes.map((size, index) => (
      <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
        <input
          type="text"
          value={size}
          onChange={(e) => handleSizeChange(index, e.target.value)}
          className="bg-transparent focus:outline-none w-16 text-sm"
        />
        <button
          onClick={() => removeSize(index)}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    ))}
    <button
      onClick={addSize}
      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600"
    >
      + Add Size
    </button>
    <ErrorMessage name="sizes" component="p" className="text-red-500 text-sm" />

  </div>
</div>

<div className="mt-4">
  <label className="block font-medium mb-2">Colors</label>
  <div className="flex flex-wrap gap-2">
    {colors.map((color, index) => (
      <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
        <input
          type="text"
          value={color}
          onChange={(e) => handleColorChange(index, e.target.value)}
          className="bg-transparent focus:outline-none w-16 text-sm"
        />
        <button
          onClick={() => removeColor(index)}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    ))}
    <button
      onClick={addColor}
      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600"
    >
      + Add Color
    </button>
    <ErrorMessage name="colors" component="p" className="text-red-500 text-sm" />

  </div>
</div>

      {/* Image Upload */}
      <div className="mt-4">
        <label className="block font-medium">Product Images</label>
        <div className="border border-dashed border-gray-400 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
            id="imageUpload"
            onChange={handleImageChange}
          />
          <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
            <svg
              className="w-12 h-12 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l4-4m0 0l4 4m-4-4v12M3 16V4a1 1 0 011-1h16a1 1 0 011 1v12"
              ></path>
            </svg>
            <span className="text-gray-500">Drag your images here or click to upload</span>
          </label>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="Product Preview"
                className="w-20 h-20 object-cover rounded-md shadow-md"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                X
              </button>
              <ErrorMessage name="images" component="p" className="text-red-500 text-sm" />

            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Cancel</button>
        <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Add Product</button>
      </div>
    </Form>
  )}
    </Formik>
  );
};

export default AddProduct;
