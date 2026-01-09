'use client';

const ComingSoonView: React.FC = () => {

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6">
          Coming Soon
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-16">
          We're building something special. Stay tuned.
        </p>

        {/* Email Input */}
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
            />
            <button className="px-8 py-3 bg-[#06336e] text-white rounded-lg font-medium hover:bg-[#2c3892] transition-colors">
              Notify Me
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComingSoonView;