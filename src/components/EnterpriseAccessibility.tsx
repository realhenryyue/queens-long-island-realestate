import { useEffect } from 'react';

const EnterpriseAccessibility = () => {
  useEffect(() => {
    // 延迟执行避免阻塞渲染
    const timer = setTimeout(() => {
      try {
        // 基础无障碍功能
        const style = document.createElement('style');
        style.textContent = `
          /* 高对比度焦点指示器 */
          :focus-visible {
            outline: 2px solid #2563eb !important;
            outline-offset: 2px !important;
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25) !important;
          }
          
          /* 屏幕阅读器文本 */
          .sr-only {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
          }
          
          .sr-only:focus {
            position: static !important;
            width: auto !important;
            height: auto !important;
            padding: inherit !important;
            margin: inherit !important;
            overflow: visible !important;
            clip: auto !important;
            white-space: normal !important;
          }
          
          /* 减少动画 */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `;
        document.head.appendChild(style);

        // 确保所有图片都有alt属性
        document.querySelectorAll('img:not([alt])').forEach(img => {
          const altText = img.getAttribute('title') || 'Image';
          img.setAttribute('alt', altText);
        });
      } catch (error) {
        // 静默处理错误
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default EnterpriseAccessibility;