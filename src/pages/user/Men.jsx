import React, { useState } from "react";
// import Footer from "../components/Footer";
// import { products } from "../Data/mensData";
// import Img from "../components/Img";
import { Link } from "react-router-dom"; // Don't forget to import Link

const Men = () => {

  const [products, setProducts] = useState([]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Men's Collection</h1>
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card h-100 text-center shadow-sm">
              <Img
                src={product.image}
                className={"card-img-top"}
                alt={product.name}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  <span className="fw-bold text-danger me-2">
                    ₹{product.newPrice}
                  </span>
                  <span className="text-decoration-line-through text-muted">
                    ₹{product.oldPrice}
                  </span>
                </p>
                <span className="badge bg-danger rounded-pill p-2">
                  {product.discount}% OFF
                </span>
              </div>
              <div className="card-footer d-flex justify-content">
                <Link
                  to={`/product/${products.id}`}
                  className="btn btn-outline-primary w-50"
                >
                  View
                </Link>
                <button className="btn btn-danger w-50 ms-3">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Men;
