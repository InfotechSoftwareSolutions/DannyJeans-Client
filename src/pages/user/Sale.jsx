import React, {useState} from "react";
// import Footer from "../components/Footer";
// import { products } from "../Data/saleData";

const Sale = () => {

    const [products , setProducts] =  useState([]);
  return (
    <div>
      {/* Carousel */}
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/Carnew.webp" className="d-block w-100" alt="Slide 1" />
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

      {/* Trending Now Section */}
      <div className="text-center my-3" style={{ fontSize: "34px" }}>
        <strong>Trending Now</strong>
      </div>
      <div className="container my-4">
        <div className="row">
          <div className="col-3">
            <img src="/D1.webp" className="d-block w-100" alt="Sale 1" />
          </div>
          <div className="col-3">
            <img src="/D2.webp" className="d-block w-100" alt="Sale 2" />
          </div>
          <div className="col-3">
            <img src="/D3.webp" className="d-block w-100" alt="Sale 3" />
          </div>
          <div className="col-3">
            <img src="/D4.webp" className="d-block w-100" alt="Sale 4" />
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <div className="container mt-5">
        <h1 className="text-center mb-4">Check out our New Arrivals!</h1>
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-4 col-lg-3 mb-4" key={index}>
              <div className="card h-100 text-center shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
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
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-outline-primary w-50">Cart</button>
                  <button className="btn btn-danger w-50 ms-3">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sale;
