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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-blue-100 mb-6">
                Track your complaints and stay updated on their progress.
              </p>
              <Button
                onClick={() => setShowComplaintModal(true)}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Plus className="w-5 h-5 mr-2" />
                Submit New Complaint
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Complaints</div>
              </Card>

              <Card className="text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </Card>

              <Card className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.inReview}</div>
                <div className="text-sm text-gray-600">In Review</div>
              </Card>

              <Card className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.resolved}</div>
                <div className="text-sm text-gray-600">Resolved</div>
              </Card>
            </div>

            {/* Recent Complaints */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Complaints</h2>
                <Button
                  onClick={() => setActiveTab('complaints')}
                  variant="outline"
                  size="sm"
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {complaints.slice(0, 3).map((complaint) => (
                  <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{complaint.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{complaint.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {complaint.date}
                          </span>
                          <span className={`font-medium ${getPriorityColor(complaint.priority)}`}>
                            {complaint.priority.toUpperCase()} Priority
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(complaint.status)}`}>
                          {getStatusIcon(complaint.status)}
                          <span className="ml-1 capitalize">{complaint.status.replace('-', ' ')}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;