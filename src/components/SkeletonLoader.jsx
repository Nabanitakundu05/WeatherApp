import React from 'react';
import SkeletonCard from './SkeletonCard';

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-lg">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default SkeletonLoader;
