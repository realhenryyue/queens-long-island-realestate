import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Only run on client side to prevent hydration issues
    if (typeof window === 'undefined') return
    
    const checkIsMobile = () => window.innerWidth < MOBILE_BREAKPOINT
    setIsMobile(checkIsMobile())

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Use both change and resize for better compatibility
    mql.addEventListener("change", onChange)
    window.addEventListener("resize", onChange)
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", onChange)
    }
  }, [])

  // Return false during SSR/first render to prevent flashing
  return isMobile ?? false
}
