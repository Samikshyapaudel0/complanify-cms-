import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Users, Target, Award, CheckCircle, MessageSquareText } from 'lucide-react';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Card from '../components/Card';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo size="md" />
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

    
     
    </div>
  );
};

export default About;