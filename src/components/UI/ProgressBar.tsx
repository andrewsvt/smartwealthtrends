import React from 'react';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const progress = Math.max(0, Math.min(value, 5)); // Ensure value is between 0 and 5
  const filledWidth = `${(progress / 5) * 100}%`; // Calculate the width of the filled portion of the progress bar

  return (
    <div className="h-[8px] w-full bg-bg rounded-full">
      <div className="h-full bg-primary rounded-full" style={{ width: filledWidth }}></div>
    </div>
  );
};

export default ProgressBar;
