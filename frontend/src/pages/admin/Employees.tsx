import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import AddEmployeeModal from '../../components/AddEmployeeModal';

interface Employee {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  gender: string;
  dob: string;
  position: string;
  positionLevel: string;
  contact: string;
  avatar: string;
  backlogTasks: number;
  tasksInProgress: number;
  tasksInReview: number;
  status?: 'active' | 'on-leave';
}

const Employees = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'list' | 'activity'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const itemsPerPage = 8;

  // Sample data - will be replaced with API call
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Lenora Fowler',
      email: 'eravi@ec.gov',
      employeeId: 'EM123',
      gender: 'Female',
      dob: 'Apr 28, 1998',
      position: 'photographer',
      positionLevel: 'Junior',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Lenora+Fowler&background=6938ef&color=fff',
      backlogTasks: 5,
      tasksInProgress: 3,
      tasksInReview: 2
    },
    {
      id: '2',
      name: 'Shawn Stone',
      email: 'Manoj@gmail.com',
      employeeId: 'EM124',
      gender: 'Male',
      dob: 'May 15, 1995',
      position: 'Designer',
      positionLevel: 'Middle',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Shawn+Stone&background=10b981&color=fff',
      backlogTasks: 8,
      tasksInProgress: 4,
      tasksInReview: 1
    },
    {
      id: '3',
      name: 'Randy Delgado',
      email: 'Manoj@gmail.com',
      employeeId: 'EM125',
      gender: 'Male',
      dob: 'Jun 20, 1992',
      position: 'Copywriter',
      positionLevel: 'Senior',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Randy+Delgado&background=3b82f6&color=fff',
      backlogTasks: 3,
      tasksInProgress: 6,
      tasksInReview: 3
    },
    {
      id: '4',
      name: 'Ethel Weber',
      email: 'Manoj@gmail.com',
      employeeId: 'EM126',
      gender: 'Female',
      dob: 'Jul 10, 1990',
      position: 'Designer',
      positionLevel: 'Middle',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Ethel+Weber&background=f59e0b&color=fff',
      backlogTasks: 2,
      tasksInProgress: 5,
      tasksInReview: 4,
      status: 'on-leave'
    },
    {
      id: '5',
      name: 'Manoj Kumar',
      email: 'Manoj@gmail.com',
      employeeId: 'EM127',
      gender: 'Male',
      dob: 'Aug 5, 1988',
      position: 'Sales Manager',
      positionLevel: 'Senior',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Manoj+Kumar&background=ef4444&color=fff',
      backlogTasks: 7,
      tasksInProgress: 2,
      tasksInReview: 5
    },
    {
      id: '6',
      name: 'Priya Sharma',
      email: 'Manoj@gmail.com',
      employeeId: 'EM128',
      gender: 'Female',
      dob: 'Sep 12, 1993',
      position: 'photographer',
      positionLevel: 'Junior',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=8b5cf6&color=fff',
      backlogTasks: 4,
      tasksInProgress: 7,
      tasksInReview: 1
    },
    {
      id: '7',
      name: 'Arjun Patel',
      email: 'Manoj@gmail.com',
      employeeId: 'EM129',
      gender: 'Male',
      dob: 'Oct 18, 1996',
      position: 'Designer',
      positionLevel: 'Middle',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Arjun+Patel&background=06b6d4&color=fff',
      backlogTasks: 6,
      tasksInProgress: 3,
      tasksInReview: 2
    },
    {
      id: '8',
      name: 'Deepa Singh',
      email: 'Manoj@gmail.com',
      employeeId: 'EM130',
      gender: 'Female',
      dob: 'Nov 25, 1994',
      position: 'Copywriter',
      positionLevel: 'Junior',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Deepa+Singh&background=ec4899&color=fff',
      backlogTasks: 3,
      tasksInProgress: 4,
      tasksInReview: 6
    },
  ]);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handleEmployeeClick = (employee: Employee) => {
    navigate('/admin/employees/profile', {
      state: {
        employee: {
          employeeName: employee.name,
          employeeId: employee.employeeId,
          contactNumber: employee.contact,
          email: employee.email,
          position: employee.position,
          avatar: employee.avatar,
          location: 'NYC, New York, USA'
        }
      }
    });
  };

  const handleActivityClick = () => {
    navigate('/admin/employees/activity');
  };

  const getPositionLevelColor = (level: string) => {
    if (level === 'Senior') return 'bg-purple-100 text-purple-800';
    if (level === 'Middle') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 w-full">
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Employees ({employees.length})</h1>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-md p-3 border border-gray-100 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Q Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs"
                />
              </div>
              <button className="p-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Tabs and Add Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => setCurrentView('list')}
                className={`px-4 py-1.5 rounded-md font-medium text-xs transition-all ${
                  currentView === 'list'
                    ? 'bg-[#6938ef] text-white'
                    : 'text-[#6938ef] hover:bg-gray-50'
                }`}
              >
                List
              </button>
              <button
                onClick={handleActivityClick}
                className={`px-4 py-1.5 rounded-md font-medium text-xs transition-all ${
                  currentView === 'activity'
                    ? 'bg-[#6938ef] text-white'
                    : 'text-[#6938ef] hover:bg-gray-50'
                }`}
              >
                Activity
              </button>
            </div>
            <button
              onClick={() => setShowAddEmployeeModal(true)}
              className="px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Employee
            </button>
          </div>

          {/* Employee Cards Grid */}
          {currentView === 'list' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
              {currentEmployees.map((employee) => (
                <div
                  key={employee.id}
                  onClick={() => handleEmployeeClick(employee)}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer relative"
                >
                  {employee.status === 'on-leave' && (
                    <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-bold">
                      On Leave
                    </div>
                  )}
                  <div className="text-center mb-3">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-16 h-16 rounded-full mx-auto mb-2"
                    />
                    <h3 className="text-sm font-bold text-gray-900">{employee.name}</h3>
                    <p className="text-xs text-gray-600">{employee.position}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mt-1 ${getPositionLevelColor(employee.positionLevel)}`}>
                      {employee.positionLevel}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{employee.backlogTasks}</p>
                      <p className="text-xs text-gray-500">Backlog tasks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{employee.tasksInProgress}</p>
                      <p className="text-xs text-gray-500">Tasks In Progress</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{employee.tasksInReview}</p>
                      <p className="text-xs text-gray-500">Tasks In Review</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-xl shadow-md p-3 border border-gray-100">
              <div className="flex items-center justify-end gap-2">
                <div className="text-xs text-gray-600">
                  {startIndex + 1}-{Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length}
                </div>
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
          )}
        </main>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <AddEmployeeModal
          onClose={() => setShowAddEmployeeModal(false)}
          onSave={(formData) => {
            // Handle save logic
            console.log('Employee saved:', formData);
            setShowAddEmployeeModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Employees;
