import { useEffect, useState } from 'react';

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // Default to desktop for SSR
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsDesktop(width > 1024);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkMediaQuery();
    window.addEventListener('resize', checkMediaQuery);

    return () => {
      window.removeEventListener('resize', checkMediaQuery);
    };
  }, []);

  return { isMobile, isDesktop, isTablet };
};
