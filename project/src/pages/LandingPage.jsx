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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-blue-900 bg-opacity-80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Voice <span className="text-blue-300">Matters</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              COMPLANIFY is the premier complaint management system designed specifically for educational institutions. 
              Submit, track, and resolve issues efficiently while fostering a better learning environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/student/signup">
                <Button size="lg" className="text-lg px-8 py-4">
                  Get Started as Student <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                  Admin Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce-slow">
          <div className="bg-white bg-opacity-20 p-4 rounded-full">
            <MessageSquareText className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce-slow" style={{ animationDelay: '1s' }}>
          <div className="bg-white bg-opacity-20 p-4 rounded-full">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-blue-600">COMPLANIFY</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience a streamlined approach to complaint management with features designed for educational excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center group">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MessageSquareText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Submission</h3>
              <p className="text-gray-600 leading-relaxed">
                Submit complaints with just a few clicks. Our intuitive interface makes it simple for students to voice their concerns effectively.
              </p>
            </Card>
            
            <Card className="text-center group">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure & Private</h3>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is our priority. All complaints are handled with complete confidentiality and enterprise-grade security.
              </p>
            </Card>
            
            <Card className="text-center group">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Track your complaint status in real-time with instant notifications and transparent progress updates.
              </p>
            </Card>
            
            <Card className="text-center group">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive analytics and reporting tools to help administrators make data-driven decisions.
              </p>
            </Card>
            
            <Card className="text-center group">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Multi-role Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Designed for both students and administrators with role-based access and specialized dashboards.
              </p>
            </Card>
            
            <Card className="text-center group">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Resolution</h3>
              <p className="text-gray-600 leading-relaxed">
                Streamlined workflow ensures faster resolution times and improved satisfaction rates.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-5xl font-bold mb-2">15,000+</div>
              <div className="text-blue-200 text-lg">Complaints Resolved</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold mb-2">800+</div>
              <div className="text-blue-200 text-lg">Schools Trust Us</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-200 text-lg">Support Available</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-5xl font-bold mb-2">99%</div>
              <div className="text-blue-200 text-lg">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get your concerns addressed</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="gradient-bg text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">1</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Submit Complaint</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Fill out our comprehensive form with your concern details and supporting documentation</p>
            </div>
            <div className="text-center">
              <div className="gradient-bg text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">2</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Monitor the status of your complaint in real-time with detailed progress updates</p>
            </div>
            <div className="text-center">
              <div className="gradient-bg text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">3</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Resolution</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Receive timely updates and comprehensive resolution for your concern</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Trusted by students and administrators worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"COMPLANIFY has revolutionized how we handle student concerns. The transparency and efficiency are remarkable."</p>
              <div className="font-semibold text-gray-900">Sahara Gaudel</div>
              <div className="text-gray-500">Dean of Students, University College</div>
            </Card>
            
            <Card className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"Finally, a platform where my voice is heard! The tracking system keeps me informed every step of the way."</p>
              <div className="font-semibold text-gray-900">Monika Pun</div>
              <div className="text-gray-500">Computer Science Student</div>
            </Card>
            
            <Card className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"The analytics dashboard provides invaluable insights that help us improve our institution continuously."</p>
              <div className="font-semibold text-gray-900">Dr. Kiran Rana</div>
              <div className="text-gray-500">Academic Administrator</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Institution?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of educational institutions that trust COMPLANIFY for their complaint management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/student/signup">
              <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white hover:text-blue-600">
                Start as Student
              </Button>
            </Link>or
            <Link to="/admin/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Admin Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Logo size="md" className="mb-6" />
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Empowering educational institutions with efficient complaint management solutions. 
                Making student voices heard and fostering positive change.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 COMPLANIFY. All rights reserved. Made with ❤️ for educational excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;