import React from "react";
// import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">About Danny Jean</h1>
      <p className="text-muted text-center">
        Born in Kerala, Danny Jean is redefining denim fashion with creativity6
        and authenticity. As a pioneer, we consistently reinvent denim trends,
        offering confidence, uniqueness, and style.
      </p>

      <div className="row align-items-center my-5">
        <div className="col-md-6">
          <img
            src="/A1.jpg"
            alt="Store Locator"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>Store Locator</h2>
          <p>
            Find the perfect jeans that fit you like they were made for you.
          </p>
          <button className="btn btn-primary">Locate Your Store</button>
        </div>
      </div>

      <div className="row align-items-center my-5 flex-md-row-reverse">
        <div className="col-md-6">
          <img
            src="/A2.jpg"
            alt="Custom Studio"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>Custom Studio</h2>
          <p>
            Express yourself with custom denim pieces created by our in-store
            artists.
          </p>
          <Link to="/custom-studio">
            <button className="btn btn-danger">Start Customising</button>
          </Link>
        </div>
      </div>

      <div className="text-center mt-5">
        <h3>Our Location</h3>
        <p>We are proudly based in Kerala, India.</p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
