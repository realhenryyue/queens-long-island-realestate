import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Prevent hydration mismatch by checking if we're in browser
    if (typeof window === 'undefined') return;
    
    const checkIsMobile = () => {
      try {
        return window.innerWidth < MOBILE_BREAKPOINT;
      } catch {
        return false;
      }
    };
    
    // Set initial value after component mounts
    setIsMobile(checkIsMobile());

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(checkIsMobile());
    };
    
    // Use newer API if available, fallback to deprecated one
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else {
      // Fallback for older browsers
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, [])

  // Return undefined initially to prevent hydration mismatch
  return isMobile
}
