export const resourceHints = `
  <!-- DNS Prefetch for external domains -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link rel="dns-prefetch" href="//www.google-analytics.com">
  <link rel="dns-prefetch" href="//www.googletagmanager.com">
  
  <!-- Preconnect for critical external resources -->
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Preload critical fonts -->
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"></noscript>
  
  <!-- Preload critical images -->
  <link rel="preload" href="/assets/agent-photo.jpg" as="image">
  <link rel="preload" href="/assets/queens-skyline.jpg" as="image">
  
  <!-- Prefetch likely navigation targets -->
  <link rel="prefetch" href="#about">
  <link rel="prefetch" href="#services">
  <link rel="prefetch" href="#contact">
  
  <!-- Module preload for critical scripts -->
  <link rel="modulepreload" href="/src/main.tsx">
  <link rel="modulepreload" href="/src/App.tsx">
  
  <!-- Preload manifest and service worker -->
  <link rel="preload" href="/manifest.json" as="manifest">
  <link rel="preload" href="/sw.js" as="script">
`;

export const criticalCSS = `
  <style>
    /* Critical above-the-fold styles */
    :root {
      --primary: 221 83% 53%;
      --background: 0 0% 100%;
      --foreground: 222.2 84% 4.9%;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.05));
    }
    
    .hero-title {
      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: 700;
      line-height: 1.2;
      color: hsl(var(--primary));
      margin-bottom: 1rem;
    }
    
    .hero-subtitle {
      font-size: clamp(1.125rem, 2.5vw, 1.5rem);
      opacity: 0.8;
      margin-bottom: 2rem;
    }
    
    .btn-primary {
      background: hsl(var(--primary));
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      text-decoration: none;
      display: inline-block;
      font-weight: 600;
      transition: transform 0.2s ease;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
      .hero-section {
        padding: 2rem 1rem;
      }
    }
  </style>
`;