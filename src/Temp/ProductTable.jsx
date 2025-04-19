import  { useState } from 'react'
import { Pencil, CheckCircle, XCircle } from "lucide-react";


const ProductTable = () => {
    const [products] = useState([
        {
          id: 1,
          name: "Product A",
          category: "Category 1",
          image: "https://via.placeholder.com/50",
          description: "Short description here",
          price: "$100",
          stock: 20,
          status: "Active",
        },
        {
          id: 2,
          name: "Product B",
          category: "Category 2",
          image: "https://via.placeholder.com/50",
          description: "Another description",
          price: "$150",
          stock: 10,
          status: "Inactive",
        },
      ]);
    
      return (
        <div className="overflow-x-auto w-full p-6">
          <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
            <thead>
              <tr className="bg-gray-800 text-white text-left text-sm">
                <th className="p-4 font-semibold">Sl No</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Image</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Edit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-all"
                >
                  <td className="p-4 text-gray-700">{index + 1}</td>
                  <td className="p-4 font-medium text-gray-800">{product.name}</td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-md shadow"
                    />
                  </td>
                  <td className="p-4 text-gray-600 max-w-[200px] truncate">
                    {product.description}
                  </td>
                  <td className="p-4 font-semibold text-green-600">{product.price}</td>
                  <td className="p-4 text-gray-700">{product.stock}</td>
                  <td className="p-4">
                    {product.status === "Active" ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:text-blue-800 transition-all">
                      <Pencil />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default ProductTable