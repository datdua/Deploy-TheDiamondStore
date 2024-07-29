import React, { createContext, useState } from 'react';

export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [pointsToRedeem, setPointsToRedeem] = useState(0); 

  const updatePointsToRedeem = (amount) => {
    setPointsToRedeem(pointsToRedeem + amount);
  };

  return (
    <PointsContext.Provider value={{ pointsToRedeem, updatePointsToRedeem }}>
      {children}
    </PointsContext.Provider>
  );
};
