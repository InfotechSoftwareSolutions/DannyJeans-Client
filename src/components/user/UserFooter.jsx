import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';

const UserFooter = () => {
   
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4">
            <h5>Danny Jean</h5>
            <p>Elevate your denim style with premium quality jeans.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/new-arrival" className="text-light text-decoration-none">New Arrivals</Link></li>
              <li><Link to="/men" className="text-light text-decoration-none">Men's Collection</Link></li>
              <li><Link to="/about-us" className="text-light text-decoration-none">About Us</Link></li>
              <li><Link to="/sale" className="text-light text-decoration-none">Sale</Link></li>

            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="#" className="text-light mx-2"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-light mx-2"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-light mx-2"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-light mx-2"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>

        <hr className="bg-light" />

        {/* Copyright */}
        <p className="mb-0">&copy; {new Date().getFullYear()} Danny Jean. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default UserFooter