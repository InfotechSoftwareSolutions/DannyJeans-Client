// import React from "react";
// import { useFormikContext, ErrorMessage } from "formik";

// const ImageUploader = () => {
//   const formik = useFormikContext();

//   if (!formik) {
//     return null; // Prevents crashing if not inside Formik
//   }

//   const { values, setFieldValue } = formik;

//   const handleImageChange = (event) => {
//     const files = Array.from(event.target.files);
//     const selectedFiles = [...images, ...files].slice(0, 4); // Max 4 images
//     setFieldValue("images", selectedFiles);
//   };

//   const removeImage = (index) => {
//     const newImages = [...values.images];
//     newImages.splice(index, 1);
//     setFieldValue("images", newImages);
//   };

//   return (
//     <div className="mt-4">
//       <label className="block font-medium">Product Images</label>
//       <input
//         type="file"
//         multiple
//         accept="image/jpeg, image/png, image/webp"
//         onChange={handleImageChange}
//         className="border p-2 rounded-md w-full"
//       />
//       <ErrorMessage name="images" component="p" className="text-red-500 text-sm" />
//       <div className="mt-2 flex flex-wrap gap-2">
//         {values.images.map((image, index) => (
//           <div key={index} className="relative">
//             <img
//               src={URL.createObjectURL(image)}
//               alt="Product Preview"
//               className="w-20 h-20 object-cover rounded-md shadow-md"
//             />
//             <button
//               type="button"
//               onClick={() => removeImage(index)}
//               className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
//             >
//               X
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageUploader;



import React, { useRef } from "react";
import { useFormikContext, ErrorMessage } from "formik";

const ImageUploader = () => {
  const formik = useFormikContext();
  const { values, setFieldValue } = formik;
  const fileInputRef = useRef();
  const fileInputRefs = useRef([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const selectedFiles = [...values.images, ...files].slice(0, 4);
    setFieldValue("images", selectedFiles);
  };

  const handleEditImage = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleReplaceImage = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...values.images];
      updatedImages[index] = file;
      setFieldValue("images", updatedImages);
    }
  };

  const removeImage = (index) => {
    const newImages = [...values.images];
    newImages.splice(index, 1);
    setFieldValue("images", newImages);
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mt-6">
      <label className="block font-semibold text-gray-700 mb-2">Product Images</label>

      {/* Upload Box */}
      <div
        onClick={openFilePicker}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition"
      >
        <p className="text-gray-500">Click to upload or drag & drop (Max 4 images)</p>
        <p className="text-sm text-gray-400 mt-1">JPEG, PNG, or WEBP only</p>
        <input
          type="file"
          multiple
          accept="image/jpeg, image/png, image/webp"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <ErrorMessage name="images" component="p" className="text-red-500 text-sm mt-1" />

      {/* Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {values.images.map((image, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-md border border-gray-200 group"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 hidden group-hover:flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleEditImage(index)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded shadow"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow"
              >
                Delete
              </button>
            </div>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              style={{ display: "none" }}
              ref={(el) => (fileInputRefs.current[index] = el)}
              onChange={(e) => handleReplaceImage(e, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
