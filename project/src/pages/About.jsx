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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">COMPLANIFY</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering educational institutions with efficient complaint management solutions. 
            Making student voices heard and fostering positive change in academic environments.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              To revolutionize how educational institutions handle student feedback and complaints by providing 
              a transparent, efficient, and user-friendly platform that ensures every student voice is heard 
              and addressed promptly.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that effective communication between students and administration is crucial for 
              creating better learning environments and fostering institutional growth.
            </p>
          </Card>

          <Card>
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              To become the leading complaint management system for educational institutions worldwide, 
              setting the standard for transparency, efficiency, and student satisfaction in academic 
              administration.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We envision a future where every educational institution has the tools to create an 
              environment where students feel heard, valued, and empowered to contribute to positive change.
            </p>
          </Card>
        </div>

        
      </div>
    </div>
  );
};

export default About;