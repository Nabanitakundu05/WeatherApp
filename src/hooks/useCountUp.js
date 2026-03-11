import { useState, useEffect, useRef } from 'react';

const useCountUp = (endValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const startTimeRef = useRef(null);
  
  const animate = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    const progress = timestamp - startTimeRef.current;
    const percentage = Math.min(progress / duration, 1);
    const currentCount = Math.floor(endValue * percentage);
    
    setCount(currentCount);
    
    if (progress < duration) {
      ref.current = requestAnimationFrame(animate);
    } else {
        setCount(endValue); // Ensure it ends on the exact value
    }
  };

  useEffect(() => {
    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [endValue, duration]);
  
  return count;
};

export default useCountUp;
