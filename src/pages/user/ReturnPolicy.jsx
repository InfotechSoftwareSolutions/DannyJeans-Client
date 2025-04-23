import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Return Policy</h1>
      <p className="mb-4">
        At <strong>Danny Fashions</strong>, we strive to ensure your complete satisfaction with every purchase.
        If you’ve received an item in the wrong size, pattern or color (different from what you ordered), we’re happy
        to offer an exchange to make it right.
      </p>

      {/* <h2 className="text-xl font-semibold mt-6 mb-2">Key Details:</h2> */}

      <h3 className="text-lg font-semibold mt-4 mb-1">Eligibility:</h3>
      <p className="mb-4">
        Only items that are unworn, unwashed, and in original packaging with tags intact qualify for exchange.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-1">Process:</h3>
      <ol className="list-decimal ml-6 mb-4 space-y-1">
        <li>
          Contact us within <strong>7 days</strong> of delivery at{" "}
          <a href="mailto:fashionsdanny@gmail.com" className="text-blue-600 underline">
          fashionsdanny@gmail.com
          </a>{" "}
          with your order number and photos of the incorrect item.
        </li>
        <li>We’ll provide a prepaid return label (if applicable) and guide you through the exchange.</li>
        <li>Once received, we’ll ship the correct item at no extra cost.</li>
      </ol>

      <h3 className="text-lg font-semibold mt-4 mb-1">Non-Exchangeable:</h3>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Items marked "Final Sale" or purchased during promotions.</li>
        <li>Products damaged due to customer misuse or without proof of purchase.</li>
        <li>Change-of-mind requests (exchanges only apply for errors on our part).</li>
      </ul>

      <p className="mb-4">
        <strong>Note:</strong> Shipping fees for exchanges may apply based on your location. For faster service,
        include all details in your initial email.
      </p>

      <p>
        <strong>Questions?</strong> Reach our support team at{" "}
        <a href="mailto:fashionsdanny@gmail.com" className="text-blue-600 underline">
        fashionsdanny@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default ReturnPolicy;
