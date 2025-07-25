'use client';  
import { createContext, useState } from 'react';

export const RechargeContext = createContext({
  rechargeValue: null,
  setRechargeValue: () => {},
});

export function RechargeProvider({ children }) {
  const [rechargeValue, setRechargeValue] = useState(0);

  return (
    <RechargeContext.Provider value={{ rechargeValue, setRechargeValue }}>
      {children}
    </RechargeContext.Provider>
  );
}
