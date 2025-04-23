import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>Danny Fashions</strong>, we respect your privacy and are committed to protecting your personal data.
        This policy explains how we collect, use, and safeguard your information when you shop with us or interact with our website (
        <a href="https://www.dannyfashions.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          www.dannyfashions.com
        </a>
        ).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 ">What We Collect</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li><strong>Personal Details:</strong> Name, email, shipping/billing address, and phone number when you place an order.</li>
        <li><strong>Payment Information:</strong> Securely processed via encrypted gateways (we do not store credit card details).</li>
        <li><strong>Usage Data:</strong> Cookies to improve your shopping experience (manage via browser settings).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li><strong>Order Processing:</strong> To fulfill purchases and send updates.</li>
        <li><strong>Customer Support:</strong> To respond to inquiries or requests.</li>
        <li><strong>Improvements:</strong> To enhance our website, products, and services.</li>
        <li><strong>Marketing:</strong> With your consent, to share promotions or new collections (opt-out anytime).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Sharing & Security</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li><strong>Third Parties:</strong> Only shared with trusted partners (e.g., payment processors, shipping carriers) for order fulfillment.</li>
        <li><strong>Protection Measures:</strong> SSL encryption, secure servers, and strict access controls.</li>
        <li><strong>Global Operations:</strong> Data may be transferred internationally, adhering to privacy laws like GDPR.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Access, correct, or delete your personal data.</li>
        <li>Opt out of marketing communications.</li>
      </ul>

      <p>
        <strong>Contact Us:</strong> For questions or requests, email{" "}
        <a href="mailto:fashionsdanny@gmail.com" className="text-blue-600 underline">
        fashionsdanny@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
