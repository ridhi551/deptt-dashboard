import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-container flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-gray-200 text-white">
      <div className="content-wrapper text-center">
        <h1 className="coming-soon-title text-5xl font-bold mb-6">
          Coming Soon! ✨ ️
        
        </h1>
        <p className="coming-soon-message text-xl tracking-wider">
          We're working hard to bring you something exciting. Stay tuned for updates! ⏳
        </p>
        <button
          onClick={() => navigate("/")}
          className="back-to-home mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;