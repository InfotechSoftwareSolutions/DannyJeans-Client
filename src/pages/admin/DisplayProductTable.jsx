import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/admin-api-service/AdminService";


const ProductTable = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const { EditProduct,handleToggleProduct,getProductData, getCategoryeData } = AdminService()
  const [categories, setCategories] = useState([]);



  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/product");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch products");
  //       }
  //       const data = await response.json();
  //       console.log("data",data);
  //       setProducts(data.data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    }, []);
  
    const fetchProducts= async()=> {
      try {
        const response = await getProductData();
        console.log(response.products,"datas");
        setProducts(response.products);
        
        
  
        
      } catch (error) {
        
      }
  
    }
    console.log(products,"==products");

    const fetchCategories = async () => {
      try {
        const response = await getCategoryeData(); // Make sure this method exists
        setCategories(response.categories); // Adjust this based on your API response shape
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

  
  const handleEdit = (product) => {
    setEditProductId(product.id);
    setEditedProduct(product);
    setIsModalOpen(true);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };


    // Handle category submission (Add or Edit)
    const handleSave = async () => {
     
   console.log("editedProduct",editedProduct);
   console.log("editProductId",editProductId);

      try {

        const response = await EditProduct(editedProduct._id,editedProduct);
        setProducts(response.categories)
        setEditProductId(null);
        setIsModalOpen(false);

  //       if (editingCategory) {
         
  
  //         const response = await EditCategory(editingCategory._id,categoryData);
  //         setCategories(response.categories)
  //         clearState()
          
  //       } else {
  
  //         const response = await AddCategory(categoryData);
  // console.log("API Response:", response); // Debugging
  // setCategories(response.categories);
  // clearState();
  
  
  //       }
  
     
      } catch (error) {
        console.error("Error saving category:", error);
      }
    };

    
  // const handleSave = () => {
  //   setProducts(products.map((product) => (product.id === editProductId ? editedProduct : product)));
  //   setEditProductId(null);
  //   setIsModalOpen(false);
  // };

  const toggleBlock = () => {
    setIsBlocked((prev) => !prev);
  };

  const handleToggle = async(productId)=> {
    try{
   console.log("productId",productId);
    const response = await handleToggleProduct(productId);
    console.log(response);
    setProducts(response?.product);

    }
    catch(error){
      toast.error(error?.response?.data?.message)
    }
  }


  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border rounded shadow">
            Export
          </button>
          <button className="px-4 py-2 bg-white border rounded shadow">
            Import
          </button>
        </div>
        <Link to="/add-product">
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            + Add Product
          </button>
        </Link>
      </div>
      {/* {error && <p className="text-red-500">{error}</p>} */}

      {/* Table */}
      <div className="overflow-x-auto bg-white p-4 shadow rounded">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-center">Category</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Sale Price</th>
              <th className="p-3 text-center">Stock</th>
              {/* <th className="p-3 text-center">Status</th> */}
              <th className="p-3 text-center">Actions</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="border-b" >
                    <td className="p-2">{product.name}</td>
                    <td className="p-2 text-center">{product?.category?.name}</td>
                    <td className="p-2 text-center">₹{product?.product_price}</td>
                    <td className="p-2 text-center">₹{product?.sale_price}</td>
                    <td className="p-2 text-center">{product?.stock}</td>
                    {/* <td className="p-2 text-center">
                      <span className="px-2 py-1 text-sm bg-green-200 text-green-800 rounded">
                        {product.status}
                      </span>
                    </td> */}
                    <td className="p-2 text-center">
                      <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2" onClick={() => handleEdit(product)}>Edit</button>
                      {/* <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(product.id)}>Delete</button> */}
                    </td>
                    <td className="p-2 text-center">
                    <button
      onClick={() => handleToggle(product._id)}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
        product.isActive ?  "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {product.isActive ? "Block":"Unblock" }
    </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">No products available</td>
                </tr>
              )}
            </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[450px] relative">
      
      {/* Title and Close Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Update Product</h2>
        <button className="text-purple-500 text-xl" onClick={() => setIsModalOpen(false)}>
          &times;
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-3">
        <label className="block font-medium">Name</label>
        <input 
          name="name" 
          value={editedProduct.name} 
          onChange={handleChange} 
          className="border p-3 w-full rounded text-gray-500" 
          placeholder="Category title" 
        />

        <label className="block font-medium">Description</label>
        <textarea 
          name="description" 
          value={editedProduct.description} 
          onChange={handleChange} 
          className="border p-3 w-full rounded text-gray-500" 
          placeholder="Category Description" 
        />

<label className="block font-medium">Category</label>
<select
  name="category"
  value={editedProduct.category?._id || ""} // Assuming category is an object with _id
  onChange={(e) =>
    setEditedProduct((prev) => ({
      ...prev,
      category: categories.find(cat => cat._id === e.target.value),
    }))
  }
  className="border p-3 w-full rounded text-gray-500"
>
  <option value="">Select a category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}
</select>


        <label className="block font-medium">Parent Category</label>
        <input 
          name="parent_category" 
          value={editedProduct.parent_category || "Home"} 
          readOnly 
          className="border p-3 w-full rounded text-gray-500 bg-gray-100" 
        />

        <label className="block font-medium">Product Image</label>
        <input 
          type="file" 
          className="border p-2 w-full rounded" 
        />

        <div className="flex items-center">
          <input type="checkbox" id="published" className="mr-2" />
          <label htmlFor="published" className="text-gray-700">Published</label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-4 gap-2">
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleSave}> Update Product </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default ProductTable;
