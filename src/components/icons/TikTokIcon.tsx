import React from 'react';

interface TikTokIconProps {
  className?: string;
  size?: number;
}

export const TikTokIcon: React.FC<TikTokIconProps> = ({ className = "", size = 16 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-1.032-.084C5.587 9.321 2 12.908 2 17.346 2 21.784 5.587 25.371 10.025 25.371s8.025-3.587 8.025-8.025V9.126a7.711 7.711 0 0 0 4.861 1.687V7.5a4.785 4.785 0 0 1-3.322-1.814Z"/>
    </svg>
  );
};

export const DouyinIcon: React.FC<TikTokIconProps> = ({ className = "", size = 16 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-1.032-.084C5.587 9.321 2 12.908 2 17.346 2 21.784 5.587 25.371 10.025 25.371s8.025-3.587 8.025-8.025V9.126a7.711 7.711 0 0 0 4.861 1.687V7.5a4.785 4.785 0 0 1-3.322-1.814Z"/>
    </svg>
  );
};