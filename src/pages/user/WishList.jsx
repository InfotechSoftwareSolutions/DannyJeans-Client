import React, { useState, useEffect } from "react";
// import Footer from "../components/Footer";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../../services/user-api-service/UserService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';

const Wishlist = () => {
  const { getWishlistData, handleRemoveFromWishlist ,addToCart } = UserService()
  const [wishlist, setWishlist] = useState([]);

  // const removeFromWishlist = (index) => {
  //   const updatedWishlist = wishlist.filter((_, i) => i !== index);
  //   setWishlist(updatedWishlist);
  // };

  useEffect(() => {

    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {

      const response = await getWishlistData();
      console.log(response, "response from wishlist")
      setWishlist(response?.wishlist);

    } catch (err) {
      // setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleRemove = async (productId) => {
    try {

      const response = await handleRemoveFromWishlist(productId);
      console.log(response, "response from remove wishlist")
             if (response.success) {

               setWishlist(response?.wishlist)
          }

    } catch (err) {
      // setError(err.response?.data?.message || "Something went wrong");
    }
  };
  const handleAddToCart = async(productId)=> {
    try {
    const data = {productId, quantity:1}
    const response = await addToCart(data);
    console.log(response);
    toast.success(response?.message)
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }

  }

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mt-5">
        <h1 className="text-center mb-4">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-center">Your wishlist is empty.</p>
        ) : (
          <div className="row">
            {wishlist.map((item, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 text-center shadow-sm">
                  <img
                    src={item?.images[0]}
                    className="card-img-top"
                    alt={item?.product?.name}
                    style={{ height: "300px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text fw-bold text-danger">₹{item.sale_price}</p>
                   <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(item._id)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  
    </>
  );
};

export default Wishlist;
