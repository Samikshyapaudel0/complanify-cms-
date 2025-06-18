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

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in complete transparency throughout the complaint resolution process, 
                ensuring students are always informed about the status and progress of their concerns.
              </p>
            </Card>

            <Card className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Student-Centric</h3>
              <p className="text-gray-600 leading-relaxed">
                Every feature and decision we make is centered around improving the student experience 
                and ensuring their voices are heard and valued by institutional leadership.
              </p>
            </Card>

            <Card className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquareText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Efficiency</h3>
              <p className="text-gray-600 leading-relaxed">
                We streamline the complaint management process to ensure quick resolution times 
                while maintaining quality and thoroughness in addressing student concerns.
              </p>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose COMPLANIFY?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Real-time Tracking</h4>
                  <p className="text-gray-600">Monitor complaint status with instant updates and notifications.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
                  <p className="text-gray-600">Enterprise-grade security ensures all data remains confidential.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Easy Integration</h4>
                  <p className="text-gray-600">Seamlessly integrates with existing institutional systems.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Advanced Analytics</h4>
                  <p className="text-gray-600">Comprehensive reporting tools for data-driven decisions.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                  <p className="text-gray-600">Round-the-clock technical support and assistance.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Mobile Responsive</h4>
                  <p className="text-gray-600">Access from any device with our responsive design.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="text-blue-200">Complaints Resolved</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">800+</div>
              <div className="text-blue-200">Institutions Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-200">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Support Available</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of educational institutions that trust COMPLANIFY for their complaint management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/student/signup">
              <Button size="lg" className="px-8 py-4">
                Get Started as Student
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button variant="outline" size="lg" className="px-8 py-4">
                Admin Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;