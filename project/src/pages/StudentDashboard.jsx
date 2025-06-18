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

        {/* Complaints Tab */}
        {activeTab === 'complaints' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">My Complaints</h1>
              <Button onClick={() => setShowComplaintModal(true)}>
                <Plus className="w-5 h-5 mr-2" />
                New Complaint
              </Button>
            </div>

            {/* Search and Filter */}
            <Card>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search className="w-5 h-5" />}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="input-field"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-review">In Review</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Complaints List */}
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <Card key={complaint.id}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(complaint.status)}`}>
                          {getStatusIcon(complaint.status)}
                          <span className="ml-1 capitalize">{complaint.status.replace('-', ' ')}</span>
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{complaint.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {complaint.date}
                        </span>
                        <span>Category: {complaint.category}</span>
                        <span className={`font-medium ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority.toUpperCase()} Priority
                        </span>
                      </div>

                      {complaint.response && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-center mb-2">
                            <MessageSquare className="w-4 h-4 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-blue-800">Admin Response</span>
                          </div>
                          <p className="text-sm text-blue-700">{complaint.response}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredComplaints.length === 0 && (
              <Card className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'You haven\'t submitted any complaints yet.'
                  }
                </p>
                {!searchTerm && filterStatus === 'all' && (
                  <Button onClick={() => setShowComplaintModal(true)}>
                    Submit Your First Complaint
                  </Button>
                )}
              </Card>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={user?.name || ''}
                  readOnly
                  className="bg-gray-50"
                />
                <Input
                  label="Email Address"
                  value={user?.email || ''}
                  readOnly
                  className="bg-gray-50"
                />
                <Input
                  label="Student ID"
                  value={user?.studentId || ''}
                  readOnly
                  className="bg-gray-50"
                />
                <Input
                  label="Role"
                  value="Student"
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Complaints</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{stats.resolved}</div>
                  <div className="text-sm text-gray-600">Resolved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Resolution Rate</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Complaint Modal */}
      {showComplaintModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Submit New Complaint</h2>
                <button
                  onClick={() => setShowComplaintModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitComplaint} className="space-y-6">
                <Input
                  label="Complaint Title"
                  placeholder="Brief description of your complaint"
                  value={complaintForm.title}
                  onChange={(e) => setComplaintForm({ ...complaintForm, title: e.target.value })}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide detailed information about your complaint"
                    value={complaintForm.description}
                    onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                    required
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={complaintForm.category}
                      onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
                      required
                      className="input-field"
                    >
                      <option value="">Select Category</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Food Services">Food Services</option>
                      <option value="Academic">Academic</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Library">Library</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={complaintForm.priority}
                      onChange={(e) => setComplaintForm({ ...complaintForm, priority: e.target.value })}
                      className="input-field"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach File (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setComplaintForm({ ...complaintForm, file: e.target.files[0] })}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowComplaintModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Complaint
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;