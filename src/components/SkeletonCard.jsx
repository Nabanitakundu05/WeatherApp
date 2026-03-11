import React from 'react';
import '../styles/glass.css';

const SkeletonCard = ({ className }) => {
  return (
    <div className={`glass-card shimmer p-4 my-4 ${className}`}>
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-700 rounded-full shimmer-content" />
        <div className="ml-4 flex-1">
          <div className="w-3/4 h-6 bg-gray-700 rounded shimmer-content" />
          <div className="w-1/2 h-4 mt-2 bg-gray-700 rounded shimmer-content" />
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full h-20 bg-gray-700 rounded shimmer-content" />
      </div>
    </div>
  );
};

export default SkeletonCard;
