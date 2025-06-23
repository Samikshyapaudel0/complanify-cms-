import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, BarChart3, Users, CheckCircle, Star, MessageSquareText } from 'lucide-react';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Card from '../components/Card';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo size="md" />
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</Link>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
              <div className="flex items-center space-x-4">
                <Link to="/student/login">
                  <Button variant="outline" size="sm">Student Login</Button>
                </Link>
                <Link to="/admin/login">
                  <Button variant="primary" size="sm">Admin Login</Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

     
    </div>
  );
};

export default LandingPage;