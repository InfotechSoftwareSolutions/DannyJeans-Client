import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryContext";

const UserNavBar = () => {
  const { filterProducts } = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(window.innerWidth >= 768); // Default true if above md
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo.png"
            alt="Danny Jean Logo"
            style={{ height: "50px" }}
          />
        </Link>

        {/* Toggle Button */}
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Collapse */}
        <div
          className={`navbar-collapse ${isNavOpen ? "show" : "collapse"}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center w-100 fw-bold text-uppercase">
            <li className="nav-item">
              <Link className="nav-link text-danger" to="/sale">
                Sale
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={() => handleScrollToStyleSection("style-section")}
              >
                New Arrival
              </Link>
            </li>

            {/* Men Dropdown */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
              >
                MEN
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => fetchCategories()}
                  >
                    All
                  </button>
                </li>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category._id}>
                      <button
                        className="dropdown-item"
                        onClick={() => filterProducts(category._id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item text-muted">No Categories</li>
                )}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">
                About Us
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex w-50" role="search">
            <input
              className="form-control me-2 w-75"
              type="search"
              placeholder="Tell us what you are looking for"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          {/* Icons */}
          <div className="d-flex align-items-center ms-3">
            <Link to="/wishlist" className="mx-3 icon-link">
              <i className="far fa-heart"></i>
            </Link>
            <Link to="/cart" className="mx-3 icon-link">
              <i className="fas fa-shopping-bag"></i>
            </Link>
            <Link to="/login" className="mx-3 icon-link">
              <i className="fas fa-sign-in-alt"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;
