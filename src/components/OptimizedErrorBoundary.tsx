import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}

/**
 * Enhanced Error Boundary with user-friendly fallback UI
 * and automatic retry mechanism
 */
export class OptimizedErrorBoundary extends Component<Props, State> {
  private retryTimer?: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.groupEnd();
    }

    // Track error for analytics (in production)
    if (process.env.NODE_ENV === 'production') {
      this.trackError(error, errorInfo);
    }
  }

  private trackError = (error: Error, errorInfo: ErrorInfo) => {
    try {
      // Example analytics tracking (replace with your analytics service)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: error.message,
          fatal: false
        });
      }
    } catch (e) {
      // Fail silently for analytics
    }
  };

  private handleRetry = () => {
    const { retryCount } = this.state;
    
    if (retryCount < 2) { // Reduced from 3 to 2 retries
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        retryCount: retryCount + 1
      });
    } else {
      // After 2 retries, suggest page reload
      if (window.confirm('Multiple errors occurred. Would you like to reload the page?')) {
        window.location.reload();
      }
    }
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  componentWillUnmount() {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, retryCount } = this.state;
      const isNetworkError = error?.message.includes('fetch') || 
                            error?.message.includes('network') ||
                            error?.message.includes('timeout');

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full shadow-elegant">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-xl text-destructive">
                {isNetworkError ? 'Connection Issue' : 'Something went wrong'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                {isNetworkError 
                  ? "We're having trouble connecting to our servers. Please check your internet connection and try again."
                  : "We encountered an unexpected error. Don't worry, we're working to fix it."
                }
              </p>
              
              {process.env.NODE_ENV === 'development' && error && (
                <details className="text-left bg-muted p-3 rounded text-xs">
                  <summary className="cursor-pointer font-semibold mb-2">
                    Error Details (Development)
                  </summary>
                  <pre className="whitespace-pre-wrap break-words">
                    {error.message}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={this.handleRetry}
                  disabled={retryCount >= 2}
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {retryCount >= 2 ? 'Reload Page' : 'Try Again'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={this.handleGoHome}
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>
              
              {retryCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  Retry attempt: {retryCount}/2
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default OptimizedErrorBoundary;