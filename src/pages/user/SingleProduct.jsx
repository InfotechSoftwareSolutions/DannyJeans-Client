import React, { useState, useEffect, useRef  } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UserService from "../../services/user-api-service/UserService";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";



const SingleProduct = () => {
    const { getSingleProduct, addToCart, addToWihlist } = UserService();
    const {navigate} = useNavigate();
     const { auth } = useAuth();

    const [searchParams] = useSearchParams();
    const [product, setProduct] = useState({});
  // const { id } = useParams();
const id = searchParams.get('id');

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false; // cleanup when unmounted
    };
  }, []);


  useEffect(() => {
    getProduct();
  }, []);

console.log("id", id);
  const getProduct = async () => {
    try {
      console.log("Fetching product with ID:");
      const response = await getSingleProduct(id);
      const product = response?.product;
      console.log("Product data:", product);

      if (product) {
        setProduct(product);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };


  const handleAddToCart = async (productId, quantity) => {
    try {
      if (auth?.name) {
        const data = { productId, quantity };
        const response = await addToCart(data);
        response?.success ? toast.success(response.message) : toast.error(response.message);
      } else {
                console.log("not logged in");
        if (isMounted.current) {
          window.location.href = "/login";
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const handleAddToWishlist = async (productId, quantity) => {
    try {
      if (auth?.name) {
        const data = { productId, quantity };
        const response = await addToWihlist(data);
        response?.success ? toast.success(response.message) : toast.error(response.message);
      } else {
              console.log("not logged in");
        if (isMounted.current) {
          window.location.href = "/login";
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };
 

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product?.images?.[0]} alt={product?.name} style={{height: "600px"}} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product?.name}</h2>
          <p className="text-muted">{product?.description}</p>
          <h4>
            Price: ₹{product?.sale_price
} <del>₹{product?.product_price}</del>
          </h4>
         
          {/* <p>Sizes Available: {product?.sizes.join(", ")}</p> */}
          {/* <p>Length: {product?.length}</p> */}
          <button className="btn btn-dark" onClick={handleAddToCart}>Add to Cart</button>
          <button className="btn btn-danger ms-3" onClick={handleAddToWishlist}>Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
