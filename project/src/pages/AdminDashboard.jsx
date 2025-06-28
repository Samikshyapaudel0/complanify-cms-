import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Calendar,
  User,
  LogOut,
  BarChart3,
  Users,
  TrendingUp,
  Download,
  MessageSquare,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  
  // Mock data for all complaints
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: 'Library WiFi Issues',
      description: 'The WiFi connection in the library is very slow and frequently disconnects.',
      category: 'Infrastructure',
      status: 'pending',
      priority: 'high',
      date: '2025-01-15',
      studentName: 'John Doe',
      studentId: 'STU001',
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
      studentName: 'Jane Smith',
      studentId: 'STU002',
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
      studentName: 'Mike Johnson',
      studentId: 'STU003',
      response: 'The AC has been repaired and is now functioning properly.'
    },
    {
      id: 4,
      title: 'Parking Space Shortage',
      description: 'There are not enough parking spaces for students.',
      category: 'Infrastructure',
      status: 'pending',
      priority: 'medium',
      date: '2025-01-14',
      studentName: 'Sarah Wilson',
      studentId: 'STU004',
      response: null
    },
    {
      id: 5,
      title: 'Lab Equipment Malfunction',
      description: 'Several computers in the computer lab are not working.',
      category: 'Academic',
      status: 'in-review',
      priority: 'high',
      date: '2025-01-13',
      studentName: 'David Brown',
      studentId: 'STU005',
      response: 'IT team has been notified and will fix the issue by tomorrow.'
    }
  ]);

  const [updateForm, setUpdateForm] = useState({
    status: '',
    response: ''
  });

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    navigate('/');
  };

  const handleUpdateComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setUpdateForm({
      status: complaint.status,
      response: complaint.response || ''
    });
    setShowUpdateModal(true);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    
    setComplaints(complaints.map(complaint => 
      complaint.id === selectedComplaint.id 
        ? { ...complaint, status: updateForm.status, response: updateForm.response }
        : complaint
    ));
    
    setShowUpdateModal(false);
    showToast('Complaint updated successfully!', 'success');
  };

  const handleDeleteComplaint = (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      setComplaints(complaints.filter(complaint => complaint.id !== id));
      showToast('Complaint deleted successfully!', 'success');
    }
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
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || complaint.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    inReview: complaints.filter(c => c.status === 'in-review').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    students: new Set(complaints.map(c => c.studentId)).size
  };

  const categoryStats = complaints.reduce((acc, complaint) => {
    acc[complaint.category] = (acc[complaint.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Logo size="md" />
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Admin Portal</span>
              </div>
            </div>
            
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
                Manage Complaints
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`font-medium transition-colors ${
                  activeTab === 'analytics' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Analytics
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
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-blue-100 mb-6">
                Monitor and manage all student complaints efficiently.
              </p>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setActiveTab('complaints')}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Manage Complaints
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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

              <Card className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stats.students}</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </Card>
            </div>

            {/* Recent Complaints */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                          <p className="text-gray-600 text-sm mb-2">{complaint.description.substring(0, 100)}...</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{complaint.studentName}</span>
                            <span>{complaint.date}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(complaint.status)}`}>
                          {getStatusIcon(complaint.status)}
                          <span className="ml-1 capitalize">{complaint.status.replace('-', ' ')}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Complaints by Category</h2>
                <div className="space-y-4">
                  {Object.entries(categoryStats).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-gray-700">{category}</span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-blue-200 rounded-full h-2 w-20">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(count / stats.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Complaints Management Tab */}
        {activeTab === 'complaints' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Manage Complaints</h1>
              <Button>
                <Download className="w-5 h-5 mr-2" />
                Export Data
              </Button>
            </div>

            {/* Search and Filter */}
            <Card>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search complaints, students..."
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

            {/* Complaints Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Complaint</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Priority</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{complaint.title}</div>
                            <div className="text-sm text-gray-600">{complaint.description.substring(0, 60)}...</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{complaint.studentName}</div>
                            <div className="text-sm text-gray-600">{complaint.studentId}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{complaint.category}</td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${getPriorityColor(complaint.priority)}`}>
                            {complaint.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusColor(complaint.status)}`}>
                            {getStatusIcon(complaint.status)}
                            <span className="ml-1 capitalize">{complaint.status.replace('-', ' ')}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{complaint.date}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleUpdateComplaint(complaint)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Update"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteComplaint(complaint.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredComplaints.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints found</h3>
                  <p className="text-gray-600">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'No complaints have been submitted yet.'
                    }
                  </p>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Resolution Rate</div>
              </Card>

              <Card className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.total > 0 ? (stats.total / 30).toFixed(1) : 0}
                </div>
                <div className="text-sm text-gray-600">Avg. Daily Complaints</div>
              </Card>

              <Card className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">2.5</div>
                <div className="text-sm text-gray-600">Avg. Resolution Days</div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Complaint Categories</h2>
                <div className="space-y-3">
                  {Object.entries(categoryStats).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-gray-700">{category}</span>
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-200 rounded-full h-2 w-24">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(count / stats.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Pending</span>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-200 rounded-full h-2 w-24">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${(stats.pending / stats.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{stats.pending}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">In Review</span>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-200 rounded-full h-2 w-24">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(stats.inReview / stats.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{stats.inReview}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Resolved</span>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-200 rounded-full h-2 w-24">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(stats.resolved / stats.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{stats.resolved}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Update Complaint Modal */}
      {showUpdateModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Update Complaint</h2>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{selectedComplaint.title}</h3>
                <p className="text-gray-600 mb-2">{selectedComplaint.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Student: {selectedComplaint.studentName}</span>
                  <span>Category: {selectedComplaint.category}</span>
                  <span>Date: {selectedComplaint.date}</span>
                </div>
              </div>

              <form onSubmit={handleSubmitUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={updateForm.status}
                    onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                    required
                    className="input-field"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-review">In Review</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Response
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide response or update to the student"
                    value={updateForm.response}
                    onChange={(e) => setUpdateForm({ ...updateForm, response: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Update Complaint
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

export default AdminDashboard;