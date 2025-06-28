import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Calendar,
  User,
  LogOut,
  BarChart3,
  MessageSquare,
  Upload
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [complaintForm, setComplaintForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    file: null
  });

  // Mock data for complaints
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: 'Library WiFi Issues',
      description: 'The WiFi connection in the library is very slow and frequently disconnects.',
      category: 'Infrastructure',
      status: 'pending',
      priority: 'high',
      date: '2025-01-15',
      response: null
    },
    {
      id: 2,
      title: 'Cafeteria Food Quality',
      description: 'The food quality in the cafeteria has declined significantly.',
      category: 'Food Services',
      status: 'in-review',
      priority: 'medium',
      date: '2025-01-12',
      response: 'We are investigating this matter and will respond within 48 hours.'
    },
    {
      id: 3,
      title: 'Classroom Air Conditioning',
      description: 'The AC in Room 204 is not working properly.',
      category: 'Infrastructure',
      status: 'resolved',
      priority: 'low',
      date: '2025-01-10',
      response: 'The AC has been repaired and is now functioning properly.'
    }
  ]);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    
    const newComplaint = {
      id: complaints.length + 1,
      ...complaintForm,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      response: null
    };
    
    setComplaints([newComplaint, ...complaints]);
    setComplaintForm({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      file: null
    });
    setShowComplaintModal(false);
    showToast('Complaint submitted successfully!', 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-review': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-review': return <AlertCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || complaint.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    inReview: complaints.filter(c => c.status === 'in-review').length,
    resolved: complaints.filter(c => c.status === 'resolved').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo size="md" />
            
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`font-medium transition-colors ${
                  activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('complaints')}
                className={`font-medium transition-colors ${
                  activeTab === 'complaints' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                My Complaints
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`font-medium transition-colors ${
                  activeTab === 'profile' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Profile
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      
    </div>
  );
};

export default StudentDashboard;