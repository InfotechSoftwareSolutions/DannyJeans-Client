export default function HowItWorks() {
    return (
      <section className="w-full max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900">How it works:</h2>
        <p className="text-gray-600 mt-2">
          Save time and nutritious ready-to-eat meals in 3 easy steps
        </p>
        <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg">
          Get started
        </button>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="relative">
              <span className="absolute -left-4 -top-4 text-6xl font-bold text-green-700">1</span>
              <img
                src="/path-to-image-1.jpg"
                alt="Choose your meals"
                className="rounded-lg w-full"
              />
            </div>
            <h3 className="font-semibold text-lg mt-4">Choose your meals</h3>
            <p className="text-gray-600">Over 14 new customizable meals each week.</p>
          </div>
  
          {/* Step 2 */}
          <div className="text-center">
            <div className="relative">
              <span className="absolute -left-4 -top-4 text-6xl font-bold text-green-700">2</span>
              <img
                src="/path-to-image-2.jpg"
                alt="We cook for you"
                className="rounded-lg w-full"
              />
            </div>
            <h3 className="font-semibold text-lg mt-4">We cook for you</h3>
            <p className="text-gray-600">Receive your chef-crafted meals right to your door.</p>
          </div>
  
          {/* Step 3 */}
          <div className="text-center">
            <div className="relative">
              <span className="absolute -left-4 -top-4 text-6xl font-bold text-green-700">3</span>
              <img
                src="/path-to-image-3.jpg"
                alt="Heat, eat, and repeat"
                className="rounded-lg w-full"
              />
            </div>
            <h3 className="font-semibold text-lg mt-4">Heat, eat, and repeat</h3>
            <p className="text-gray-600">
              Ready to eat in 2 minutes or less, no cooking or dishes required.
            </p>
          </div>
        </div>
      </section>
    );
  }