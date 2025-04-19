import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserService from "../../services/user-api-service/UserService";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const { getCartPageData, handleRemoveFromCart, handleCartQuantityChange } = UserService();
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();
  const [selectedProductPrice, setSelectedProductPrice] = useState(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);



  useEffect(() => {
    fetchCart();
    handleSelect();
  }, []);

  useEffect(() => {
    if(selectedProductId){

      handleSelect(selectedProductId);

    }
    
  }, [cart]);

  // const handleSelect = (productId) => {
  //   setSelectedProductId(productId);
    
  //   const selectedProduct = cart.find((item) => item.product._id === productId);
  //   setSelectedProductPrice(selectedProduct ? selectedProduct.product.sale_price * selectedProduct.quantity : null);
  // };

  const handleSelect = (productId) => {
    setSelectedProductId(productId);
    
    const selectedProduct = cart.find((item) => item.product._id === productId);
    
    if (selectedProduct) {
      setSelectedProductDetails({
        image: selectedProduct.product.images[0], // Fetch product image
        name: selectedProduct.product.name,
        price: selectedProduct.product.sale_price * selectedProduct.quantity,
        quantity: selectedProduct.quantity,
      });
    } else {
      setSelectedProductDetails(null);
    }
  };
  

  const fetchCart = async () => {
    try {
      const response = await getCartPageData();
      setCart(response?.cart);
      setCartTotal(response?.cartTotal);
    } catch (err) {
      console.error("Error fetching cart", err);
    }
  };

  const handleQuantityChange = async (change, quantity, productId) => {
    const newQuantity = quantity + change;
    if (newQuantity < 1) return;

    try {
      const response = await handleCartQuantityChange(productId, { quantity: newQuantity });

      if (response?.cart) {
        setCart(response.cart);
        setCartTotal(response.cartTotal);
      } else {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.product._id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      }


  

    } catch (err) {
      console.error("Error updating cart quantity", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await handleRemoveFromCart(productId, { userId: "67cab9e83d25f6b91d29d67b" });
      setCart(response?.cart);
      setCartTotal(response?.cartTotal);
      if (selectedProductId === productId) {
        setSelectedProductId(null);
      }
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  const handleProceedToCheckout = () => {
    if (!selectedProductId) {
      toast.error("Please select a product before proceeding to checkout.");
      return;
    }
    navigate(`/checkout/?product=${selectedProductId}`);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {cart?.map((item) => (
                <div
                  key={item._id}
                  className={`card mb-3 shadow-sm p-3 ${selectedProductId === item.product._id ? "border border-primary border-3" : ""}`}
                >
                  <div className="row g-0">
                    <div className="col-md-4 d-flex align-items-center">
                      <img src={item?.product?.images[0]} className="img-fluid rounded" alt={item?.product?.name} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{item?.product?.name}</h5>
                        <p className="card-text fw-bold text-danger">₹{item?.product?.sale_price}</p>
                        <div className="d-flex align-items-center mb-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleQuantityChange(-1, item?.quantity, item?.product?._id)}
                            disabled={item?.quantity === 1}
                          >
                            -
                          </button>
                          <span className="mx-3">{item?.quantity}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleQuantityChange(1, item?.quantity, item?.product?._id)}
                          >
                            +
                          </button>
                        </div>
                        <div className="d-flex justify-content-between mt-auto">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemove(item?.product?._id)}
                          >
                            Remove
                          </button>
                          <button
  className={`btn ${selectedProductId === item.product._id ? "btn-primary" : "btn-outline-primary"} btn-sm`}
  onClick={() => handleSelect(item.product._id)}
>
  {selectedProductId === item.product._id ? "Selected" : "Select"}
</button>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4">
            {/* <div className="card shadow-sm p-3">
  <h4 className="mb-3">Cart Summary</h4>
  <p className="fw-bold">
    {selectedProductId && `Total: ₹${selectedProductPrice}`}
  </p>
  <button className="btn btn-success w-100" onClick={handleProceedToCheckout}>
    Proceed to Checkout
  </button>
</div> */}

<div className="card shadow-sm p-3">
  <h4 className="mb-3">Cart Summary</h4>

  {selectedProductDetails ? (
    <div className="d-flex align-items-center">
      <img 
        src={selectedProductDetails.image} 
        alt={selectedProductDetails.name} 
        className="rounded" 
        style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "10px" }}
      />
      <div>
        <p className="fw-bold">Product: {selectedProductDetails.name}</p>
        <p className="fw-bold">Quantity: {selectedProductDetails.quantity}</p>
        <p className="fw-bold">Total: ₹{selectedProductDetails.price}</p>
      </div>
    </div>
  ) : (
    <p className="fw-bold">Please select a product</p>
  )}

  <button className="btn btn-success w-100 mt-3" onClick={handleProceedToCheckout}>
    Proceed to Checkout
  </button>
</div>



            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;







// import React, { useState, useEffect } from "react";
// // import Footer from "../components/Footer";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import UserService from "../../services/user-api-service/UserService";
// import { useNavigate } from "react-router-dom";



// const Cart = () => {
//   const { getCartPageData, handleRemoveFromCart, handleCartQuantityChange } = UserService()
//   const [cart, setCart] = useState([]);
//   const [cartTotal, setCartTotal] = useState(0);
//   const navigate = useNavigate();


//   useEffect(() => {

//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const response = await getCartPageData();
//       console.log(response, "response from cart")
//       setCart(response?.cart);
//       setCartTotal(response?.cartTotal)

//     } catch (err) {
//       // setError(err.response?.data?.message || "Something went wrong");
//     }
//   };


 

//   // const getTotal = () => {
//   //   return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   // };

//   const handleQuantityChange = async (change, quantity, productId) => {
//     const newQuantity = quantity + change;
  
//     if (newQuantity < 1) return; // Prevent quantity from going below 1
  
//     try {
//       const data = { quantity: newQuantity };
//       // Ensure `userId` is retrieved properly if required by API
//       const response = await handleCartQuantityChange(productId, data);
  
//       if (response?.cart) {
//         setCart(response.cart);
//         setCartTotal(response.cartTotal);
//       } else {
//         // Manually update state if API does not return the updated cart
//         setCart((prevCart) =>
//           prevCart.map((item) =>
//             item.product._id === productId ? { ...item, quantity: newQuantity } : item
//           )
//         );
//       }
  
//     } catch (err) {
//       console.error("Error updating cart quantity", err);
//     }
//   };
  

//   const handleRemove = async (productId) => {
//     try {
//       console.log("handleRemove");
//       console.log(productId);

//       const data = { userId: '67cab9e83d25f6b91d29d67b' }

//       const response = await handleRemoveFromCart(productId, data);
//       console.log(response.cart, "===response handleRemove");
//       //     if (response.status === 200) {
//       //       // Update the cart in state after successful deletion
//       //       // setCartItems(cartItems.filter(item => item.product !== productId));
//       //       location.reload();
//       //     }
//       setCart(response?.cart);
//       setCartTotal(response?.cartTotal)

//     } catch (err) {
//       // setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Shopping Cart</h1>
//       {cart.length === 0 ? (
//         <p className="text-center">Your cart is empty.</p>
//       ) : (
//         <div className="row">
//           <div className="col-lg-8">
//             {cart?.map((item) => (
//               <div key={item._id} className="card mb-3 shadow-sm p-3">
//                 <div className="row g-0">
//                   <div className="col-md-4 d-flex align-items-center">
//                     <img
//                       src={item?.product?.images[0]}
//                       className="img-fluid rounded"
//                       alt={item?.product?.name}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="card-body">
//                       <h5 className="card-title">{item?.product?.name}</h5>
//                       <p className="card-text fw-bold text-danger">
//                         ₹{item?.product?.sale_price}
//                       </p>
//                       <div className="d-flex align-items-center mb-2">
//                         <button
//                           className="btn btn-outline-secondary btn-sm"
//                           onClick={() => handleQuantityChange(-1, item?.quantity, item?.product?._id)}
//                           disabled={item?.quantity === 1}
//                         >
//                           -
//                         </button>
//                         <span className="mx-3">{item?.quantity}</span>
//                         <button
//                           className="btn btn-outline-secondary btn-sm"
//                           onClick={() => handleQuantityChange(1, item?.quantity, item?.product?._id)}
//                         >
//                           +
//                         </button>
//                       </div>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleRemove(item?.product?._id)}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="col-lg-4">
//             <div className="card shadow-sm p-3">
//               <h4 className="mb-3">Cart Summary</h4>
//               <p className="fw-bold">Total: ₹{cartTotal}</p>
//               <button className="btn btn-success w-100" onClick={() => navigate("/checkout")}>
//       Proceed to Checkout
//     </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default Cart;





