import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const UserFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
    <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-5 gap-8">

      {/* Brand Section */}
      <div>
        <h2 className="text-2xl font-semibold">Cloud kitchen</h2>
      </div>

      {/* Support Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Support</h3>
        <p className="text-gray-400">Address</p>
        <p className="text-gray-400">email@gmail.com</p>
      </div>

      {/* Account Links */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Account</h3>
        <ul className="text-gray-400 space-y-2">
          <li>My Account</li>
          <li>Login / Register</li>
          <li>Cart</li>
          <li>Wishlist</li>
          <li>Shop</li>
        </ul>
      </div>

      {/* Quick Links & App Download */}
      <div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        
      </div>
      <div>
          <h3 className="text-lg font-semibold mt-5">Download App</h3>
          <p className="text-gray-400 text-sm">Save $3 with App New User Only</p>
          <div className="flex items-center mt-3">
            <img
              src="https://via.placeholder.com/80x80"
              alt="QR Code"
              className="w-16 h-16"
            />
            <div className="ml-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10 mb-1"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png"
                alt="App Store"
                className="h-10"
              />
            </div>
          </div>
          {/* Social Media Links */}
    <div className="flex justify-center space-x-6 mt-6">
      <FaFacebookF className="text-white hover:text-gray-400 cursor-pointer text-xl" />
      <FaTwitter className="text-white hover:text-gray-400 cursor-pointer text-xl" />
      <FaInstagram className="text-white hover:text-gray-400 cursor-pointer text-xl" />
      <FaLinkedinIn className="text-white hover:text-gray-400 cursor-pointer text-xl" />
    </div>
        </div>

    </div>

    

    {/* Copyright */}
    <div className="text-center text-gray-500 text-sm mt-6">
      © Copyright Brand 2025. All rights reserved.
    </div>
  </footer>

  )
}

export default UserFooter