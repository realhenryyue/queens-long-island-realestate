import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced iPad Safari/Chrome compatibility
try {
  // Polyfill for older WebKit versions
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  }

  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  } else {
    console.error('Root element not found');
    // Create fallback element for WebKit
    const fallbackDiv = document.createElement('div');
    fallbackDiv.id = 'root';
    fallbackDiv.innerHTML = '<div style="padding: 20px; text-align: center;">Loading...</div>';
    document.body.appendChild(fallbackDiv);
  }
} catch (error) {
  console.error('Failed to render app:', error);
  // Fallback for critical errors on iPad
  document.body.innerHTML = '<div style="padding: 20px; text-align: center; font-family: system-ui;">Website temporarily unavailable. Please refresh.</div>';
}