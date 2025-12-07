import { useState, useRef } from 'react';
import { Search, Filter, Upload, Plus, ChevronLeft, ChevronRight, Clock, Eye, MoreVertical } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import AddEmployeeModal from '../../components/AddEmployeeModal';
import ViewEmployeeModal from '../../components/ViewEmployeeModal';

export interface Employee {
  id: string;
  employeeId: string;
  employeeName: string;
  contactNumber: string;
  createdTime: string;
  email: string;
  department: {
    type: string;
    manager?: string;
    avatar?: string;
  };
  priority: 'High' | 'Medium' | 'Low';
  status: 'Done' | 'In Progress' | 'To Do' | 'In Review';
  taskName?: string;
  taskGroup?: string;
  estimate?: string;
  deadline?: string;
  description?: string;
  firstName?: string;
  lastName?: string;
}

const AssignLeads = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    priority: '',
    dateRange: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 10;

  // Sample data - will be replaced with API call
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      employeeId: 'LD123',
      employeeName: 'Priya (Wedding)',
      contactNumber: '7686536789',
      createdTime: '2d 4h',
      email: 'priya@gmail.com',
      department: { type: 'Assignee', manager: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6938ef&color=fff' },
      priority: 'Medium',
      status: 'Done',
      firstName: 'Priya',
      lastName: '',
      taskName: 'Wedding Planning',
      taskGroup: 'Design',
      estimate: '2 weeks',
      deadline: '15/12/2025',
      description: 'Plan and execute wedding event'
    },
    {
      id: '2',
      employeeId: 'LD124',
      employeeName: 'Anu (birthday)',
      contactNumber: '7686536789',
      createdTime: '1d 2h',
      email: 'anu@gmail.com',
      department: { type: 'Assignee', manager: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff' },
      priority: 'Medium',
      status: 'In Progress',
      firstName: 'Anu',
      lastName: '',
      taskName: 'Birthday Party',
      taskGroup: 'Event Management',
      estimate: '1 week',
      deadline: '20/12/2025',
      description: 'Organize birthday celebration'
    },
    {
      id: '3',
      employeeId: 'LD125',
      employeeName: 'Abi (Pre-Wedding)',
      contactNumber: '7686536789',
      createdTime: '4d',
      email: 'abi@gmail.com',
      department: { type: 'Assignee', manager: 'Mike Johnson', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=3b82f6&color=fff' },
      priority: 'Low',
      status: 'In Progress',
      firstName: 'Abi',
      lastName: '',
      taskName: 'Pre-Wedding Shoot',
      taskGroup: 'Photography',
      estimate: '3 days',
      deadline: '25/12/2025',
      description: 'Coordinate pre-wedding photoshoot'
    },
    {
      id: '4',
      employeeId: 'LD126',
      employeeName: 'Vikram (Baby shower)',
      contactNumber: '7686536789',
      createdTime: '2d',
      email: 'vikram@gmail.com',
      department: { type: 'Assignee', manager: 'Sarah Wilson', avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=f59e0b&color=fff' },
      priority: 'Low',
      status: 'To Do',
      firstName: 'Vikram',
      lastName: '',
      taskName: 'Baby Shower',
      taskGroup: 'Event Planning',
      estimate: '1 week',
      deadline: '30/12/2025',
      description: 'Plan baby shower event'
    },
    {
      id: '5',
      employeeId: 'LD127',
      employeeName: 'Arjun (Wedding)',
      contactNumber: '7686536789',
      createdTime: '3d',
      email: 'arjun@gmail.com',
      department: { type: 'Assignee', manager: 'Tom Brown', avatar: 'https://ui-avatars.com/api/?name=Tom+Brown&background=ef4444&color=fff' },
      priority: 'Medium',
      status: 'In Review',
      firstName: 'Arjun',
      lastName: '',
      taskName: 'Wedding Ceremony',
      taskGroup: 'Coordination',
      estimate: '2 weeks',
      deadline: '10/01/2026',
      description: 'Full wedding coordination'
    },
    {
      id: '6',
      employeeId: 'LD128',
      employeeName: 'Arun (Wedding)',
      contactNumber: '7686536789',
      createdTime: '1d',
      email: 'arun@gmail.com',
      department: { type: 'Assignee', manager: 'Lisa Davis', avatar: 'https://ui-avatars.com/api/?name=Lisa+Davis&background=8b5cf6&color=fff' },
      priority: 'Low',
      status: 'In Progress',
      firstName: 'Arun',
      lastName: '',
      taskName: 'Wedding Reception',
      taskGroup: 'Catering',
      estimate: '1 week',
      deadline: '15/01/2026',
      description: 'Manage wedding reception'
    },
    {
      id: '7',
      employeeId: 'LD129',
      employeeName: 'Manjoj (Wedding)',
      contactNumber: '7686536789',
      createdTime: '5d',
      email: 'manoj@gmail.com',
      department: { type: 'Assignee', manager: 'David Lee', avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=14b8a6&color=fff' },
      priority: 'Low',
      status: 'In Progress',
      firstName: 'Manjoj',
      lastName: '',
      taskName: 'Wedding Decoration',
      taskGroup: 'Design',
      estimate: '1 week',
      deadline: '20/01/2026',
      description: 'Design and setup decorations'
    }
  ]);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.contactNumber.includes(searchQuery);
    
    const matchesStatus = !filters.status || employee.status === filters.status;
    const matchesDepartment = !filters.department || employee.department.type === filters.department;
    const matchesPriority = !filters.priority || employee.priority === filters.priority;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesPriority;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployee(selectedEmployee === employeeId ? null : employeeId);
  };

  const handleViewEmployee = (employee: Employee) => {
    setViewingEmployee(employee);
  };

  const handleSaveEmployee = (formData: any) => {
    // TODO: Add API call to save employee
    console.log('New employee data:', formData);
    const newEmployee: Employee = {
      id: String(employees.length + 1),
      employeeId: `LD${String(employees.length + 130).padStart(3, '0')}`,
      employeeName: `${formData.taskName || 'New Task'}`,
      contactNumber: formData.contactNumber || '',
      createdTime: 'Just now',
      email: formData.email || '',
      department: {
        type: formData.taskGroup || 'General',
        manager: formData.assignee,
        avatar: formData.assignee ? `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.assignee)}&background=6938ef&color=fff` : undefined
      },
      priority: formData.priority || 'Medium',
      status: 'To Do',
      firstName: formData.taskName?.split(' ')[0] || '',
      lastName: '',
      taskName: formData.taskName,
      taskGroup: formData.taskGroup,
      estimate: formData.estimate,
      deadline: formData.deadline,
      description: formData.description
    };
    setEmployees([...employees, newEmployee]);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(e => e.id === updatedEmployee.id ? updatedEmployee : e));
    setViewingEmployee(null);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (window.confirm('Are you sure you want to delete this employee assignment?')) {
      setEmployees(employees.filter(e => e.id !== employeeId));
      setViewingEmployee(null);
      const newFiltered = employees.filter(e => e.id !== employeeId);
      const newTotalPages = Math.ceil(newFiltered.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-orange-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return '↑';
      case 'Medium':
        return '↑';
      case 'Low':
        return '↓';
      default:
        return '';
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
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">ASSIGN LEADS</h1>
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    console.log('File selected:', e.target.files[0]);
                  }
                }}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                Bulk upload
              </button>
              <button 
                onClick={() => setShowAddEmployeeModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Assign employee
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
                showFilters || Object.values(filters).some(f => f !== '')
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
                  onClick={() => setFilters({ status: '', department: '', priority: '', dateRange: '' })}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={filters.department}
                    onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-sm"
                  >
                    <option value="">All Departments</option>
                    <option value="Assignee">Assignee</option>
                    <option value="Design">Design</option>
                    <option value="Event Management">Event Management</option>
                    <option value="Photography">Photography</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-sm"
                  >
                    <option value="">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
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
                  <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#e6edf5' }}>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => {}}
                        className="w-4 h-4 text-[#6938ef] border-gray-300 focus:ring-[#6938ef]"
                        disabled
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Employee ID</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Employee Name</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Contact Number</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Created time</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Department</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Priority</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">View</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map((employee) => (
                    <tr 
                      key={employee.id} 
                      className={`hover:bg-gray-50 transition-colors ${
                        selectedEmployee === employee.id ? 'bg-purple-50' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedEmployee === employee.id}
                          onChange={() => handleSelectEmployee(employee.id)}
                          className="w-4 h-4 text-[#6938ef] border-gray-300 focus:ring-[#6938ef] cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-900">{employee.employeeId}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-900">{employee.employeeName}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{employee.contactNumber}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{employee.createdTime}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{employee.email}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {employee.department.avatar && (
                            <img
                              src={employee.department.avatar}
                              alt={employee.department.manager}
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          <span className="text-xs sm:text-sm text-gray-600">{employee.department.type}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs sm:text-sm ${getPriorityColor(employee.priority)}`}>
                          {employee.priority} {getPriorityIcon(employee.priority)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => handleViewEmployee(employee)}
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
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 mt-6">
              <div className="flex items-center justify-center gap-4">
                <div className="text-sm text-gray-600">
                  {startIndex + 1}-{Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="text-gray-600 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="text-gray-600 disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <AddEmployeeModal 
          onClose={() => setShowAddEmployeeModal(false)}
          onSave={handleSaveEmployee}
        />
      )}

      {/* View Employee Modal */}
      {viewingEmployee && (
        <ViewEmployeeModal 
          employee={viewingEmployee}
          onClose={() => setViewingEmployee(null)}
          onUpdate={handleUpdateEmployee}
          onDelete={handleDeleteEmployee}
        />
      )}
    </div>
  );
};

export default AssignLeads;

