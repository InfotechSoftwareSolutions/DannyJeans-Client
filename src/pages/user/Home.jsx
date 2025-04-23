import React, { useContext, useEffect, useState, useRef } from "react";
// import Footer from "../components/Footer";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { products } from "../Data/homeData";
import axios from "axios";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserService from "../../services/user-api-service/UserService";
import toast, { Toaster } from 'react-hot-toast';
import UserNavBar from "../../components/user/UserNavBar";
// import { CategoryContext } from "../../contexts/CategoryContext";




const App = () => {
  const { addToCart,addToWihlist,getHomePageData,getTrendingProducts,
    getTodaysOffer} = UserService()
  // const {products,setProducts,} = useContext(CategoryContext);

  const scrollRef = useRef(null);



const [products, setProducts] = useState([]);
const [error,setError] = useState()
const [loading, setLoading] = useState()
const [newArrival, setNewArrival] = useState([]);
const [subFilter, setSubFilter] = useState([]);
const [subFilterHeading, setSubFilterHeading] = useState("New Arrivals");
  

  useEffect(() => {
    getData();
  }, []);

  const getData= async()=> {
    try {
      const response = await getHomePageData();
      console.log(response.products,"datas");
      setProducts(response.products);
      const newArr = response?.newArrivedProducts.slice(0, 5); // Removes the first 3 elements
      setSubFilter(newArr);

      setNewArrival(newArr);
      
    } catch (error) {
      
    }

  }
  console.log(products)


  // const scrollLeft = () => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  //   }
  // };

  // const scrollRight = () => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  //   }
  // };
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleAddToCart = async(productId )=> {
    try {  const userId = "67cab9e83d25f6b91d29d67b";
      const quantity = 1;
      const data = {userId,productId, quantity}
      const response = await addToCart(data);
      console.log(response);
      toast.success(response?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  

  }

  const handleAddToWishlist = async(productId)=> {
    try{
     
    const quantity = 1;
    const data = {productId, quantity}
    const response = await addToWihlist(data);
    console.log(response);
    toast.success(response?.message)
    }
    catch(error){
      toast.error(error?.response?.data?.message)
    }
  }


  const handleSubFilter = async (value) => {
    try {
      console.log("handleSubFilter");
      console.log(value, "subfilter value");
      
      
      if (value === "trending") {
        const response = await getTrendingProducts();
        console.log(response, "trending products");
        setSubFilterHeading("Top Trending Now")
        setSubFilter(response.products);
      }else if (value === "offers") {
        // Handle today's offers click    
      const response = await getTodaysOffer();
      console.log(response, "trending products");
      setSubFilterHeading("Today's Offers") 
      setSubFilter(response.products);

      }else if (value === "newArrivals") {
        // Handle new arrivals click  
      // console.log(response, "trending products");
      setSubFilterHeading("New Arrivals")
      
      setSubFilter(newArrival);
    }} catch (error) {
      console.error("Error fetching trending products:", error);
    }
  };




  return (
    <>
    {/* <UserNavBar/> */}
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/jabnn.webp" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="/jeannn.webp" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img
              src="/JEANS_website_b6bd4012-d04c-48df-963e-01b8cbdc9c65.webp"
              className="d-block w-100"
              alt="Slide 3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="text-center my-3" style={{ fontSize: "24px" }}>
        <strong>BRANDED JEANS at 799 | FREE SHIPPING | CASH ON DELIVERY</strong>
      </div>

      <div className="container mx-auto text-center my-5">
  {/* Desktop View */}
<div className="hidden md:flex justify-center gap-5">
  {/* Top Trending Now */}
  <div className="w-1/3 relative">
    <h4 className="text-xl font-bold mb-2 text-center">Top Trending Now</h4>
    <div className="relative group">
      <img
        src="/A1.jpg"
        alt="Top Trending"
        className="w-full h-[150px] object-cover rounded-lg"
      />
      <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold py-2 rounded-lg opacity-100 group-hover:opacity-100 transition-opacity" 
              onClick={()=> handleSubFilter("trending")}>
                Click Now
              </button>
    </div>
  </div>

  {/* Today's Offers */}
  <div className="w-1/3 relative">
    <h4 className="text-xl font-bold mb-2 text-center">Today's Offers</h4>
    <div className="relative group">
      <img
        src="/Carnew.webp"
        alt="Today's Offers"
        className="w-full h-[150px] object-cover rounded-lg"
      />
      <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold py-2 rounded-lg opacity-100 group-hover:opacity-100 transition-opacity"
      onClick={()=> handleSubFilter("offers")}>
        Click Now
      </button>
    </div>
  </div>

  {/* New Arrivals */}
  {/* <div className="w-1/3 relative">
    <h4 className="text-xl font-bold mb-2 text-center">New Arrivals</h4>
    <div className="relative group">
      <img
        src="/A2.jpg"
        alt="New Arrivals"
        className="w-full h-[150px] object-cover rounded-lg "
      />
      <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold py-2 rounded-lg opacity-100 group-hover:opacity-100 transition-opacity">
        Click Now
      </button>
    </div>
  </div>
</div> */}

 <div className="w-1/3 relative">
    <h4 className="text-xl font-bold mb-2 text-center">New Arrivals</h4>
    <div className="relative group">
      <img
        src="/A2.jpg"
        alt="New Arrivals"
        className="w-full h-[150px] object-cover rounded-lg "
      />
      <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold py-2 rounded-lg opacity-100 group-hover:opacity-100 transition-opacity"
      onClick={()=> handleSubFilter("newArrivals")}>
        Click Now
      </button>
    </div>
  </div>
</div>


      {/* Mobile View */}
      <div className="md:hidden flex justify-center gap-5">
        <div className="flex flex-col items-center">
          <img
            src="/A1.jpg"
            alt="Top Trending"
            className="w-16 h-16 object-cover rounded-full"
          />
          <span className="text-sm font-medium mt-2">Top Trending</span>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/Carnew.webp"
            alt="Today's Offers"
            className="w-16 h-16 object-cover rounded-full"
          />
          <span className="text-sm font-medium mt-2">Today's Offers</span>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/A2.jpg"
            alt="New Arrivals"
            className="w-16 h-16 object-cover rounded-full"
          />
          <span className="text-sm font-medium mt-2">New Arrivals</span>
        </div>
      </div>
    </div>


      
      <div className="text-center my-3" style={{ fontSize: "34px" }}>
        <strong>{subFilterHeading}</strong>
      </div>
      <div className="position-relative container">
      {/* Left Scroll Button */}
      <button
        className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
        onClick={scrollLeft}
        style={{ zIndex: 10 }}
      >
        &#10094;
      </button>

      {/* Scrollable Cards */}
      <div
        className="d-flex overflow-hidden"
        style={{ scrollBehavior: "smooth", gap: "20px" }}
        ref={scrollRef}
      >
        {subFilter.map((product, index) => (
          <div
            className="card position-relative flex-shrink-0"
            key={index}
            style={{ width: "100%", maxWidth: "300px" }}
          >
            <span
              className="position-absolute badge bg-danger text-white rounded-circle d-flex align-items-center justify-content-center shadow"
              style={{
                width: "50px",
                height: "50px",
                top: "15px",
                left: "15px",
                fontSize: "14px",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              }}
            >
              NEW!
            </span>
            <img src={product.images[0]} className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                <span className="fw-bold">₹{product.sale_price}</span>
                <span className="text-decoration-line-through text-muted ms-2">
                  ₹{product.product_price}
                </span>
              </p>
              <p className="card-text">
                <small className="text-body-secondary">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
        onClick={scrollRight}
        style={{ zIndex: 10 }}
      >
        &#10095;
      </button>
    </div>



      <div className="text-center my-3" style={{ fontSize: "34px" }}>
        <strong>OUR BEST PICKS</strong>
      </div>

      <div className="container text-center my-3">
  <div className="row justify-content-center">
    <div className="col-6 col-md-4">
      <img src="/HOME2.webp" alt="Blue Denim Jeans" className="img-fluid rounded" />
    </div>
    <div className="col-6 col-md-4">
      <img src="/HOME.webp" alt="Blue Denim Jeans" className="img-fluid rounded" />
    </div>
  </div>
</div>


      <div className="container mt-5">
        <div className="text-center my-3">
          <strong style={{ fontSize: "34px" }}>STYLE MEETS FUNCTION</strong>
        </div>
        <div className="row" id="products">
          {products.map((product, index) => (
            <div className="col-md-4 col-lg-3 mb-4" key={index}>
              <div className="card h-100 text-center shadow-sm">
                <img
                  src={product.images[0]}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "300px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    <span className="fw-bold text-danger me-2">
                      ₹{product.sale_price}
                    </span>
                    <span className="text-decoration-line-through text-muted">
                      ₹{product.product_price}
                    </span>
                  </p>
                  <span className="badge bg-danger rounded-pill p-2">
                    {product.discount}% OFF
                  </span>
                </div>
                <div className="card-footer d-flex justify-content">
                <button
        className="btn btn-outline-primary w-50"
        onClick={() => handleAddToCart(product._id)}
      > Cart
      </button>
                 
      <button
        className="btn btn-danger w-50 ms-3"
        onClick={() => handleAddToWishlist(product._id)}
      >
        Wishlist
      </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card text-bg-dark">
        <img src="/Jeancar.webp" className="card-img" alt="..." />
        <div className="card-img-overlay"></div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default App;





