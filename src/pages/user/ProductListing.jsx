import React, { useState, useEffect } from "react";
import UserService from "../../services/user-api-service/UserService";
import AdminService from "../../services/admin-api-service/AdminService";
import ReturnReasonModal from "./Return";



const ProductListing = () => {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders,setOrders] = useState([]);
  const { getAllOrders } = UserService();
  const { updateStatus, returnProcess } = AdminService();
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);

   // Steps in order
   const steps = ["Processing", "Shipped", "Delivered"];

   // Find the index of the current status
   const currentStepIndex = steps.indexOf(deliveryStatus);

  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(search.toLowerCase())
  // );


  useEffect(() => {
    fetchOrders();

      }, []);
  
      // ***************************
      const returnProduct = async(reason)=> {
        try {

         
          setIsOpen(false)
          
          const data = {newStatus:"Returned", reason}

          const response = await updateStatus(selectedProduct?._id,data);
          if(response?.success){

            setSelectedProduct(prev=>({
              ...prev,
              deliveryStatus:"Returned"
            }))

            processReturn(reason)

          }
        } catch (error) {
          
        }
    
      }

      const processReturn = async(reason)=> {
        try {
console.log("processReturn");
console.log(reason,"reason=====");
console.log(selectedProduct,"selectedProduct=====");
return;

          // const data = {returnReason:reason ,color:selectedProduct.color,}

          const response = await returnProcess(selectedProduct?._id,data);
          if(response?.success){
            setSelectedProduct(prev=>({
              ...prev,
              deliveryStatus:"Returned"
            }))
          }
        } catch (error) {
          
        }
    
      }

      const returnProductPopup = async()=> {
        // setSelectedProduct(null)
        setIsOpen(prev=>!prev)
    
      }

      const cancelProduct = async()=> {
        try {
          const data = {newStatus:"Cancelled"}
          const response = await updateStatus(selectedProduct?._id,data);

          if(response?.success){
            setSelectedProduct(prev=>({
              ...prev,
              deliveryStatus:"Cancelled"
            }))
          }
        } catch (error) {
          
        }
    
      }

      const fetchOrders = async()=> {
    try {
      const response = await getAllOrders();
      console.log(response.orders,"orders");
      setOrders(response?.orders);
      

      
    } catch (error) {
      
    }

  }
  console.log(orders,"==orders");
  console.log(selectedProduct,"==selectedProduct===");


  return (
    <div className="p-6 max-w-full mx-auto">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orders?.map((product) => (
          <div
            key={product?._id}
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer bg-white"
            onClick={() =>{ 
              setSelectedProduct(product);
              setDeliveryStatus(product?.deliveryStatus)
            }}
          >
            <img src={product?.orderItems?.product?.images[0]} alt={product?.orderItems?.product?.name} className="w-full h-32 object-contain rounded-md mb-3" />
            <h2 className="text-lg font-semibold">{product?.orderItems?.product?.name}</h2>
            <p className="text-gray-600 text-sm">Price: ₹{product?.orderItems?.product?.sale_price}</p>
            <p className="text-gray-500 text-sm">Quantity: {product?.orderItems?.quantity}</p>
            <p className="text-gray-500 text-sm">Total Price:  ₹{product?.totalPrice}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
              onClick={() => setSelectedProduct(null)}
            >
              ✖
            </button>

            {/* Product Details */}
            <img src={selectedProduct?.orderItems?.product?.images[0]} alt={selectedProduct.name} className="w-full h-48 object-contain rounded-md mb-4" />
            <h1 className="text-2xl font-bold mb-2">{selectedProduct.orderItems?.product?.name}</h1>
            <p className="text-gray-500 text-md">Price: ₹{selectedProduct.orderItems?.product?.sale_price}</p>
            <p className="text-gray-500 text-md">Quantity: <span className="font-medium">{selectedProduct.orderItems?.quantity}</span></p>
            <p className="text-gray-500 text-md">Total Price: <span className="font-medium"> ₹{selectedProduct.totalPrice}</span></p>
            <p className={`text-md font-semibold ${selectedProduct.status === "Available" ? "text-green-600" : "text-red-500"}`}>
              Status: {selectedProduct.deliveryStatus}
            </p>
            <p className="text-gray-700 mt-4">{selectedProduct.description}</p>

            {selectedProduct?.deliveryStatus &&
                ["processing", "shipped","delivered"].includes(selectedProduct.deliveryStatus.toLowerCase()) && (
           

            <div className="mt-4 p-4 border rounded-lg bg-gray-100">
              <h3 className="text-lg font-semibold mb-4">Order Tracking</h3>

              {/* Progress Bar */}
              <div className="relative w-full h-2 bg-gray-300 rounded-lg">
                {/* Moving Circle */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full transition-all duration-300"
                  style={{ left: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>

              {/* Step Labels */}
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                {steps.map((step, index) => (
                  <span
                    key={step}
                    className={`${index === currentStepIndex ? "text-blue-500 font-semibold" : ""}`}
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>

          )}

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col gap-2">
              {selectedProduct?.deliveryStatus?.toLowerCase() === "delivered" ? (
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-lg"  onClick={returnProductPopup}>
                  Return Product
                </button>
              ) : selectedProduct?.deliveryStatus &&
                ["processing", "shipped"].includes(selectedProduct.deliveryStatus.toLowerCase()) ? (
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-lg"  onClick={() => cancelProduct()}>
                  Cancel Order
                </button>
              ) : null}

              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-lg"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <ReturnReasonModal isOpen={isOpen} returnProductPopup={returnProductPopup} returnProduct={returnProduct}/>
    </div>
  );
};

export default ProductListing;




// import React, { useState, useEffect } from "react";
// import UserService from "../../services/user-api-service/UserService";



// const ProductListing = () => {
//   const [search, setSearch] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [orders,setOrders] = useState([]);
//   const { getAllOrders } = UserService();
//   const [deliveryStatus, setDeliveryStatus] = useState("Delivered");

//    // Steps in order
//    const steps = ["Processing", "Shipped", "Delivered"];

//    // Find the index of the current status
//    const currentStepIndex = steps.indexOf(deliveryStatus);

//   // const filteredProducts = products.filter((product) =>
//   //   product.name.toLowerCase().includes(search.toLowerCase())
//   // );


//   useEffect(() => {
//     fetchOrders();
//       }, []);
  
  
//       const fetchOrders = async()=> {
//     try {
//       const response = await getAllOrders();
//       console.log(response.orders,"orders");
//       setOrders(response?.orders);
      

      
//     } catch (error) {
      
//     }

//   }
//   console.log(orders,"==orders");


//   return (
//     <div className="p-6 max-w-full mx-auto">
//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {orders?.map((product) => (
//           <div
//             key={product?._id}
//             className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer bg-white"
//             onClick={() => setSelectedProduct(product)}
//           >
//             <img src={product?.orderItems?.[0].product?.images[0]} alt={product?.orderItems?.[0]?.product?.name} className="w-full h-32 object-contain rounded-md mb-3" />
//             <h2 className="text-lg font-semibold">{product?.orderItems?.[0].product?.name}</h2>
//             <p className="text-gray-600 text-sm">Price: ₹{product?.orderItems?.[0].product?.sale_price}</p>
//             <p className="text-gray-500 text-sm">Quantity: {product?.orderItems?.[0].quantity}</p>
//             <p className="text-gray-500 text-sm">Total Price:  ₹{product?.totalPrice}</p>

            

           
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {selectedProduct && (
//   <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative">
//       {/* Close Button */}
//       <button
//         className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
//         onClick={() => setSelectedProduct(null)}
//       >
//         ✖
//       </button>

//       {/* Product Details */}
//       <img src={selectedProduct?.orderItems?.[0].product?.images[0]} alt={selectedProduct.name} className="w-full h-48 object-contain rounded-md mb-4" />
//       <h1 className="text-2xl font-bold mb-2">{selectedProduct.orderItems?.[0].product?.name}</h1>
//       <p className="text-gray-500 text-md">Price: ₹{selectedProduct.orderItems?.[0].product?.sale_price}</p>
      
//       <p className="text-gray-500 text-md">Quantity: <span className="font-medium">{selectedProduct.orderItems?.[0].quantity}</span></p>
//       <p className="text-gray-500 text-md">Total Price: <span className="font-medium"> ₹{selectedProduct.totalPrice}</span></p>
//       <p className={`text-md font-semibold ${selectedProduct.status === "Available" ? "text-green-600" : "text-red-500"}`}>
//         Status: {selectedProduct.deliveryStatus}
//       </p>
//       <p className="text-gray-700 mt-4">{selectedProduct.description}</p>

//       <div className="mt-4 p-4 border rounded-lg bg-gray-100">
//       <h3 className="text-lg font-semibold mb-4">Order Tracking</h3>

//       {/* Progress Bar */}
//       <div className="relative w-full h-2 bg-gray-300 rounded-lg">
//         {/* Moving Circle */}
//         <div
//           className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full transition-all duration-300"
//           style={{ left: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
//         ></div>
//       </div>

//       {/* Step Labels */}
//       <div className="flex justify-between text-xs text-gray-600 mt-2">
//         {steps.map((step, index) => (
//           <span
//             key={step}
//             className={`${index === currentStepIndex ? "text-blue-500 font-semibold" : ""}`}
//           >
//             {step}
//           </span>
//         ))}
//       </div>

   
//     </div>
  

// {/* Action Buttons */}
// <div className="mt-4 flex flex-col gap-2">
//   {selectedProduct.deliveryStatus === "Delivered" ? (
//     <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-lg">
//       Return Product
//     </button>
//   ) : ["Pending", "Processing", "Shipped"].includes(selectedProduct.deliveryStatus) ? (
//     <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-lg">
//       Cancel Order
//     </button>
//   ) : null}

//   <button
//     className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-lg"
//     onClick={() => setSelectedProduct(null)}
//   >
//     Close
//   </button>
// </div>


//     </div>
//   </div>
// )}

      
//     </div>
//   );
// };

// export default ProductListing;
