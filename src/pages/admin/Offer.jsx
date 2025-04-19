import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AdminService from "../../services/admin-api-service/AdminService";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountType: "",
    discountValue: "",
    expiryDate: "",
    minPurchase: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [editingOffer, setEditingoffer] = useState();
  const { AddOffer, getOffer, handleToggleOffer, updateOffer } = AdminService();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOffers = async () => {
    try {
      const response = await getOffer();
      if (response.success) {
        setOffers(response.offers);
      }
    } catch (error) {}
  };
  console.log(offers, "==offers");

  useEffect(() => {
    fetchOffers();
  }, []);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    // if (!formData.minPurchase || formData.minPurchase < 0)
    //   newErrors.minPurchase = "Enter a valid minimum purchase";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";

    if (!formData.discountValue || formData.discountValue <= 0) {
      newErrors.discountValue = "Discount value must be greater than 0";
    }
    if (!formData.discountType) {
      newErrors.discountType = "Select Discount type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOffer = async () => {
    console.log("handleAddOffer");

    if (!validateForm()) return;
    setLoading(true);
    console.log(formData, "formData");

    try {
      const response = await AddOffer(formData);

      if (response.success) {
        fetchOffers();

        setFormData({
          title: "",
          description: "",
          discountType: "",
          discountValue: "",
          expiryDate: "",
          minPurchase: "",
        });

        setErrors({});
      }
    } catch (error) {
      console.error("Error adding offer:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    try {
      await axios.delete(`/api/offers/${id}`);
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "discountValue" || name === "minPurchase"
          ? Number(value)
          : value,
    });
  };

  const handleToggle = async (productId) => {
    try {
      const response = await handleToggleOffer(productId);

      if (response.success) {
        fetchOffers();
      }
    } catch (error) {
      // toast.error(error?.response?.data?.message)
    }
  };

  const handleEditOffer = (offer) => {
    setFormData({
      title: offer.title,
      description: offer.description,
      discountType: offer.discountType,
      discountValue: offer.discountValue,
      expiryDate: offer.expiryDate,
    });
    setEditingoffer(offer);
    setIsModalOpen(true);
  };

  const handleSaveCategory = async () => {
    if (formData.title.trim() === "") return;

    const offerData = {
      title: formData.title,
      description: formData.description,
      discountType: formData.discountType,
      discountValue: formData.discountValue,
      expiryDate: formData.expiryDate,
    };

    console.log(editingOffer, "==offerData");
    console.log(offerData, "==offerData");

    try {
      if (editingOffer) {
        const response = await updateOffer(editingOffer._id, offerData);
        setOffers(response.offers);
        clearState();
      } else {
        const response = await AddOffer(offerData);
        console.log("API Response:", response); // Debugging
        setOffers(response.offers);
        clearState();
      }
    } catch (error) {
      console.log("Error saving offer:", error);
    }
  };

  const clearState = (e) => {
    setFormData({
      title: "",
      description: "",
      discountType: "",
      discountValue: "",
      expiryDate: "",
    });
    setIsModalOpen(false);
    setEditingoffer(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Offers Management</h1>

      {/* General Information Section */}
      <h2 className="text-xl font-semibold mb-2">General Information</h2>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {["title", "description"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={"text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className={`border p-2 w-full ${
                errors[field] ? "border-red-500" : ""
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Discount Section */}
      {/* <h2 className="text-xl font-semibold mb-2">Discount Details</h2> */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Discount Type Dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1 ">
            Discount Type
          </label>
          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select discount type</option>
            <option value="percentage">Percentage (%)</option>
            {/* <option value="fixed">Fixed Amount ($)</option> */}
          </select>
          {errors.discountType && (
            <p className="text-red-500 text-sm mt-1">{errors.discountType}</p>
          )}
        </div>

        {/* Discount Value */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            Discount Value
          </label>
          <input
            type="number"
            name="discountValue"
            placeholder="Discount Value"
            value={formData.discountValue}
            onChange={handleChange}
            className={`border p-2 w-full ${
              errors.discountValue ? "border-red-500" : ""
            }`}
          />
          {errors.discountValue && (
            <p className="text-red-500 text-sm mt-1">{errors.discountValue}</p>
          )}
        </div>

        {/* **************************** */}
        {/* Discount Value */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            // placeholder="Discount Value"
            value={formData.expiryDate}
            onChange={handleChange}
            className={`border p-2 w-full ${
              errors.expiryDate ? "border-red-500" : ""
            }`}
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
          )}
        </div>
      </div>

      {/* Add Offer Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleAddOffer}
          className="bg-green-600 text-white p-2 rounded w-80"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Offer"}
        </button>
      </div>

      {/* Offers Table */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Offers List</h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            {[
              "Title",
              "Description",
              "Discount Type",
              "Discount Value",
              "Expiry Date",
              "Actions",
              "Status",
            ].map((head) => (
              <th key={head} className="border p-2">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(offers ?? []).map((offer) => (
            <tr key={offer._id} className="text-center">
              <td className="border p-2">{offer.title}</td>
              <td className="border p-2">{offer.description}</td>
              <td className="border p-2">{offer.discountType}</td>
              <td className="border p-2">
                {offer.discountType === "percentage"
                  ? `${offer.discountValue}%`
                  : `$${offer.discountValue}`}
              </td>
              {/* <td className="border p-2">${offer.minPurchase}</td> */}
              <td className="border p-2">
                {new Date(offer.expiryDate).toLocaleDateString()}
              </td>

              <td className="p-2 text-center">
                <button
                  onClick={() => handleEditOffer(offer)}
                  className="text-blue-500"
                >
                  ✏️
                </button>
              </td>
              {/* <td className="border p-2">
                <button
                  onClick={() => handleDelete(offer._id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td> */}
              <td className="p-2 text-center">
                {/* <button onClick={() => handleDeleteCategory(category._id)} className="text-red-500">🗑️</button> */}
                <button
                  onClick={() => handleToggle(offer._id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    offer?.isActive
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {offer?.isActive ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}

          {(!offers || offers.length === 0) && (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No offers available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-end bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 shadow-lg w-1/3 h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingOffer ? "Edit Offer" : "Add Offer"}
              </h2>
              <button onClick={clearState} className="text-lg">
                ✖
              </button>
            </div>

            {/* Name Field */}
            <label className="block mb-2">Title</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              placeholder="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            {/* Description Field */}
            <label className="block mb-2">Description</label>
            <textarea
              className="w-full border p-2 rounded mb-2"
              placeholder=" Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>

            {/* Discount Type */}
            <label className="block mb-2">Discount Type</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              value={formData.discountType}
              onChange={(e) =>
                setFormData({ ...formData, discountType: e.target.value })
              }
            />

            {/* Discount Value*/}
            <label className="block mb-2">Discount Value</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              value={formData.discountValue}
              onChange={(e) =>
                setFormData({ ...formData, discountValue: e.target.value })
              }
            />

            {/* expiryDate*/}
            <label className="block mb-2">Expiry Date</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                {editingOffer ? "Update Offer" : "Add Offer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;
