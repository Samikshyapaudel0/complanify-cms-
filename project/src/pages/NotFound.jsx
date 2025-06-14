import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <Logo size="lg" className="justify-center mb-8" />
        
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team or visit our help center.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;