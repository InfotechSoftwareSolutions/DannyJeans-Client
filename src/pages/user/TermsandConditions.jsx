import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to <strong>Danny Fashions</strong>! By accessing our website (
        <a href="https://www.dannyfashions.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          www.dannyfashions.com
        </a>
        ) or making a purchase, you agree to comply with these Terms & Conditions. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. General Terms</h2>
      <ul className="list-disc ml-6 space-y-1 mb-4">
        <li><strong>Eligibility:</strong> You must be at least 18 years old or have parental consent to shop with us.</li>
        <li><strong>Accuracy:</strong> Product descriptions, prices, and images are subject to change. We reserve the right to correct errors.</li>
        <li><strong>Account Security:</strong> You’re responsible for maintaining the confidentiality of your account credentials.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Orders & Payments</h2>
      <ul className="list-disc ml-6 space-y-1 mb-4">
        <li><strong>Pricing:</strong> All prices are in INR and exclude taxes/duties, which are calculated at checkout.</li>
        <li><strong>Payment Methods:</strong> We accept COD, Credit/Debit cards and UPI payment options.</li>
        <li><strong>Order Confirmation:</strong> Your order is finalized only once payment method is processed.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Shipping & Delivery</h2>
      <ul className="list-disc ml-6 space-y-1 mb-4">
        <li><strong>Processing Time:</strong> Orders ship within 1–3 business days (excluding weekends/holidays).</li>
        <li><strong>Tracking:</strong> You’ll receive a tracking link once your order ships.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Returns & Exchanges</h2>
      <ul className="list-disc ml-6 space-y-1 mb-4">
        <li><strong>Policy:</strong> Only wrong/damaged items are eligible for exchanges (see our Return Policy for details).</li>
        <li><strong>Non-Returnable:</strong> Sale items, customized products, or items without original tags.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
      <p className="mb-4">
        All content (logos, designs, text) on our website is owned by Danny Fashions and protected by copyright.
        Unauthorized use is prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
      <ul className="list-disc ml-6 space-y-1 mb-4">
        <li>Indirect damages (e.g., lost profits) from product use or website access.</li>
        <li>Minor variations in product color/fit due to screen settings.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by the laws of India. Disputes will be resolved in Kerala Jurisdiction.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms periodically. Continued use of our site constitutes acceptance.
      </p>

      <p>
        <strong>Contact Us:</strong> For questions, email{" "}
        <a href="mailto:fashionsdanny@gmail.com" className="text-blue-600 underline">
        fashionsdanny@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsAndConditions;
