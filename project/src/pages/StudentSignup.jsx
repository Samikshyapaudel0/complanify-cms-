import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Car as IdCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(formData.name, formData.email, formData.password, formData.studentId);
      if (success) {
        showToast('Account created successfully! Welcome to COMPLANIFY.', 'success');
        navigate('/student/dashboard');
      } else {
        showToast('Registration failed. Please try again.', 'error');
      }
    } catch (err) {
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <Logo size="lg" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join thousands of students making their voices heard</p>
        </div>

        {/* Signup Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              icon={<User className="w-5 h-5" />}
              error={errors.name}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              icon={<Mail className="w-5 h-5" />}
              error={errors.email}
            />

            <Input
              label="Student ID"
              type="text"
              placeholder="Enter your student ID"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              required
              icon={<IdCard className="w-5 h-5" />}
              error={errors.studentId}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              icon={<Lock className="w-5 h-5" />}
              showPasswordToggle
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              icon={<Lock className="w-5 h-5" />}
              showPasswordToggle
              error={errors.confirmPassword}
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
              />
              <span className="ml-3 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
              </span>
            </div>

            <Button
              type="submit"
              loading={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/student/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentSignup;