
import React from 'react';

interface ProgressBarProps {
  percentage: number;
  slim?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, slim = false }) => {
  const safePercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className="w-full bg-gray-700 rounded-full relative overflow-hidden">
      <div className={slim ? "h-1.5" : "h-2.5"}>
        <div
          className="bg-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${safePercentage}%` }}
        ></div>
      </div>
      {!slim && (
         <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
            {Math.round(safePercentage)}%
         </span>
      )}
    </div>
  );
};

export default ProgressBar;
