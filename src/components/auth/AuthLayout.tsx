import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <BarChart3 className="h-8 w-8" />
            <span className="text-2xl font-bold">Stock Analyzer</span>
          </Link>
        </div>
        
        {/* Auth Card */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {children}
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;