import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Upload, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import AddLeadModal from '../../components/AddLeadModal';
import ViewLeadModal from '../../components/ViewLeadModal';

export interface Lead {
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
  address?: string;
  eventDate?: string;
  budget?: string;
  eventType?: string;
  firstName?: string;
  lastName?: string;
}

const ViewLeads = () => {
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    leadSource: '',
    dateRange: '',
    assignee: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 10;

  // Sample data - will be replaced with API call
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      leadId: 'LD123',
      leadName: 'Priya (Wedding)',
      contactNumber: '8765434567',
      createdTime: '2d 4h',
      email: 'priya@gmail.com',
      leadSource: { type: 'Instagram', assignee: 'Ramesh', avatar: 'https://ui-avatars.com/api/?name=Ramesh&background=6938ef&color=fff' },
      status: 'Done',
      firstName: 'Priya',
      lastName: '',
      address: '65, park street, Anna nagar chennai',
      eventDate: '29/11/2025',
      budget: '100000',
      eventType: 'Marriage'
    },
    {
      id: '2',
      leadId: 'LD124',
      leadName: 'Anu (birthday)',
      contactNumber: '7686536789',
      createdTime: '1d 2h',
      email: 'anu@gmail.com',
      leadSource: { type: 'Website', assignee: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff' },
      status: 'In Progress',
      firstName: 'Anu',
      lastName: '',
      address: '123 Main Street, Bangalore',
      eventDate: '15/12/2025',
      budget: '50000',
      eventType: 'Birthday'
    },
    {
      id: '3',
      leadId: 'LD125',
      leadName: 'Abi (Pre-Wedding)',
      contactNumber: '7686536789',
      createdTime: '4d',
      email: 'abi@gmail.com',
      leadSource: { type: 'Referral', assignee: 'Mike Johnson', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=3b82f6&color=fff' },
      status: 'To Do',
      firstName: 'Abi',
      lastName: '',
      address: '45 Park Avenue, Mumbai',
      eventDate: '20/12/2025',
      budget: '75000',
      eventType: 'Pre-Wedding'
    },
    {
      id: '4',
      leadId: 'LD126',
      leadName: 'Vikram (Baby shower)',
      contactNumber: '7686536789',
      createdTime: '2d',
      email: 'vikram@gmail.com',
      leadSource: { type: 'Social Media', assignee: 'Sarah Wilson', avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=f59e0b&color=fff' },
      status: 'In Review',
      firstName: 'Vikram',
      lastName: '',
      address: '12 Main Road, Delhi',
      eventDate: '10/01/2026',
      budget: '30000',
      eventType: 'Baby Shower'
    },
    {
      id: '5',
      leadId: 'LD127',
      leadName: 'Arjun (Wedding)',
      contactNumber: '7686536789',
      createdTime: '3d',
      email: 'arjun@gmail.com',
      leadSource: { type: 'Website', assignee: 'Tom Brown', avatar: 'https://ui-avatars.com/api/?name=Tom+Brown&background=ef4444&color=fff' },
      status: 'Done',
      firstName: 'Arjun',
      lastName: '',
      address: '78 Cross Street, Pune',
      eventDate: '05/12/2025',
      budget: '150000',
      eventType: 'Wedding'
    },
    {
      id: '6',
      leadId: 'LD128',
      leadName: 'Arun (Wedding)',
      contactNumber: '7686536789',
      createdTime: '1d',
      email: 'arun@gmail.com',
      leadSource: { type: 'Instagram', assignee: 'Lisa Davis', avatar: 'https://ui-avatars.com/api/?name=Lisa+Davis&background=8b5cf6&color=fff' },
      status: 'In Progress',
      firstName: 'Arun',
      lastName: '',
      address: '90 High Street, Hyderabad',
      eventDate: '25/12/2025',
      budget: '120000',
      eventType: 'Wedding'
    },
    {
      id: '7',
      leadId: 'LD129',
      leadName: 'Manjoj (Wedding)',
      contactNumber: '7686536789',
      createdTime: '5d',
      email: 'manoj@gmail.com',
      leadSource: { type: 'Referral', assignee: 'David Lee', avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=14b8a6&color=fff' },
      status: 'To Do',
      firstName: 'Manjoj',
      lastName: '',
      address: '34 Market Street, Kolkata',
      eventDate: '15/01/2026',
      budget: '200000',
      eventType: 'Wedding'
    },
    {
      id: '8',
      leadId: 'LD130',
      leadName: 'Arjun (Wedding)',
      contactNumber: '7686536789',
      createdTime: '2d',
      email: 'arjun2@gmail.com',
      leadSource: { type: 'Website', assignee: 'Emma White', avatar: 'https://ui-avatars.com/api/?name=Emma+White&background=ec4899&color=fff' },
      status: 'In Review',
      firstName: 'Arjun',
      lastName: 'Kumar',
      address: '56 Garden Road, Bangalore',
      eventDate: '30/11/2025',
      budget: '180000',
      eventType: 'Wedding'
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

  const handleViewLead = (lead: Lead) => {
    setViewingLead(lead);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
    setViewingLead(null);
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(l => l.id !== leadId));
      setViewingLead(null);
      const newFiltered = leads.filter(l => l.id !== leadId);
      const newTotalPages = Math.ceil(newFiltered.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleSaveLead = (formData: any) => {
    // TODO: Add API call to save lead
    console.log('New lead data:', formData);
    // Add the new lead to the leads array
    const newLead: Lead = {
      id: String(leads.length + 1),
      leadId: `LD${String(leads.length + 131).padStart(3, '0')}`,
      leadName: `${formData.firstName}${formData.lastName ? ' ' + formData.lastName : ''}${formData.eventType ? ' (' + formData.eventType + ')' : ''}`,
      contactNumber: formData.contactNumber,
      createdTime: 'Just now',
      email: formData.email,
      leadSource: {
        type: formData.leadSource,
        assignee: formData.assignee,
        avatar: formData.assignee ? `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.assignee)}&background=6938ef&color=fff` : undefined
      },
      status: 'To Do',
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      eventDate: formData.eventDate,
      budget: formData.budget,
      eventType: formData.eventType
    };
    setLeads([...leads, newLead]);
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

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 w-full">
          {/* Title and Action Buttons */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">VIEW LEADS</h1>
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
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                Bulk Upload
              </button>
              <button 
                onClick={() => setShowAddLeadModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Lead
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-48 sm:w-64">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent text-xs"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 border rounded-lg transition-colors ${
                showFilters || Object.values(filters).some(f => f !== '')
                  ? 'bg-[#6938ef] text-white border-[#6938ef]'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setFilters({ status: '', leadSource: '', dateRange: '', assignee: '' })}
                  className="text-xs text-[#6938ef] hover:underline"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs"
                  >
                    <option value="">All Status</option>
                    <option value="Done">Done</option>
                    <option value="In Progress">In Progress</option>
                    <option value="To Do">To Do</option>
                    <option value="In Review">In Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Lead Source</label>
                  <select
                    value={filters.leadSource}
                    onChange={(e) => setFilters({ ...filters, leadSource: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs"
                  >
                    <option value="">All Sources</option>
                    <option value="Assignee">Assignee</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Assignee</label>
                  <select
                    value={filters.assignee}
                    onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs"
                  >
                    <option value="">All Assignees</option>
                    {Array.from(new Set(leads.map(l => l.leadSource.assignee).filter(Boolean))).map((assignee) => (
                      <option key={assignee} value={assignee}>
                        {assignee}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Date Range</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs"
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
                  <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#e6edf5' }}>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="radio"
                        checked={false}
                        onChange={() => {}}
                        className="w-4 h-4 text-[#6938ef] border-gray-300 focus:ring-[#6938ef]"
                        disabled
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Lead ID</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Lead Name</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Contact Number</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Created time</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Lead source</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">View</th>
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
                      <td className="px-4 py-3">
                        <input
                          type="radio"
                          name="lead-selection"
                          checked={selectedLead === lead.id}
                          onChange={() => handleSelectLead(lead.id)}
                          className="w-4 h-4 text-[#6938ef] border-gray-300 focus:ring-[#6938ef] cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-900">{lead.leadId}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-900">{lead.leadName}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{lead.contactNumber}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{lead.createdTime}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{lead.email}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {lead.leadSource.avatar && (
                            <img
                              src={lead.leadSource.avatar}
                              alt={lead.leadSource.assignee}
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          <span className="text-xs sm:text-sm text-gray-600">{lead.leadSource.type}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block ${lead.status === 'In Progress' ? 'px-3 py-0.5' : 'px-2 py-0.5'} rounded-full text-xs font-bold ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => handleViewLead(lead)}
                          className="px-2.5 py-1 rounded-md font-medium text-xs transition-all hover:shadow-sm"
                          style={{
                            backgroundColor: 'rgba(105, 56, 239, 0.1)',
                            color: '#6938ef',
                            border: '1px solid rgba(105, 56, 239, 0.3)'
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-xl shadow-md p-3 border border-gray-100 mt-4">
              <div className="flex items-center justify-center gap-3">
                <div className="text-xs text-gray-600">
                  {startIndex + 1}-{Math.min(endIndex, filteredLeads.length)} of {filteredLeads.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="text-gray-600 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="text-gray-600 disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Add Lead Modal - Outside main container for proper z-index */}
      {showAddLeadModal && (
        <AddLeadModal 
          onClose={() => setShowAddLeadModal(false)}
          onSave={handleSaveLead}
        />
      )}

      {/* View Lead Modal */}
      {viewingLead && (
        <ViewLeadModal
          lead={viewingLead}
          onClose={() => setViewingLead(null)}
          onUpdate={handleUpdateLead}
          onDelete={handleDeleteLead}
        />
      )}

    </div>
  );
};

export default ViewLeads;
