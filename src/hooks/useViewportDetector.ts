import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Initialize state based on initial window width
    return typeof window !== 'undefined' && window.innerWidth < breakpoint;
  });

  useEffect(() => {
    // Debounce function to limit resize event frequency
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < breakpoint);
      }, 100); // 100ms debounce
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [breakpoint]);

  return isMobile;
};

/**
 * Function to check if the current device is mobile (for use outside React components)
 * @param breakpoint - Screen width threshold in pixels (default: 768)
 * @returns Boolean indicating if the device is mobile
 */
export const checkIsMobile = (breakpoint: number = 768): boolean => {
  if (typeof window === 'undefined') return false; // SSR safety check
  return window.innerWidth < breakpoint;
};

/**
 * Hook to get current viewport dimensions
 * @returns Object containing viewport width and height
 */
export const useViewportDetector = () => {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Set initial size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return viewportSize;
};