'use client';

import { useEffect, useState } from 'react';
import { MOBILE_BREAKPOINT_PX } from '@/shared/config';

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT_PX);
    };

    checkMediaQuery();
    window.addEventListener('resize', checkMediaQuery);

    return () => {
      window.removeEventListener('resize', checkMediaQuery);
    };
  }, []);

  return { isMobile };
};
