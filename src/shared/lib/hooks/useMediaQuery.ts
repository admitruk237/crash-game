import { useEffect, useState } from 'react';

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkMediaQuery = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsDesktop(window.innerWidth > 1024);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    checkMediaQuery();
    window.addEventListener('resize', checkMediaQuery);

    return () => {
      window.removeEventListener('resize', checkMediaQuery);
    };
  }, []);

  return { isMobile, isDesktop, isTablet };
};
