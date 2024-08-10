'use client';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public handleReset = (): void => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <div className="text-red-500 dark:text-red-400 mb-4">
            <AlertCircle size={64} />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Oops! Something went wrong...
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
            We&apos;re sorry, but an unexpected error occurred. Our team has
            been notified and is working on a fix.
          </p>
          <div className="flex space-x-4">
            <Link href="/">
              <Button variant="outline">Go to Homepage</Button>
            </Link>
            <Button onClick={this.handleReset}>Try Again</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
