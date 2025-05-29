import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import UserService from "../../services/user-api-service/UserService";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const [addresses, setAddresses] = useState([
    // { id: 1, label: "Home", details: "123 Main Street, Mumbai, India" },
    // { id: 2, label: "Work", details: "456 Office Tower, Delhi, India" },
  ]);

  const [newAddress, setNewAddress] = useState({
    label: "",
    details: "",
  });

  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({});
  const { getUserDetail, changeDetail } = UserService();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const { getAllAddress } = UserService();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUser();
    getAddress();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getUserDetail();
      console.log(response.user, "datas");
      setProfile(response.user);
      setTempProfile(response.user);
    } catch (error) {}
  };
  console.log(profile, "==profile");

  // Handle profile changes
  const handleInputChange = (e) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await changeDetail(tempProfile);

      console.log(response.user, "datas");
      setProfile(response.user);
      setTempProfile(response.user);
      setEditing(false);
    } catch (error) {}
  };

  // Handle address changes
  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const addAddress = () => {
    if (newAddress.label && newAddress.details) {
      setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
      setNewAddress({ label: "", details: "" });
    }
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  //select address section
  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);

    // Filter the selected address from savedAddresses
    const address = savedAddresses.find((addr) => addr._id === addressId);
    console.log(address, "setSelectedAddress");
    setOrderData((prevState) => ({
      ...prevState, // Spread previous state
      shippingAddress: address,
    }));

    // setCheckoutDetails({
    //   ...checkoutDetails,
    //   fullName: address.name,
    //   address: address.address,
    //   city: address.city,
    //   zipCode: address.zipCode,
    // });
  };

  const getAddress = async () => {
    try {
      const response = await getAllAddress();
      setSavedAddresses(response?.address);
    } catch (err) {
      // setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3">
          <div className="card border-0 shadow-lg p-3 text-center">
            <img
              src={profile?.image}
              alt="Profile"
              className="rounded-circle border border-3 shadow-sm mx-auto"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h4 className="mt-3">{profile.name}</h4>
            <p className="text-muted">{profile.email}</p>
            <hr />
            <nav className="nav flex-column">
              <Link to="/productlisting" className="nav-link text-dark fw-bold">
                🛍️ My Orders{" "}
              </Link>
              {/* <a href="#" className="nav-link text-dark fw-bold">❤️ Wishlist</a>
              <a href="#" className="nav-link text-dark fw-bold">📦 Addresses</a>
              <a href="#" className="nav-link text-dark fw-bold">⚙️ Settings</a> */}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          <div className="card border-0 shadow-lg p-4">
            <h3 className="fw-bold">👤 Profile Information</h3>
            <hr />

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="fw-bold text-muted">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={tempProfile.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="border-bottom py-1">{profile.name}</p>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="fw-bold text-muted">Email</label>
                {editing ? (
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={tempProfile.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="border-bottom py-1">{profile.email}</p>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="fw-bold text-muted">Phone</label>
                {editing ? (
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={tempProfile.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="border-bottom py-1">{profile.phone}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            {/* <div className="text-end">
              {editing ? (
                <button
                  className="btn btn-success px-4 mx-2"
                  onClick={handleSave}
                >
                  ✅ Save
                </button>
              ) : (
                <button
                  className="btn btn-warning px-4 mx-2"
                  onClick={() => setEditing(true)}
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div> */}
          </div>

          <div>
            {/* Saved Addresses Section */}
            <h4 className="border-b pb-2 mt-4 text-gray-800">Address</h4>
            {savedAddresses.length === 0 ? (
              <p className="text-gray-500">No saved addresses.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {savedAddresses.map((address) => {
                  const isSelected = selectedAddress === address._id;
                  return (
                    <div
                      key={address._id}
                      className={`p-4 rounded-lg  ${
                        isSelected
                          ? "border-2 border-green-500"
                          : "border border-gray-300"
                      } bg-purple-100 cursor-pointer`}
                      onClick={() => handleAddressSelect(address._id)}
                    >
                      <div className="d-flex items-center ">
                        <p className="font-semibold  pt-3 me-3">Name:</p>
                        <input
                          type="text"
                          name="fullName"
                          readOnly
                          className="w-full  p-2 rounded border border-gray-300"
                          value={address.fullName}
                        />
                      </div>
                      <div className="d-flex items-center">
                        <p className="font-semibold  pt-3 me-3">Address:</p>
                        <input
                          type="text"
                          name="address"
                          readOnly
                          className="w-full  p-2 rounded border border-gray-300"
                          value={address.address}
                        />
                      </div>
                      <div className="d-flex items-center">
                        <p className="font-semibold pt-3 me-3">Phone:</p>
                        <input
                          type="text"
                          name="phone"
                          readOnly
                          className="w-full  p-2 rounded border border-gray-300"
                          value={address.phone}
                        />
                      </div>
                      <div className="d-flex items-center">
                        <p className="font-semibold pt-3 me-3">Street:</p>
                        <input
                          type="text"
                          name="street"
                          readOnly
                          className="w-full  p-2 rounded border border-gray-300"
                          value={address.street}
                        />
                      </div>
                      <div className="d-flex items-center">
                        <p className="font-semibold pt-3 me-3">City:</p>
                        <input
                          type="text"
                          name="city"
                          readOnly
                          className="w-full  p-2 rounded border border-gray-300"
                          value={address.city}
                        />
                      </div>
                      <div className="d-flex items-center">
                        <p className="font-semibold pt-3 me-3">State:</p>
                        <input
                          type="text"
                          name="state"
                          readOnly
                          className="w-full  p-2 rounded border border-gray-300"
                          value={address.state}
                        />
                      </div>
                      <div className="d-flex items-center">
                        <p className="font-semibold pt-3 me-3">Country:</p>
                        <input
                          type="text"
                          name="country"
                          readOnly
                          className="w-full  p-2 rounded border border-gray-300"
                          value={address.country}
                        />
                      </div>
                      <div className="d-flex items-center">
                        <p className="font-semibold pt-3 me-3">Zip:</p>
                        <input
                          type="text"
                          name="zip"
                          readOnly
                          className="w-full  p-2 rounded border border-gray-300"
                          value={address.zip}
                        />
                      </div>
                      <div className="flex justify-center mt-4">
                        <button
                          className={`px-4 py-2 rounded text-white ${
                            isSelected
                              ? "bg-green-500"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Address Section */}
          <div className="card border-0 shadow-lg p-4 mt-4">
            <h3 className="fw-bold">📍 Saved Addresses</h3>
            <hr />

            {/* Displaying addresses */}
            <div className="row">
              {addresses.map((address) => (
                <div key={address.id} className="col-md-6 mb-3">
                  <div className="card shadow-sm p-3">
                    <h5 className="fw-bold">{address.label}</h5>
                    <p className="text-muted">{address.details}</p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeAddress(address.id)}
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Address */}
            <h5 className="mt-4">➕ Add New Address</h5>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  name="label"
                  className="form-control"
                  placeholder="Label (Home, Work, etc.)"
                  value={newAddress.label}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="details"
                  className="form-control"
                  placeholder="Full Address"
                  value={newAddress.details}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary w-100" onClick={addAddress}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
