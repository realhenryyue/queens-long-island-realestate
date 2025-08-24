import { useEffect } from 'react';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Enhanced Core Web Vitals monitoring with Safari compatibility
    const monitorCoreWebVitals = () => {
      if (!('PerformanceObserver' in window)) {
        console.warn('PerformanceObserver not supported');
        return;
      }

      // Monitor Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          try {
            for (const entry of entryList.getEntries()) {
              const lcp = entry.startTime;
              console.log('📊 LCP:', lcp.toFixed(2) + 'ms', lcp < 2500 ? '✅ Good' : lcp < 4000 ? '⚠️ Needs improvement' : '❌ Poor');
              
              // Store for analytics
              if (typeof window !== 'undefined') {
                (window as any).webVitals = (window as any).webVitals || {};
                (window as any).webVitals.lcp = lcp;
              }
            }
          } catch (err) {
            console.warn('LCP processing error:', err);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (err) {
        console.warn('LCP observer failed:', err);
      }

      // Monitor Cumulative Layout Shift (CLS)
      try {
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          try {
            for (const entry of entryList.getEntries()) {
              const clsEntry = entry as any;
              if (!clsEntry.hadRecentInput) {
                clsScore += clsEntry.value;
              }
            }
            console.log('📊 CLS:', clsScore.toFixed(4), clsScore < 0.1 ? '✅ Good' : clsScore < 0.25 ? '⚠️ Needs improvement' : '❌ Poor');
            
            // Store for analytics
            if (typeof window !== 'undefined') {
              (window as any).webVitals = (window as any).webVitals || {};
              (window as any).webVitals.cls = clsScore;
            }
          } catch (err) {
            console.warn('CLS processing error:', err);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (err) {
        console.warn('CLS observer failed:', err);
      }

      // Monitor First Input Delay (FID) / Interaction to Next Paint (INP)
      try {
        const fidObserver = new PerformanceObserver((entryList) => {
          try {
            for (const entry of entryList.getEntries()) {
              const fidEntry = entry as any;
              const fid = fidEntry.processingStart - fidEntry.startTime;
              console.log('📊 FID:', fid.toFixed(2) + 'ms', fid < 100 ? '✅ Good' : fid < 300 ? '⚠️ Needs improvement' : '❌ Poor');
              
              // Store for analytics
              if (typeof window !== 'undefined') {
                (window as any).webVitals = (window as any).webVitals || {};
                (window as any).webVitals.fid = fid;
              }
            }
          } catch (err) {
            console.warn('FID processing error:', err);
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (err) {
        console.warn('FID observer not supported or failed:', err);
      }
    };

    // Monitor resource loading performance
    const monitorResources = () => {
      try {
        const resourceObserver = new PerformanceObserver((entryList) => {
          try {
            for (const entry of entryList.getEntries()) {
              const resource = entry as PerformanceResourceTiming;
              const loadTime = resource.responseEnd - resource.startTime;
              
              // Flag slow resources
              if (loadTime > 1000) {
                console.warn('🐌 Slow resource:', resource.name, loadTime.toFixed(2) + 'ms');
              }
              
              // Monitor specific resource types
              if (resource.name.includes('.jpg') || resource.name.includes('.png') || resource.name.includes('.webp')) {
                if (loadTime > 500) {
                  console.warn('🖼️ Slow image:', resource.name, loadTime.toFixed(2) + 'ms');
                }
              }
              
              if (resource.name.includes('.js')) {
                if (loadTime > 800) {
                  console.warn('📜 Slow script:', resource.name, loadTime.toFixed(2) + 'ms');
                }
              }
              
              if (resource.name.includes('.css')) {
                if (loadTime > 300) {
                  console.warn('🎨 Slow stylesheet:', resource.name, loadTime.toFixed(2) + 'ms');
                }
              }
            }
          } catch (err) {
            console.warn('Resource processing error:', err);
          }
        });
        
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (err) {
        console.warn('Resource observer failed:', err);
      }
    };

    // Monitor navigation timing
    const monitorNavigation = () => {
      try {
        const navigationObserver = new PerformanceObserver((entryList) => {
          try {
            for (const entry of entryList.getEntries()) {
              const nav = entry as PerformanceNavigationTiming;
              
              const ttfb = nav.responseStart - nav.requestStart;
              const domLoad = nav.domContentLoadedEventEnd - nav.startTime;
              const pageLoad = nav.loadEventEnd - nav.startTime;
              
              console.log('🚀 Performance Metrics:');
              console.log('  TTFB:', ttfb.toFixed(2) + 'ms', ttfb < 200 ? '✅' : ttfb < 500 ? '⚠️' : '❌');
              console.log('  DOM Load:', domLoad.toFixed(2) + 'ms', domLoad < 1500 ? '✅' : domLoad < 3000 ? '⚠️' : '❌');
              console.log('  Page Load:', pageLoad.toFixed(2) + 'ms', pageLoad < 3000 ? '✅' : pageLoad < 5000 ? '⚠️' : '❌');
              
              // Store for analytics
              if (typeof window !== 'undefined') {
                (window as any).navigationMetrics = {
                  ttfb,
                  domLoad,
                  pageLoad,
                  timestamp: Date.now()
                };
              }
            }
          } catch (err) {
            console.warn('Navigation processing error:', err);
          }
        });
        
        navigationObserver.observe({ entryTypes: ['navigation'] });
      } catch (err) {
        console.warn('Navigation observer failed:', err);
      }
    };

    // Monitor memory usage (if available)
    const monitorMemory = () => {
      try {
        if ('memory' in performance) {
          const memoryInfo = (performance as any).memory;
          const usedMemory = memoryInfo.usedJSHeapSize / 1048576; // Convert to MB
          const totalMemory = memoryInfo.totalJSHeapSize / 1048576;
          
          console.log('🧠 Memory Usage:', usedMemory.toFixed(2) + 'MB /', totalMemory.toFixed(2) + 'MB');
          
          if (usedMemory > 50) {
            console.warn('⚠️ High memory usage detected');
          }
          
          // Store for analytics
          if (typeof window !== 'undefined') {
            (window as any).memoryMetrics = {
              used: usedMemory,
              total: totalMemory,
              timestamp: Date.now()
            };
          }
        }
      } catch (err) {
        console.warn('Memory monitoring failed:', err);
      }
    };

    // Cross-browser compatibility monitoring
    const monitorCompatibility = () => {
      const features = [
        { name: 'IntersectionObserver', available: 'IntersectionObserver' in window },
        { name: 'ResizeObserver', available: 'ResizeObserver' in window },
        { name: 'Web Animations API', available: 'animate' in document.createElement('div') },
        { name: 'Fetch API', available: 'fetch' in window },
        { name: 'Service Worker', available: 'serviceWorker' in navigator },
        { name: 'CSS Grid', available: CSS.supports('display', 'grid') },
        { name: 'CSS Flexbox', available: CSS.supports('display', 'flex') },
        { name: 'CSS Custom Properties', available: CSS.supports('color', 'var(--test)') }
      ];
      
      const unsupported = features.filter(f => !f.available);
      
      if (unsupported.length > 0) {
        console.group('⚠️ Browser Compatibility Issues');
        unsupported.forEach(feature => {
          console.warn('❌ Missing:', feature.name);
        });
        console.groupEnd();
      } else {
        console.log('✅ All modern features supported');
      }
      
      // Store for analytics
      if (typeof window !== 'undefined') {
        (window as any).compatibilityReport = {
          supported: features.filter(f => f.available).map(f => f.name),
          unsupported: unsupported.map(f => f.name),
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        };
      }
    };

    // Initialize monitoring
    const initializeMonitoring = () => {
      console.log('🔍 Performance monitoring initialized');
      
      setTimeout(() => {
        monitorCoreWebVitals();
        monitorResources();
        monitorNavigation();
        monitorMemory();
        monitorCompatibility();
      }, 1000);
      
      // Periodic memory monitoring
      const memoryInterval = setInterval(() => {
        monitorMemory();
      }, 30000); // Every 30 seconds
      
      return () => {
        clearInterval(memoryInterval);
      };
    };

    const cleanup = initializeMonitoring();
    
    return cleanup;
  }, []);

  return null;
};