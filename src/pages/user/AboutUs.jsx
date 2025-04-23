import React from "react";
import { FiGlobe } from "react-icons/fi";
import { BsScissors } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="bg-white text-gray-800">
    

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
  <div data-aos="fade-right">
    <img
      src="/A1.jpg"
      alt="Our Story"
      className="rounded-2xl shadow-lg w-full h-auto object-cover"
    />
  </div>
  <div data-aos="fade-left">
    <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Our Story</h2>
    <p className="text-lg text-gray-600 leading-relaxed">
      Born from a passion for accessible luxury, Danny Fashions was founded in 2019 on the belief that everyone deserves premium essentials at honest prices.
      From our first collection to our global reach today, we’ve stayed true to our mission: curating versatile wardrobe staples that blend timeless design with modern flair.
    </p>
  </div>
</section>

 {/* Why choose us */}
 <section
  className="relative bg-cover bg-center bg-no-repeat py-20 text-white"
  style={{ backgroundImage: `url('/Carnew.webp')` }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

  {/* Content */}
  <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold mb-6 text-yellow-400">Why Choose Us?</h2>
    <div className="grid md:grid-cols-2 gap-8 text-left text-lg text-white">
      <ul className="space-y-6">
        <li className="flex items-start gap-4">
          <FiGlobe className="text-4xl text-yellow-400 mt-1" />
          <span><strong>Global Trends, Vibrant Appeal:</strong> Inspired by fashion capitals worldwide, crafted for your everyday life.</span>
        </li>
         <li className="flex items-start gap-4">
          <MdPayment className="text-4xl text-yellow-400 mt-1" />
          <span><strong>Hassle-free Shopping:</strong> COD, Debit/Credit Card, UPI payment options.</span>
        </li>
      </ul>
      <ul className="space-y-6">
      <li className="flex items-start gap-4">
          <BsScissors className="text-4xl text-yellow-400 mt-1" />
          <span><strong>Premium Comfort:</strong> Soft, durable fabrics that move with you, whether it’s a classic tee or your go-to jeans.</span>
        </li>
       
        <li className="flex items-start gap-4">
          <FaShippingFast className="text-4xl text-yellow-400 mt-1" />
          <span><strong>Seamless Shopping:</strong> Fast shipping, easy exchanges, and responsive customer care.</span>
        </li>
      </ul>
    </div>
    <button className="mt-10 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md text-white font-semibold shadow-lg">
      Explore More
    </button>
  </div>
</section>


      {/* Our Promise */}
      <section className="max-w-6xl mx-auto p-6 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Promise</h2>
        <p className="text-lg max-w-3xl mx-auto mb-6">
          At Danny Fashions, we’re more than a brand — we are your style ally. Every stitch, fit, and detail is designed to empower your confidence, one outfit at a time.
        </p>
        <p className="italic text-xl text-gray-600">Join the movement. Wear the world.</p>
      </section>

      {/* Contact CTA */}
      <section className=" text-white py-8 text-center">
      <p className="text-lg text-black">Questions? Reach us at</p>

        <a href="mailto:hello@dannyfashions.com" className="text-xl font-semibold underline hover:text-gray-300">fashionsdanny@gmail.com</a>
      </section>
    </div>
  );
}
