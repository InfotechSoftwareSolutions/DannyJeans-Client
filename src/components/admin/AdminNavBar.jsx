// import React, { useState } from "react";
// import { FaBars, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
// import { MdDashboard, MdCategory, MdSettings, MdStore, MdPeople } from "react-icons/md";
// import { IoGlobeOutline } from "react-icons/io5";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isCatalogOpen, setIsCatalogOpen] = useState(false);

//   return (
//     <div className={`h-screen bg-white shadow-md ${isOpen ? "w-64" : "w-16"} transition-all duration-300 p-4 relative`}>
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="absolute -right-5 top-6 bg-green-600 text-white p-2 rounded-full shadow-md"
//       >
//         <FaBars />
//       </button>

//       {/* Logo */}
//       <div className="flex items-center gap-2 mb-6">
//         <span className="text-green-600 text-xl font-bold">{isOpen && "Dashtar"}</span>
//       </div>

//       {/* Menu Items */}
//       <ul>
//         <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
//           <MdDashboard size={20} />
//           {isOpen && <span>Dashboard</span>}
//         </li>
        
//         {/* Collapsible Catalog */}
//         <li className="flex flex-col">
//           <div
//             className="flex items-center justify-between p-3 hover:bg-gray-200 rounded cursor-pointer"
//             onClick={() => setIsCatalogOpen(!isCatalogOpen)}
//           >
//             <div className="flex items-center gap-2">
//               <MdCategory size={20} />
//               {isOpen && <span>Catalog</span>}
//             </div>
//             {isOpen && <FaChevronDown className={`transition-transform ${isCatalogOpen ? "rotate-180" : ""}`} />}
//           </div>
//           {isCatalogOpen && isOpen && (
//             <ul className="pl-6">
//               <Link to="/"><li className="p-2 text-gray-700 hover:text-black">Products</li></Link>
//               <Link to="/category"><li className="p-2 text-gray-700 hover:text-black">Categories</li></Link>     
//               <li className="p-2 text-gray-700 hover:text-black">Attributes</li>
//               <li className="p-2 text-gray-700 hover:text-black">Coupons</li>
//             </ul>
//           )}
//         </li>
        
//         <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
//           <MdPeople size={20} />
//           {isOpen && <span>Customers</span>}
//         </li>
//         <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
//           <AiOutlineShoppingCart size={20} />
//           {isOpen && <span>Orders</span>}
//         </li>
//         <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
//           <MdSettings size={20} />
//           {isOpen && <span>Settings</span>}
//         </li>
//         <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
//           <IoGlobeOutline size={20} />
//           {isOpen && <span>International</span>}
//         </li>
//         <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
//           <MdStore size={20} />
//           {isOpen && <span>Online Store</span>}
//         </li>
//       </ul>

//       {/* Logout Button */}
//       <div className="absolute bottom-4 left-4 flex items-center gap-2 p-3 bg-green-600 text-white rounded cursor-pointer w-full">
//         <FaSignOutAlt size={20} />
//         {isOpen && <span>Log Out</span>}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { FaBars, FaSignOutAlt, FaChevronDown, FaTimes } from "react-icons/fa";
import { MdDashboard, MdCategory, MdSettings, MdStore, MdPeople } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import { BiSolidCoupon } from "react-icons/bi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const onHandleLogout = async () => {
    // Clear local storage
    localStorage.clear();

    // Optional: redirect to login page or homepage
    window.location.href = "/"; // Change the path based on your route
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 bg-green-600 text-white p-3 rounded-full shadow-lg z-50"
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 md:w-64 md:translate-x-0 md:relative md:h-screen`}
      >
        {/* Close Button on Mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="text-gray-600">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 p-4">
          <span className="text-green-600 text-xl font-bold">Dashtar</span>
        </div>

        {/* Menu Items */}
        <ul className="space-y-2">
        <Link to="/dashboard" className="no-underline text-inherit">
          <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
            <MdDashboard size={20} />
            <span>Dashboard</span>
          </li>
          </Link>
          {/* Collapsible Catalog */}
          {/* <li className="flex flex-col">
            <div
              className="flex items-center justify-between p-3 hover:bg-gray-200 rounded cursor-pointer"
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
            >
              <div className="flex items-center gap-2">
                <MdCategory size={20} />
                <span>Catalog</span>
              </div>
              <FaChevronDown className={`transition-transform ${isCatalogOpen ? "rotate-180" : ""}`} />
            </div>
            {isCatalogOpen && (
              <ul className="pl-6">
                <Link to="/product-table" className="no-underline text-inherit"><li className="p-2 text-gray-700 hover:text-black">Products</li></Link>
                <Link to="/category" className="no-underline text-inherit"><li className="p-2 text-gray-700 hover:text-black">Categories</li></Link>
                <Link to="/offers" className="no-underline text-inherit"><li className="p-2 text-gray-700 hover:text-black">Offers</li></Link>
                <Link to="/Coupons" className="no-underline text-inherit"><li className="p-2 text-gray-700 hover:text-black">Coupons</li></Link>
              </ul>
            )}
          </li> */}

          <Link to="/product-table" className="no-underline text-inherit">
  <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
    {/* <MdPeople size={20} /> */}
    <AiFillProduct size={20} />
    <span>Products</span>
  </li>
</Link>


<Link to="/category" className="no-underline text-inherit">
  <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
  <MdCategory size={20} />
    <span>Categories</span>
  </li>
</Link>


<Link to="/offers" className="no-underline text-inherit">
  <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
  <MdLocalOffer   size={20} />
    <span>Offers</span>
  </li>
</Link>

<Link to="/coupon" className="no-underline text-inherit">
  <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
  <BiSolidCoupon  size={20} />
    <span>Coupons</span>
  </li>
</Link>





          <Link to="/user" className="no-underline text-inherit">
  <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
    <MdPeople size={20} />
    <span>Customers</span>
  </li>
</Link>

<Link to="/order-admin" className="no-underline text-inherit">
<li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer"> 
  <AiOutlineShoppingCart size={20} />
  <span>Orders</span>
  </li>
</Link>

          {/* <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
            <MdSettings size={20} />
            <span>Settings</span>
          </li>
          <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
            <IoGlobeOutline size={20} />
            <span>International</span>
          </li>
          <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded cursor-pointer">
            <MdStore size={20} />
            <span>Online Store</span>
          </li> */}
        </ul>

        {/* Logout Button */}
        <div onClick={onHandleLogout} className="absolute bottom-4 left-4 flex items-center gap-2 p-3 bg-green-600 text-white rounded cursor-pointer w-[90%]">
          <FaSignOutAlt size={20} />
          <span>Log Out</span>
        </div>
      </div>

      {/* Overlay for Mobile View */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
