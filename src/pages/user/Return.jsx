import { useState } from "react";

export default function ReturnReasonModal({ isOpen , returnProductPopup, returnProduct }) {
  const [selectedReason, setSelectedReason] = useState(null);

  const reasons = [
    "Item is defective",
    "Wrong item received",
    "Item arrived late",
    "Better price available",
    "No longer needed",
  ];

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Select a Reason for Return</h2>
          <div className="space-y-2">
            {reasons.map((reason, index) => (
              <label
                key={index}
                className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
              >
                <input
                  type="radio"
                  name="returnReason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="form-radio text-blue-500"
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button onClick={returnProductPopup} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
            <button
              onClick={() => returnProduct(selectedReason)}
              disabled={!selectedReason}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
}