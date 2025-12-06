import { useState, useRef } from 'react';
import { Search, Filter, Upload, Plus, RefreshCw, Edit, Eye, ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

interface Lead {
  id: string;
  leadId: string;
  leadName: string;
  contactNumber: string;
  createdTime: string;
  email: string;
  leadSource: {
    type: string;
    assignee?: string;
    avatar?: string;
  };
  status: 'Done' | 'In Progress' | 'To Do' | 'In Review';
}

const ViewLeads = () => {
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    leadSource: '',
    dateRange: '',
    assignee: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 10;

  // Sample data - will be replaced with API call
  const [leads] = useState<Lead[]>([
    {
      id: '1',
      leadId: 'LD123',
      leadName: 'Priya (Wedding)',
      contactNumber: '7686536789',
      createdTime: '2d 4h',
      email: 'priya@gmail.com',
      leadSource: { type: 'Assignee', assignee: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6938ef&color=fff' },
      status: 'Done'
    },
    {
      id: '2',
      leadId: 'LD123',
      leadName: 'Anu (birthday)',
      contactNumber: '7686536789',
      createdTime: '1d 2h',
      email: 'anu@gmail.com',
      leadSource: { type: 'Assignee', assignee: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff' },
      status: 'In Progress'
    },
    {
      id: '3',
      leadId: 'LD123',
      leadName: 'Abi (Pre-Wedding)',
      contactNumber: '7686536789',
      createdTime: '4d',
      email: 'abi@gmail.com',
      leadSource: { type: 'Assignee', assignee: 'Mike Johnson', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=3b82f6&color=fff' },
      status: 'To Do'
    },
    {
      id: '4',
      leadId: 'LD123',
      leadName: 'Vikram (Baby shower)',
      contactNumber: '7686536789',
      createdTime: '2d',
      email: 'vikram@gmail.com',
      leadSource: { type: 'Assignee', assignee: 'Sarah Wilson', avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=f59e0b&color=fff' },
      status: 'In Review'
    },
    {
      id: '5',
      leadId: 'LD123',
      leadName: 'Arjun (Wedding)',
      contactNumber: '7686536789',
      createdTime: '3d',
      email: 'arjun@gmail.com',
      leadSource: { type: 'Assignee', assignee: 'Tom Brown', avatar: 'https://ui-avatars.com/api/?name=Tom+Brown&background=ef4444&color=fff' },
      status: 'Done'
    },
    {
      id: '6',
      leadId: 'LD123',
      leadName: 'Arun (Wedding)',
      contactNumber: '7686536789',
      createdTime: '1d',
      email: 'arun@gmail.com',
      leadSource: { type: 'Assignee', assignee: 'Lisa Davis', avatar: 'https://ui-avatars.com/api/?name=Lisa+Davis&background=8b5cf6&color=fff' },
      status: 'In Progress'
    },
    {
      id: '7',
      leadId: 'LD123',
      leadName: 'Manjoj (Wedding)',
      contactNumber: '7686536789',
      createdTime: '5d',
      email: 'manoj@gmail.com',
      leadSource: { type: 'Assignee', assignee: 'David Lee', avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=14b8a6&color=fff' },
      status: 'To Do'
    },
    {
      id: '8',
      leadId: 'LD123',
      leadName: 'Arjun (Wedding)',
      contactNumber: '7686536789',
      createdTime: '2d',
      email: 'arjun@gmail.com',
      leadSource: { type: 'Assignee', assignee: 'Emma White', avatar: 'https://ui-avatars.com/api/?name=Emma+White&background=ec4899&color=fff' },
      status: 'In Review'
    }
  ]);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.leadId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactNumber.includes(searchQuery);
    
    const matchesStatus = !filters.status || lead.status === filters.status;
    const matchesSource = !filters.leadSource || lead.leadSource.type === filters.leadSource;
    const matchesAssignee = !filters.assignee || lead.leadSource.assignee === filters.assignee;
    
    return matchesSearch && matchesStatus && matchesSource && matchesAssignee;
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  const handleSelectLead = (leadId: string) => {
    setSelectedLead(selectedLead === leadId ? null : leadId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'To Do':
        return 'bg-gray-100 text-gray-800';
      case 'In Review':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      leadSource: '',
      dateRange: '',
      assignee: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  // Get unique assignees for filter dropdown
  const uniqueAssignees = Array.from(new Set(leads.map(lead => lead.leadSource.assignee).filter(Boolean)));

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-50 flex overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 w-full">
          {/* Title and Action Buttons */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">VIEW LEADS</h1>
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // Handle file upload - will be replaced with API call
                    console.log('File selected:', e.target.files[0]);
                    // TODO: Add file upload logic
                  }
                }}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#6938ef] text-white rounded-lg font-semibold hover:bg-[#5a2dd4] transition-colors text-sm sm:text-base"
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                Bulk Upload
              </button>
              <button 
                onClick={() => setShowAddLeadModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#6938ef] text-white rounded-lg font-semibold hover:bg-[#5a2dd4] transition-colors text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Add Lead
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-64 sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 border rounded-lg transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-[#6938ef] text-white border-[#6938ef]'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#6938ef] hover:underline"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-sm"
                  >
                    <option value="">All Status</option>
                    <option value="Done">Done</option>
                    <option value="In Progress">In Progress</option>
                    <option value="To Do">To Do</option>
                    <option value="In Review">In Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                  <select
                    value={filters.leadSource}
                    onChange={(e) => setFilters({ ...filters, leadSource: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-sm"
                  >
                    <option value="">All Sources</option>
                    <option value="Assignee">Assignee</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                  <select
                    value={filters.assignee}
                    onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-sm"
                  >
                    <option value="">All Assignees</option>
                    {uniqueAssignees.map((assignee) => (
                      <option key={assignee} value={assignee}>
                        {assignee}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-sm"
                  >
                    <option value="">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300" style={{ backgroundColor: '#e6edf5' }}>
                    <th className="px-6 py-5 text-left">
                      <input
                        type="radio"
                        checked={false}
                        onChange={() => {}}
                        className="w-5 h-5 text-[#6938ef] border-gray-300 focus:ring-[#6938ef]"
                        disabled
                      />
                    </th>
                    <th className="px-6 py-5 text-left text-base sm:text-lg font-bold text-gray-700 uppercase">Lead ID</th>
                    <th className="px-6 py-5 text-left text-base sm:text-lg font-bold text-gray-700 uppercase">Lead Name</th>
                    <th className="px-6 py-5 text-left text-base sm:text-lg font-bold text-gray-700 uppercase">Contact Number</th>
                    <th className="px-6 py-5 text-left text-base sm:text-lg font-bold text-gray-700 uppercase">Created time</th>
                    <th className="px-6 py-5 text-left text-base sm:text-lg font-bold text-gray-700 uppercase">Email</th>
                    <th className="px-6 py-5 text-left text-base sm:text-lg font-bold text-gray-700 uppercase">Lead source</th>
                    <th className="px-6 py-5 text-left text-base sm:text-lg font-bold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-5 text-left text-base sm:text-lg font-bold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className={`hover:bg-gray-50 transition-colors ${
                        selectedLead === lead.id ? 'bg-purple-50' : ''
                      }`}
                    >
                      <td className="px-6 py-5">
                        <input
                          type="radio"
                          name="lead-selection"
                          checked={selectedLead === lead.id}
                          onChange={() => handleSelectLead(lead.id)}
                          className="w-5 h-5 text-[#6938ef] border-gray-300 focus:ring-[#6938ef] cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-5 text-base sm:text-lg text-gray-900 font-semibold">{lead.leadId}</td>
                      <td className="px-6 py-5 text-base sm:text-lg text-gray-900 font-semibold">{lead.leadName}</td>
                      <td className="px-6 py-5 text-base sm:text-lg text-gray-600 font-medium">{lead.contactNumber}</td>
                      <td className="px-6 py-5 text-base sm:text-lg text-gray-600 font-medium">{lead.createdTime}</td>
                      <td className="px-6 py-5 text-base sm:text-lg text-gray-600 font-medium">{lead.email}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {lead.leadSource.avatar && (
                            <img
                              src={lead.leadSource.avatar}
                              alt={lead.leadSource.assignee}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <span className="text-base sm:text-lg text-gray-600 font-medium">{lead.leadSource.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm sm:text-base font-semibold ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Refresh">
                            <RefreshCw className="w-5 h-5 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                            <Edit className="w-5 h-5 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                            <Eye className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 mt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredLeads.length)} of {filteredLeads.length} leads
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center"
                    title="First page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <ChevronLeft className="w-4 h-4 -ml-3" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[#6938ef] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a2dd4] transition-colors text-sm font-medium"
                  >
                    Prev
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(4, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 4) {
                        pageNum = i + 1;
                      } else if (currentPage <= 2) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 1) {
                        pageNum = totalPages - 3 + i;
                      } else {
                        pageNum = currentPage - 1 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-[#6938ef] text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center"
                    title="Last page"
                  >
                    <ChevronRight className="w-4 h-4" />
                    <ChevronRight className="w-4 h-4 -ml-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Lead Modal */}
          {showAddLeadModal && (
            <AddLeadModal onClose={() => setShowAddLeadModal(false)} />
          )}
        </main>
      </div>
    </div>
  );
};

// Add Lead Modal Component
interface AddLeadModalProps {
  onClose: () => void;
}

const AddLeadModal = ({ onClose }: AddLeadModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    priority: '',
    contactNumber: '',
    address: '',
    eventType: '',
    leadSource: '',
    budget: '',
    eventDate: '',
    assignee: '',
    description: ''
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to save lead
    console.log('Form data:', formData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Leads</h2>
            <p className="text-sm text-gray-500 mt-1">{currentDate}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Communication Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Communication Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="">Choose the priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.contactNumber}
                  onChange={(e) => handleChange('contactNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => handleChange('eventType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="">Select event type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Pre-Wedding">Pre-Wedding</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                <select
                  value={formData.leadSource}
                  onChange={(e) => handleChange('leadSource', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="">Select lead source</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Assignee">Assignee</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget (Optional)</label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="">Choose budget</option>
                  <option value="0-10000">$0 - $10,000</option>
                  <option value="10000-25000">$10,000 - $25,000</option>
                  <option value="25000-50000">$25,000 - $50,000</option>
                  <option value="50000+">$50,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                <div className="relative">
                  <input
                    type="date"
                    placeholder="Choose event date"
                    value={formData.eventDate}
                    onChange={(e) => handleChange('eventDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                <select
                  value={formData.assignee}
                  onChange={(e) => handleChange('assignee', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="">Select Assignee</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Add some description of the task"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-lg font-semibold hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-lg"
            >
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewLeads;
