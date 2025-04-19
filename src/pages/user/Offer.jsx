import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    expiryDate: "",
    minPurchase: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchOffers = useCallback(async () => {
    try { 
      const { data } = await axios.get("/api/offers");
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }, []);

  useEffect(() => {
    // fetchOffers();
  }, [fetchOffers]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.discount || formData.discount <= 0 || formData.discount > 100)
      newErrors.discount = "Enter a valid discount (1-100%)";
    if (!formData.minPurchase || formData.minPurchase < 0)
      newErrors.minPurchase = "Enter a valid minimum purchase";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOffer = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await axios.post("/api/offers", formData);
      fetchOffers();
      setFormData({
        title: "",
        description: "",
        discount: "",
        expiryDate: "",
        minPurchase: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding offer:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/offers/${id}`);
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Offers Management</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {["title", "description", "discount", "minPurchase", "expiryDate"].map(
          (field) => (
            <div key={field} className="flex flex-col">
              <input
                type={
                  field === "discount" || field === "minPurchase"
                    ? "number"
                    : field === "expiryDate"
                    ? "date"
                    : "text"
                }
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
          )
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleAddOffer}
          className="bg-green-600 text-white p-2 rounded w-80"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Offer"}
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-200">
            {[
              "Title",
              "Description",
              "Discount",
              "Min Purchase",
              "Expiry Date",
              "Actions",
            ].map((head) => (
              <th key={head} className="border p-2">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {offers.length > 0 ? (
            offers.map((offer) => (
              <tr key={offer._id} className="text-center">
                <td className="border p-2">{offer.title}</td>
                <td className="border p-2">{offer.description}</td>
                <td className="border p-2">{offer.discount}%</td>
                <td className="border p-2">${offer.minPurchase}</td>
                <td className="border p-2">
                  {new Date(offer.expiryDate).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No offers available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Offers;
