import React, { createContext, useState } from 'react';

export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [pointsToRedeem, setPointsToRedeem] = useState(0); // Initialize with default points

  const updatePointsToRedeem = (amount) => {
    setPointsToRedeem(pointsToRedeem + amount); // Adjust points as needed
  };

  return (
    <PointsContext.Provider value={{ pointsToRedeem, updatePointsToRedeem }}>
      {children}
    </PointsContext.Provider>
  );
};
