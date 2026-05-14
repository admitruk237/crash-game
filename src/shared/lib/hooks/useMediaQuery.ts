'use client';

import { useEffect, useState } from 'react';

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMediaQuery();
    window.addEventListener('resize', checkMediaQuery);

    return () => {
      window.removeEventListener('resize', checkMediaQuery);
    };
  }, []);

  return { isMobile };
};
