import { useEffect } from 'react';
import skylineUrl from '@/assets/queens-skyline.jpg?url';
import agentUrl from '@/assets/agent-photo.jpg?url';

export const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero images
      const heroImage = new Image();
      heroImage.src = skylineUrl;
      
      const agentPhoto = new Image();
      agentPhoto.src = agentUrl;
      
      // Preload WeChat QR code
      const wechatQR = new Image();
      wechatQR.src = '/lovable-uploads/913b3b6c-94b4-41bb-843a-d28cd0eed1a4.png';
    };

    // Implement lazy loading for non-critical images
    const implementLazyLoading = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
              }
            }
          });
        });

        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    };

    // Optimize Core Web Vitals
    const optimizeCoreWebVitals = () => {
      // Reduce Cumulative Layout Shift (CLS)
      const reserveImageSpace = () => {
        document.querySelectorAll('img').forEach(img => {
          if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
            // Set specific dimensions based on typical image usage
            if (img.src.includes('agent-photo')) {
              img.style.width = '128px';
              img.style.height = '128px';
              img.style.aspectRatio = '1 / 1';
            } else if (img.src.includes('queens-skyline')) {
              img.style.aspectRatio = '21 / 9'; // Panoramic aspect ratio
            } else {
              img.style.aspectRatio = '16 / 9'; // Default aspect ratio
            }
          }
        });
      };

      // Improve Largest Contentful Paint (LCP)
      const optimizeLCP = () => {
        // Preload largest contentful paint candidate
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = skylineUrl;
        document.head.appendChild(link);
      };

      // Optimize Interaction to Next Paint (INP)
      const optimizeINP = () => {
        // Defer non-critical JavaScript
        const deferNonCriticalJS = () => {
          setTimeout(() => {
            // Load non-critical scripts after initial page load
            const hasGtag = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
            if (!hasGtag) {
              const script = document.createElement('script');
              script.src = 'https://www.googletagmanager.com/gtag/js?id=G-35QWT9PLLD';
              script.async = true;
              document.head.appendChild(script);
            }
          }, 3000);
        };

        deferNonCriticalJS();
      };

      reserveImageSpace();
      optimizeLCP();
      optimizeINP();
    };

    // Prefetch critical DNS
    const prefetchDNS = () => {
      const domains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'www.googletagmanager.com',
        'www.google-analytics.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${domain}`;
        document.head.appendChild(link);
      });
    };

    // Resource hints for better performance
    const addResourceHints = () => {
      // Preconnect to external domains
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];

      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = '';
        document.head.appendChild(link);
      });
    };

    // Initialize all optimizations
    preloadCriticalResources();
    implementLazyLoading();
    optimizeCoreWebVitals();
    prefetchDNS();
    addResourceHints();

    // Monitor performance
    const monitorPerformance = () => {
      if ('PerformanceObserver' in window) {
        // Monitor LCP
        const lcpObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            console.log('LCP:', entry.startTime);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Monitor CLS
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const clsEntry = entry as any; // Type assertion for CLS specific properties
            if (!clsEntry.hadRecentInput) {
              console.log('CLS:', clsEntry.value);
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Monitor First Input Delay (FID) / Interaction to Next Paint (INP)
        try {
          const fidObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              const fidEntry = entry as any; // Type assertion for FID specific properties
              console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          // Fallback for browsers that don't support first-input
          console.log('FID monitoring not supported');
        }
      }
    };

    monitorPerformance();
  }, []);

  return null;
};