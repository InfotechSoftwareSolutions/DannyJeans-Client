import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { FaSearch, FaBars } from "react-icons/fa";
import { FaSearch, FaBars, FaShoppingCart, FaUser } from "react-icons/fa";

const UserNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Cloud Kitchen</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-gray-400 cursor-pointer">Single Menu</li>
          <li className="hover:text-gray-400 cursor-pointer">Weekly Menu</li>
          <li className="hover:text-gray-400 cursor-pointer">FAQs</li>
          <li className="hover:text-gray-400 cursor-pointer">About Us</li>
          <li className="hover:text-gray-400 cursor-pointer">Contact Us</li>
        </ul>

        {/* Right Section: Search, Cart & User */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search */}
          <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-md">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-white placeholder-gray-400"
            />
            <FaSearch />
          </div>

          {/* Cart Icon with White Background */}
          <div className="bg-white p-2 rounded-full">
            <FaShoppingCart className="text-gray-900 text-xl cursor-pointer" />
          </div>

          {/* User Icon with White Background */}
          <div className="bg-white p-2 rounded-full">
            <FaUser className="text-gray-900 text-xl cursor-pointer" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gray-800 text-white p-4 space-y-2 text-center">
          <li className="hover:text-gray-400 cursor-pointer">Single Menu</li>
          <li className="hover:text-gray-400 cursor-pointer">Weekly Menu</li>
          <li className="hover:text-gray-400 cursor-pointer">FAQs</li>
          <li className="hover:text-gray-400 cursor-pointer">About Us</li>
          <li className="hover:text-gray-400 cursor-pointer">Contact Us</li>
          <div className="flex justify-center space-x-6 mt-3">
            {/* Cart & User Icons for Mobile */}
            <div className="bg-white p-2 rounded-full">
              <FaShoppingCart className="text-gray-900 text-xl cursor-pointer" />
            </div>
            <div className="bg-white p-2 rounded-full">
              <FaUser className="text-gray-900 text-xl cursor-pointer" />
            </div>
          </div>
        </ul>
      )}
    </nav>
  )
}

export default UserNavBar



