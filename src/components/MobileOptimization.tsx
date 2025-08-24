import { useEffect } from 'react';

const MobileOptimization = () => {
  useEffect(() => {
    // 简化的移动端优化，避免阻塞渲染
    const timer = setTimeout(() => {
      try {
        // 基础触摸优化
        const style = document.createElement('style');
        style.textContent = `
          /* 基础移动端优化 */
          @media (max-width: 768px) {
            button, .btn, [role="button"], a {
              min-height: 44px;
              min-width: 44px;
            }
            
            .text-4xl { font-size: 2rem; }
            .text-5xl { font-size: 2.5rem; }
            .p-6 { padding: 1rem; }
            .gap-8 { gap: 1rem; }
          }
          
          /* iOS Safari 修复 */
          @supports (-webkit-touch-callout: none) {
            .min-h-screen {
              min-height: -webkit-fill-available;
            }
          }
          
          /* 触摸设备优化 */
          @media (pointer: coarse) {
            * {
              touch-action: manipulation;
            }
          }
        `;
        document.head.appendChild(style);
      } catch (error) {
        // 静默处理错误，不阻塞渲染
      }
    }, 200); // 延迟执行避免阻塞

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default MobileOptimization;