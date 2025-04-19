import React, { useState, useEffect } from "react";
import axios from "axios";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({ code: "", discount: "", expiryDate: "" });

  useEffect(() => {
    // fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await getOffer();
      if (response.success) {
        setCoupons(response.offers);
      }
    } catch (error) {}
  };
  console.log(coupons, "==coupons");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCoupon = async () => {
    console.log("handleAddCoupon");

    if (!validateForm()) return;
    setLoading(true);
    console.log(formData, "formData");

    try {
      const response = await AddOffer(formData);

      if (response.success) {
        fetchOffers();

        setFormData({
          code: "",
          discount: "",
          expiryDate: "",
         
        });

        setErrors({});
      }
    } catch (error) {
      console.error("Error adding offer:", error);
    }
    setLoading(false);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/coupons/${id}`);
      fetchCoupons(); // Refresh list
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Coupons Management</h2>

      {/* Coupon Form */}
      <form onSubmit={handleAddCoupon} className="bg-white p-4 shadow rounded mb-6">
        <input
          type="text"
          name="code"
          placeholder="Coupon Code"
          value={formData.code}
          onChange={handleChange}
          required
          className="p-2 border rounded mr-2"
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount %"
          value={formData.discount}
          onChange={handleChange}
          required
          className="p-2 border rounded mr-2"
        />
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
          className="p-2 border rounded mr-2"
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Add Coupon</button>
      </form>

      {/* Coupons Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Code</th>
            <th className="p-2 border">Discount</th>
            <th className="p-2 border">Expiry Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id} className="text-center">
              <td className="p-2 border">{coupon.code}</td>
              <td className="p-2 border">{coupon.discount}%</td>
              <td className="p-2 border">{new Date(coupon.expiryDate).toLocaleDateString()}</td>
              <td className="p-2 border">
                <button onClick={() => handleDelete(coupon._id)} className="bg-red-500 text-white p-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Coupons;
