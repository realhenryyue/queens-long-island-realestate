import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const isChinesePath = location.pathname.startsWith('/zh');
  
  const content = {
    title: isChinesePath ? '页面未找到' : 'Page Not Found',
    description: isChinesePath ? '抱歉，您访问的页面不存在。' : 'Sorry, the page you are looking for does not exist.',
    button: isChinesePath ? '返回首页' : 'Go Home'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">{content.title}</h2>
        <p className="text-muted-foreground mb-8">{content.description}</p>
        <Button onClick={() => window.location.href = isChinesePath ? '/zh' : '/'}>
          {content.button}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
