import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-gray-800 font-sans">
      <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
      <p className="mb-10 text-lg text-gray-600">Let’s talk style — we’re here to help!</p>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Contact Info Section */}
        <div className="bg-white shadow-lg p-8 rounded-2xl space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-indigo-600 mt-1" />
            <div>
              <h3 className="font-bold">Email Us</h3>
              <p>
                <a href="mailto:fashionsdanny@gmail.com" className="text-indigo-700 hover:underline">
                fashionsdanny@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-indigo-600 mt-1" />
            <div>
              <h3 className="font-bold">Call Us</h3>
              <p>+91 73063 15705</p>
              <small>Mon – Sat, 10AM – 6PM IST</small>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-indigo-600 mt-1" />
            <div>
              <h3 className="font-bold">Visit Us</h3>
              <p>12th Floor, Fashion Avenue, Edapally, Kochi – 400053, Kerala</p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white shadow-lg p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Message</label>
              <textarea
                placeholder="Type your message..."
                rows="5"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-700 text-white py-3 px-6 rounded-lg hover:bg-indigo-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Quick Links + Chat */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-indigo-700 font-medium">
            <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
            <li><a href="#" className="hover:underline">Track Your Order</a></li>
            <li><a href="#" className="hover:underline">Size Guide</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Prefer Chat?</h2>
          <p>
            DM us on Instagram:
            <a href="https://www.instagram.com/dannyfashionofficial?igsh=MTlqYnQ1cDB2ZWN3aQ==" target="_blank" rel="noreferrer" className="text-indigo-700 hover:underline ml-1">
              @dannyfashions
            </a>
          </p>
          <p>
            Or WhatsApp us:
            <a href="https://wa.me/917306315705
" className="text-indigo-700 hover:underline ml-1">
              Chat Now
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-600 mt-12">
        🌍 Join the Movement. Wear the World. – Danny Fashions
      </div>
    </div>
  );
};

export default ContactUs;
