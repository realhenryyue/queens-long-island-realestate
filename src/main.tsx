import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

try {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.error('Root element not found');
    }
  }
} catch (error) {
  if (process.env.NODE_ENV === 'development') {
    console.error('Failed to render app:', error);
  }
  // In production, fail silently or show a user-friendly error
}