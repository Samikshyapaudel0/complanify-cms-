import React from 'react';
import { MessageSquareText } from 'lucide-react';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="gradient-bg p-2 rounded-xl shadow-lg">
        <MessageSquareText className={`${sizeClasses[size]} text-white`} />
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold text-gray-900`}>
          COMPLANIFY
        </span>
      )}
    </div>
  );
};

export default Logo;