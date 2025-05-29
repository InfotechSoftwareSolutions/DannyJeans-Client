import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../../services/user-api-service/UserService";
import { useSearchParams } from "react-router-dom";

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");

  const {
    postOrder,
    SaveAddress,
    getAllAddress,
    getSingleProductInCart,
    checkPorductAvailability,
    getCartPageData
  } = UserService();

  const [product, setProduct] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkoutDetails, setCheckoutDetails] = useState({
    quantity: 1,
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "COD",
  });

  const [orderData, setOrderData] = useState({
    orderItems: [],
    shippingAddress: {},
    totalPrice: "",
    paymentMethod: "Card",
  });

  useEffect(() => {
    // getData();
    getAddress();
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCartPageData();
      setCart(response?.cart);
      setCartTotal(response?.cartTotal);
    } catch (err) {
      console.error("Error fetching cart", err);
    }
  };

  // useEffect(() => {
  //   setOrderData((prevState) => ({
  //     ...prevState, // Spread previous state
  //     orderItems: product,
  //     shippingAddress: address,
  //     // totalPrice: total
  //   }));
  // }, [address]);

  const getData = async () => {
    try {
      console.log("getData checkout");
      const response = await getSingleProductInCart(productId);
      console.log(response.product, "response checkout");
      setProduct(response?.product);
      setOrderData((prevState) => ({
        ...prevState, // Spread previous state
        orderItems: response?.product,
      }));
    } catch (err) {
      // setError(err.response?.data?.message || "Something went wrong");
    }
  };

  //address section
  const getAddress = async () => {
    try {
      const response = await getAllAddress();
      setSavedAddresses(response?.address);
    } catch (err) {
      // setError(err.response?.data?.message || "Something went wrong");
    }
  };

  //select payment section
  const handleChangePayment = (value) => {
    setOrderData((prevState) => ({
      ...prevState, // Spread previous state
      paymentMethod: value,
    }));
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

  //save address section
  const handleSaveAddress = async () => {
    if (
      checkoutDetails.fullName &&
      checkoutDetails.address &&
      checkoutDetails.city &&
      checkoutDetails.zipCode
    ) {
      const newAddress = {
        id: savedAddresses.length + 1,
        name: checkoutDetails.fullName,
        address: checkoutDetails.address,
        city: checkoutDetails.city,
        zipCode: checkoutDetails.zipCode,
      };

      const response = await SaveAddress(checkoutDetails);

      const updatedAddresses = [...savedAddresses, newAddress];
      setSavedAddresses(updatedAddresses); // Update state
      // setSelectedAddress(newAddress);

      alert("Address saved successfully!");
    } else {
      alert("Please fill in all fields before saving.");
    }
  };

  //order section
  const handleOrderSubmit = async () => {
    try {
      // const response = await checkPorductAvailability();

      // if (response?.success) {

      const response = await postOrder(orderData);

      if (response?.success && response?.paymentMethod !== "COD") {
        console.log("inside");
        handlePayment(response?.razorpayOrder);
      }
      // }
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };

  //payment section
  const handlePayment = async (data) => {
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert(
          "Failed to load Razorpay SDK. Please check your internet connection."
        );
        return;
      }

      // Initialize Razorpay
      const options = {
        key: "rzp_test_zVBhrL4CVfIezv", // Replace with Razorpay Key ID
        amount: data.amount,
        currency: "INR",
        name: "Your E-commerce",
        description: "Purchase Description",
        order_id: data.id,
        handler: function (response) {
          console.log("Payment Success:", response);
          alert("Payment Successful!");
          // Call backend to verify payment (optional)
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  //payment section
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutDetails({ ...checkoutDetails, [name]: value });

    // Validation for Full Name
    if (name === "fullName") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullName: "Full Name is required.",
        }));
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullName: "Only alphabets and spaces are allowed.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, fullName: "" }));
      }
    }

    // Validation for Address
    if (name === "address") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "Address is required.",
        }));
      } else if (value.length < 5) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "Address must be at least 5 characters long.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
      }
    }

    // Validation for Phone Number
    if (name === "phone") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Phone number is required.",
        }));
      } else if (!/^\d{10}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Phone number must be exactly 10 digits.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
      }
    }

    // Validation for Street
    if (name === "street") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          street: "Street is required.",
        }));
      } else if (value.length < 3) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          street: "Street must be at least 3 characters long.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, street: "" }));
      }
    }

    // Validation for City
    if (name === "city") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          city: "City is required.",
        }));
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          city: "Only alphabets and spaces are allowed.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, city: "" }));
      }
    }

    // Validation for State
    if (name === "state") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          state: "State is required.",
        }));
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          state: "Only alphabets and spaces are allowed.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, state: "" }));
      }
    }

    // Validation for Country
    if (name === "country") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          country: "Country is required.",
        }));
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          country: "Only alphabets and spaces are allowed.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, country: "" }));
      }
    }

    // Validation for Zip Code
    if (name === "zipCode") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          zipCode: "Zip Code is required.",
        }));
      } else if (!/^\d{5,6}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          zipCode: "Zip Code must be 5 or 6 digits.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, zipCode: "" }));
      }
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4 text-primary"> Checkout</h2>

      <div className="row g-4">
        {/* Order Summary */}
        <div className="col-md-5">
          <div
            className="card border-0 shadow-lg rounded-4"
            style={{ background: "#f8f9fa" }}
          >
            <div className="card-body">
            <h4 className="border-bottom pb-2 text-dark">Order Summary</h4>

{cart?.map((product, index) => (
  <div className="d-flex align-items-center mb-3" key={index}>
    <div className="ms-3">
      <h5 className="fw-bold">{product?.product?.name}</h5>
      <p className="text-muted small">
        Price: ₹{product?.product?.sale_price}
      </p>
      <p className="text-muted small">
        Quantity: {product?.quantity}
      </p>
    </div>
  </div>
))}

<div className="text-danger fs-5 fw-bold mt-3">
  Total: ₹{cart?.reduce(
    (total, item) => total + item.product.sale_price * item.quantity,
    0
  )}
</div>

              
             
               {/* Saved Addresses Section */}
              <h4 className="border-bottom pb-2 mt-4 text-dark">Address</h4>
              {savedAddresses.length === 0 ? (
                
                <p className="text-muted">No saved addresses.</p>
              ) : (
                savedAddresses.map((address) => (
                  <div
                    key={address._id}
                    className={`p-3 rounded-3 mb-3 ${
                      selectedAddress === address._id
                        ? " border-primary border-2"
                        : "border border-light"
                    }`}
                    style={{ cursor: "pointer", background: "rgb(220, 213, 235)" }}
                    onClick={() => handleAddressSelect(address._id)}
                  >
                    <div className="d-flex align-items-center mb-1">
                      <p className="fw-bold mb-0 me-2" style={{width:"100px"}}>Name:</p>
                      <input
                        type="text"
                        name="fullName"
                        readOnly
                        className={`form-control rounded-3 border-primary shadow-sm ${
                          errors.fullName ? "is-invalid" : ""
                        }`}
                        // placeholder="Enter full name"
                        value={address.fullName}
                      />
                    </div>

                    <div className="d-flex align-items-center mb-1">
                      <p className="fw-bold mb-0 me-2" style={{width:"100px"}}>Address:</p>
                      <input
                        type="text"
                        name="address"
                        readOnly
                        className={`form-control rounded-3 border-primary shadow-sm ${
                          errors.address ? "is-invalid" : ""
                        }`}
                        // placeholder="Enter full name"
                        value={address.address}
                      />
                    </div>

                    <div className="d-flex align-items-center mb-1">
                      <p className="fw-bold mb-0 me-2" style={{width:"100px"}}>Phone:</p>
                      <input
                        type="text"
                        name="phone"
                        readOnly
                        className={`form-control rounded-3 border-primary shadow-sm ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        // placeholder="Enter full name"
                        value={address.phone}
                      />
                    </div>

                    <div className="d-flex align-items-center mb-1">
                      <p className="fw-bold mb-0 me-2" style={{width:"100px"}}>Street:</p>
                      <input
                        type="text"
                        name="street"
                        readOnly
                        className={`form-control rounded-3 border-primary shadow-sm ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        // placeholder="Enter full name"
                        value={address.street}
                      />
                    </div>

                    <div className="d-flex align-items-center mb-1">
                      <p className="fw-bold mb-0 me-2" style={{width:"100px"}}>City:</p>
                      <input
                        type="text"
                        name="city"
                        readOnly
                        className={`form-control rounded-3 border-primary shadow-sm ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        // placeholder="Enter full name"
                        value={address.city}
                      />
                    </div>

                    <div className="d-flex align-items-center mb-1">
                      <p className="fw-bold mb-0 me-2" style={{width:"100px"}}>State:</p>
                      <input
                        type="text"
                        name="state"
                        readOnly
                        className={`form-control rounded-3 border-primary shadow-sm ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        // placeholder="Enter full name"
                        value={address.state}
                      />
                    </div>

                    <div className="d-flex align-items-center mb-1">
                      <p className="fw-bold mb-0 me-2" style={{width:"100px"}}>Country:</p>
                      <input
                        type="text"
                        name="country"
                        readOnly
                        className={`form-control rounded-3 border-primary shadow-sm ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        // placeholder="Enter full name"
                        value={address.country}
                      />
                    </div>

                    <div className="d-flex align-items-center mb-1">
                      <p className="fw-bold mb-0 me-2" style={{width:"100px"}}>Zip:</p>
                      <input
                        type="text"
                        name="zip"
                        readOnly
                        className={`form-control rounded-3 border-primary shadow-sm ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        // placeholder="Enter full name"
                        value={address.zip}
                      />
                    </div>

                    <button
                      className="btn btn-primary btn-sm mt-2"
                      // onClick={() => handleAddressSelect(address)}
                    >
                      Select
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="col-md-7">
          <div
            className="card border-0 shadow-lg rounded-4 p-4"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="card-body">
              {selectedAddress && (
                <>
                  <h4 className="border-bottom pb-2 text-dark">
                    Shipping Details
                  </h4>
                  <div className="mb-3">
                    <label className="form-label fw-bold text-muted">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      readOnly
                      className={`form-control rounded-3 border-light shadow-sm ${
                        errors.fullName ? "is-invalid" : ""
                      }`}
                      placeholder="Enter full name"
                      value={orderData.shippingAddress.fullName}
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold text-muted">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      readOnly
                      className={`form-control rounded-3 border-light shadow-sm ${
                        errors.address ? "is-invalid" : ""
                      }`}
                      placeholder="Enter address"
                      value={orderData.shippingAddress.address}
                    />
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-muted">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        readOnly
                        className={`form-control rounded-3 border-light shadow-sm ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        placeholder="Enter phone"
                        value={orderData.shippingAddress.phone}
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-muted">
                        Street
                      </label>
                      <input
                        type="text"
                        name="street"
                        readOnly
                        className={`form-control rounded-3 border-light shadow-sm ${
                          errors.street ? "is-invalid" : ""
                        }`}
                        placeholder="Enter street"
                        value={orderData.shippingAddress.street}
                      />
                      {errors.street && (
                        <div className="invalid-feedback">{errors.street}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-muted">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        readOnly
                        className={`form-control rounded-3 border-light shadow-sm ${
                          errors.city ? "is-invalid" : ""
                        }`}
                        placeholder="Enter city"
                        value={orderData.shippingAddress.city}
                      />
                      {errors.city && (
                        <div className="invalid-feedback">{errors.city}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-muted">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        readOnly
                        className={`form-control rounded-3 border-light shadow-sm ${
                          errors.state ? "is-invalid" : ""
                        }`}
                        placeholder="Enter state"
                        value={orderData.shippingAddress.state}
                      />
                      {errors.state && (
                        <div className="invalid-feedback">{errors.state}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-muted">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        readOnly
                        className={`form-control rounded-3 border-light shadow-sm ${
                          errors.country ? "is-invalid" : ""
                        }`}
                        placeholder="Enter country"
                        value={orderData.shippingAddress.country}
                      />
                      {errors.country && (
                        <div className="invalid-feedback">{errors.country}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold text-muted">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        name="zip"
                        readOnly
                        className={`form-control rounded-3 border-light shadow-sm ${
                          errors.zip ? "is-invalid" : ""
                        }`}
                        placeholder="Enter zip code"
                        value={orderData.shippingAddress.zip}
                      />
                      {errors.zip && (
                        <div className="invalid-feedback">{errors.zip}</div>
                      )}
                    </div>
                  </div>
                </>
              )}
              {/* Payment Method */}
              <h4 className="border-bottom pb-2 mt-3 text-dark">
                Payment Method
              </h4>
              <div className="form-check mt-2">
                <input
                  id="Cash-on-delivery"
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={orderData?.paymentMethod === "COD"}
                  onChange={() => handleChangePayment("COD")}
                />
                <label
                  className="form-check-label fw-bold text-muted"
                  htmlFor="Cash-on-delivery"
                >
                  Cash on Delivery
                </label>
              </div>
              ` `
              <div className="form-check mt-2">
                <input
                  id="Credit-debit"
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="Card"
                  checked={orderData?.paymentMethod === "Card"}
                  onChange={() => handleChangePayment("Card")}
                />
                <label
                  className="form-check-label fw-bold text-muted"
                  htmlFor="Credit-debit"
                >
                  Credit/Debit Card
                </label>
              </div>
              {/* Place Order Button */}
              <button
                className="btn w-100 mt-4 py-2 rounded-3 text-white fw-bold"
                style={{
                  background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                }}
                onClick={handleOrderSubmit}
              >
                Place Order
              </button>
            </div>
            <div>
              <h4 className="border-bottom pb-2 text-dark">Add Address</h4>
              <div className="mb-3">
                <label className="form-label fw-bold text-muted">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  className={`form-control rounded-3 border-light shadow-sm ${
                    errors.fullName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter full name"
                  value={checkoutDetails.fullName}
                  onChange={handleInputChange}
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold text-muted">Address</label>
                <input
                  type="text"
                  name="address"
                  className={`form-control rounded-3 border-light shadow-sm ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  placeholder="Enter address"
                  value={checkoutDetails.address}
                  onChange={handleInputChange}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-muted">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className={`form-control rounded-3 border-light shadow-sm ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    placeholder="Enter phone"
                    value={checkoutDetails.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-muted">
                    Street
                  </label>
                  <input
                    type="text"
                    name="street"
                    className={`form-control rounded-3 border-light shadow-sm ${
                      errors.street ? "is-invalid" : ""
                    }`}
                    placeholder="Enter street"
                    value={checkoutDetails.street}
                    onChange={handleInputChange}
                  />
                  {errors.street && (
                    <div className="invalid-feedback">{errors.street}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-muted">City</label>
                  <input
                    type="text"
                    name="city"
                    className={`form-control rounded-3 border-light shadow-sm ${
                      errors.city ? "is-invalid" : ""
                    }`}
                    placeholder="Enter city"
                    value={checkoutDetails.city}
                    onChange={handleInputChange}
                  />
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-muted">State</label>
                  <input
                    type="text"
                    name="state"
                    className={`form-control rounded-3 border-light shadow-sm ${
                      errors.state ? "is-invalid" : ""
                    }`}
                    placeholder="Enter state"
                    value={checkoutDetails.state}
                    onChange={handleInputChange}
                  />
                  {errors.state && (
                    <div className="invalid-feedback">{errors.state}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-muted">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    className={`form-control rounded-3 border-light shadow-sm ${
                      errors.country ? "is-invalid" : ""
                    }`}
                    placeholder="Enter country"
                    value={checkoutDetails.country}
                    onChange={handleInputChange}
                  />
                  {errors.country && (
                    <div className="invalid-feedback">{errors.country}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-muted">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    className={`form-control rounded-3 border-light shadow-sm ${
                      errors.zipCode ? "is-invalid" : ""
                    }`}
                    placeholder="Enter zip code"
                    value={checkoutDetails.zipCode}
                    onChange={handleInputChange}
                  />
                  {errors.zipCode && (
                    <div className="invalid-feedback">{errors.zipCode}</div>
                  )}
                </div>
              </div>
              {/* Save Button */}
              <button
                className="btn btn-success w-30 mt-2"
                onClick={handleSaveAddress}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
