'use client'

import { useEffect, useState } from 'react';

export default function NoScript({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This code only runs on the client
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return <noscript>{children}</noscript>;
}