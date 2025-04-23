import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  
} from "react-icons/fa";
import { Link } from "react-router-dom";

const UserFooter = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row gy-4 text-center text-md-start align-items-start">
          {/* Logo + Description */}
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center align-items-md-start">
              <img
                src="/logo.jpg"
                alt="Danny Jean Logo"
                style={{ maxWidth: "160px" }}
                className="mb-3"
              />
              <p className="small text-light px-3 px-md-0">
                Welcome to Danny Fashions, where contemporary fashion meets
                effortless comfort! We’re an international clothing brand
                dedicated to delivering high-quality, trend-forward t-shirts and
                jeans for men and women who value style without compromise.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/new-arrival"
                  className="text-light text-decoration-none"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/men" className="text-light text-decoration-none">
                  Men's Collection
                </Link>
              </li> */}
              <li>
                <Link
                  to="/aboutus"
                  className="text-light text-decoration-none"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-2">
            <h6 className="fw-bold">Customer Service</h6>
            <ul className="list-unstyled small">
              <li>
                <Link
                  to="/terms-conditions"
                  className="text-light text-decoration-none"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/return-policy"
                  className="text-light text-decoration-none"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-light text-decoration-none"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          {/* Contact Us */}
          <div className="col-md-2">
            <h6 className="fw-bold">Contact Us</h6>
            <ul className="list-unstyled small">
              <li className="d-flex align-items-center gap-2 mt-2">
                <span className="text-danger">
                  <i className="bi bi-telephone-fill"></i>
                </span>
                <a
                  href="tel:+11234567890"
                  className="text-light text-decoration-none"
                >
                  +91 73063 15705
                </a>
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="text-light">
                  <i className="bi bi-envelope-fill"></i>
                </span>
                <a
                  href="mailto:support@dannyfashions.com"
                  className="text-light text-decoration-none"
                >
                  fashionsdanny@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="col-md-2">
            <h6 className="fw-bold">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2">
              <a href="https://www.facebook.com/dannyfashionsofficial/" className="text-light fs-5">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/dannyfashionofficial?igsh=MTlqYnQ1cDB2ZWN3aQ==" className="text-light fs-5">
                <FaInstagram />
              </a>
              <a href="https://youtube.com/@dannyfashions?si=VoWT5w_rRAB0lLcs" className="text-light fs-5">
              <FaYoutube />
              </a>
              
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-light mt-4" />

        {/* Copyright */}
        <p className="text-center mb-0 small">
          &copy; {new Date().getFullYear()} Danny Fashions. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default UserFooter;
