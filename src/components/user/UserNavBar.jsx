import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryContext";
import UserService from "../../services/user-api-service/UserService"; // Adjust path if needed
import useAuth from "../../hooks/useAuth";



const UserNavBar = () => {
  const { filterProducts } = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(window.innerWidth >= 768); // Default true if above md
  const [searchTerm, setSearchTerm] = useState("");


  const { auth } = useAuth();
  const { getSearchResults } = UserService(); // Import the function from your service

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await getSearchResults(searchTerm);
      console.log("Search results:", results);
      // Optionally pass results to parent, or route to a results page
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const toggleNavbar = () => {
    if (window.innerWidth < 768) {
      setIsNavOpen(!isNavOpen);
    }
  };

  useEffect(() => {
    // Function to check screen width
    const handleResize = () => {
      setIsNavOpen(window.innerWidth >= 768);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/category");
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
    const onHandleLogout = async () => {
    // Clear local storage
    localStorage.clear();

    // Optional: redirect to login page or homepage
    window.location.href = "/"; // Change the path based on your route
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="Danny Jean Logo" style={{ height: "50px" }} />
        </Link>

        {/* Toggle Button */}
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Collapse */}
        <div className={`navbar-collapse ${isNavOpen ? "show" : "collapse"}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center w-100 fw-bold text-uppercase">
            
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            

            {/* Men Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button">
                Men
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={() => fetchCategories()}>
                    All
                  </button>
                </li>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category._id}>
                      <button className="dropdown-item" onClick={() => filterProducts(category._id)}>
                        {category.name}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item text-muted">No Categories</li>
                )}
              </ul>
            </li>

          </ul>

          {/* Search Bar */}
         
          <form className="d-flex w-50" role="search" onSubmit={handleSearch}>
  <input
    className="form-control me-2 w-75"
    type="search"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Tell us what you are looking for"
    aria-label="Search"
  />
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>


          {/* Icons */}
          <div className="d-flex align-items-center ms-3">
  <Link to="/wishlist" className="mx-3 icon-link" title="Wishlist">
    <i className="far fa-heart"></i>
  </Link>
  <Link to="/cart" className="mx-3 icon-link" title="Cart">
    <i className="fas fa-shopping-bag"></i>
  </Link>

  {auth?.name && (
  <Link to="/profile" className="mx-3 icon-link" title="Profile">
    <i className="fas fa-user-circle"></i>
  </Link>
  )}
     {auth?.name && (
  <Link onClick={onHandleLogout} className="mx-3 icon-link" title="Logout">
    <i className="fas fa-sign-in-alt"></i>
  </Link>
  )}
   {!auth?.name && (
  <Link to="/login" className="mx-3 icon-link" title="Login">
    
  <p className="text-sm mt-2">Login </p>
  </Link>
  )}
  {!auth?.name && (
  <Link to="/register" className="mx-3 icon-link" title="Logout">
  
  <p className="text-sm mt-2">Register</p>
  </Link>
  )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;
