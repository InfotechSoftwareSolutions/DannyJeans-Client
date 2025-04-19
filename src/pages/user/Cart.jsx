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
  const { getCartPageData, handleRemoveFromCart, handleCartQuantityChange } =
    UserService();
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

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
      const response = await handleCartQuantityChange(productId, {
        quantity: newQuantity,
      });

      if (response?.cart) {
        setCart(response.cart);
        setCartTotal(response.cartTotal);
      } else {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error updating cart quantity", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await handleRemoveFromCart(productId, {
        userId: "67cab9e83d25f6b91d29d67b",
      });
      setCart(response?.cart);
      setCartTotal(response?.cartTotal);
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    navigate("/checkout");
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
                  className="card mb-3 shadow-sm p-3"
                >
                  <div className="row g-0">
                    <div className="col-md-4 d-flex align-items-center">
                      <img
                        src={item?.product?.images[0]}
                        className="img-fluid rounded"
                        alt={item?.product?.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{item?.product?.name}</h5>
                        <p className="card-text fw-bold text-danger">
                          ₹{item?.product?.sale_price}
                        </p>
                        <div className="d-flex align-items-center mb-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              handleQuantityChange(
                                -1,
                                item?.quantity,
                                item?.product?._id
                              )
                            }
                            disabled={item?.quantity === 1}
                          >
                            -
                          </button>
                          <span className="mx-3">{item?.quantity}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              handleQuantityChange(
                                1,
                                item?.quantity,
                                item?.product?._id
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="d-flex justify-content-end mt-auto">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemove(item?.product?._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4">
              <div className="card shadow-sm p-3">
                <h4 className="mb-3">Cart Summary</h4>
                <p className="fw-bold">Total: ₹{cartTotal}</p>
                <button
                  className="btn btn-success w-100"
                  onClick={handleProceedToCheckout}
                >
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
