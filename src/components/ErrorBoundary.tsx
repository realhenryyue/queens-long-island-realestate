import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
      console.error('Component stack:', errorInfo.componentStack);
      console.error('Error stack:', error.stack);
      console.error('User agent:', navigator.userAgent);
      console.error('Error occurred at:', new Date().toISOString());
      
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isSafari) {
        console.error('Safari detected - checking for compatibility issues');
      }
    }
    
    // Always log to analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      try {
        (window as any).gtag('event', 'exception', {
          description: error.toString().substring(0, 150), // Limit description length
          fatal: false,
          custom_map: {
            error_boundary: 'true',
            user_agent: navigator.userAgent.substring(0, 100),
            error_type: error.name || 'Unknown',
            timestamp: new Date().toISOString()
          }
        });
      } catch (analyticsError) {
        // Silently fail if analytics tracking fails
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-4">
              We apologize for the inconvenience. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}