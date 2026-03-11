import React from 'react';
import { XCircle } from 'lucide-react';
import '../styles/glass.css';
import '../styles/animations.css';

const ErrorCard = ({ message }) => {
  return (
    <div className="glass-card error-shake p-8 m-4 flex flex-col items-center text-center">
      <XCircle size={48} className="text-red-400 mb-4" />
      <h2 className="text-2xl font-bold text-frostWhite">City Not Found</h2>
      <p className="text-lg text-frostWhite mt-2">{message}</p>
    </div>
  );
};

export default ErrorCard;
