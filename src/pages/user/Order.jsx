import React, { useState } from "react";
import { ChevronDown, CheckCircle, Truck, Clock } from "lucide-react";

const ordersData = [
  {
    id: "ORD123",
    date: "March 10, 2025",
    customer: "Sophia Williams",
    email: "sophia@example.com",
    address: "123 Fashion St, New York, USA",
    status: "Pending",
    total: 120,
    items: [
      {
        name: "Elegant Red Dress",
        image: "./JN2.webp",
        price: 60,
        quantity: 2,
      },
    ],
  },
  {
    id: "ORD124",
    date: "March 8, 2025",
    customer: "Liam Brown",
    email: "liam@example.com",
    address: "456 Style Ave, London, UK",
    status: "Shipped",
    total: 75,
    items: [
      {
        name: "Stylish Leather Jacket",
        image: "./colour.jpg",
        price: 75,
        quantity: 1,
      },
    ],
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

const Order = () => {
  const [orders, setOrders] = useState(ordersData);

  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h2>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white/90 backdrop-blur-lg shadow-lg rounded-lg p-6 border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
              <span className="text-sm text-gray-500">{order.date}</span>
            </div>

            {/* Customer Details */}
            <div className="mb-4">
              <p className="text-gray-800 font-medium">{order.customer}</p>
              <p className="text-sm text-gray-500">{order.email}</p>
              <p className="text-sm text-gray-500">{order.address}</p>
            </div>

            {/* Order Items */}
            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x ${item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Actions */}
            <div className="flex justify-between items-center mt-6">
              <p className="font-bold text-lg text-gray-800">Total: ${order.total}</p>
              
              {/* Status Dropdown */}
              <div className="relative">
                <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${statusColors[order.status]}`}>
                  {order.status === "Pending" && <Clock className="w-4 h-4" />}
                  {order.status === "Shipped" && <Truck className="w-4 h-4" />}
                  {order.status === "Delivered" && <CheckCircle className="w-4 h-4" />}
                  {order.status}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden hidden group-hover:block">
                  {["Pending", "Shipped", "Delivered"].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(order.id, status)}
                      className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;