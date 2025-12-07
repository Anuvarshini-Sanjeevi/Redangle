import { useState, useEffect, useRef } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import LeaveRequestModal from '../../components/LeaveRequestModal';

interface LeaveRequest {
  id: string;
  serialNo: number;
  name: string;
  date: string;
  fromTime: string;
  toTime: string;
  leaveType: string;
  reason: string;
  empId: string;
  totalDays: number;
  fromDate: string;
  toDate: string;
}

const Approval = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingRequest, setViewingRequest] = useState<LeaveRequest | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filterLeaveType, setFilterLeaveType] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilter]);

  // Sample data - will be replaced with API call
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      serialNo: 1,
      name: 'Arun',
      date: '2025-11-25',
      fromTime: '2025-11-25T15:28:08:507Z',
      toTime: '2025-11-25T15:28:08:507Z',
      leaveType: 'Permission',
      reason: 'personal',
      empId: 'EMP - 1024',
      totalDays: 1,
      fromDate: '12-11-2025',
      toDate: '13-11-2025'
    },
    {
      id: '2',
      serialNo: 2,
      name: 'Deepa',
      date: '2025-11-25',
      fromTime: '2025-11-25T15:28:08:507Z',
      toTime: '2025-11-25T15:28:08:507Z',
      leaveType: 'Leave',
      reason: 'Sick',
      empId: 'EMP - 1025',
      totalDays: 1,
      fromDate: '12-11-2025',
      toDate: '13-11-2025'
    },
    {
      id: '3',
      serialNo: 3,
      name: 'Oviya',
      date: '2025-11-25',
      fromTime: '2025-11-25T15:28:08:507Z',
      toTime: '2025-11-25T15:28:08:507Z',
      leaveType: 'Permission',
      reason: 'personal',
      empId: 'EMP - 1026',
      totalDays: 1,
      fromDate: '12-11-2025',
      toDate: '13-11-2025'
    },
    {
      id: '4',
      serialNo: 4,
      name: 'Priya',
      date: '2025-11-25',
      fromTime: '2025-11-25T15:28:08:507Z',
      toTime: '2025-11-25T15:28:08:507Z',
      leaveType: 'Leave',
      reason: 'Sick',
      empId: 'EMP - 1027',
      totalDays: 1,
      fromDate: '12-11-2025',
      toDate: '13-11-2025'
    },
    {
      id: '5',
      serialNo: 5,
      name: 'Deepak',
      date: '2025-11-25',
      fromTime: '2025-11-25T15:28:08:507Z',
      toTime: '2025-11-25T15:28:08:507Z',
      leaveType: 'Permission',
      reason: 'personal',
      empId: 'EMP - 1028',
      totalDays: 1,
      fromDate: '12-11-2025',
      toDate: '13-11-2025'
    },
    {
      id: '6',
      serialNo: 6,
      name: 'Ashok',
      date: '2025-11-25',
      fromTime: '2025-11-25T15:28:08:507Z',
      toTime: '2025-11-25T15:28:08:507Z',
      leaveType: 'Leave',
      reason: 'Sick',
      empId: 'EMP - 1029',
      totalDays: 1,
      fromDate: '12-11-2025',
      toDate: '13-11-2025'
    },
  ]);

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLeaveType = !filterLeaveType || request.leaveType === filterLeaveType;
    const matchesDate = !filterDate || request.date === filterDate;
    
    return matchesSearch && matchesLeaveType && matchesDate;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  const handleViewRequest = (request: LeaveRequest) => {
    setViewingRequest(request);
  };

  const handleApprove = (id: string) => {
    setLeaveRequests(prev => prev.filter(req => req.id !== id));
  };

  const handleReject = (id: string) => {
    setLeaveRequests(prev => prev.filter(req => req.id !== id));
  };

  const getCurrentDate = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const getFormattedDate = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 w-full">
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Leave Request Approval</h1>
            <p className="text-xs text-gray-600">{getFormattedDate()}</p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-md p-3 border border-gray-100 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Q Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs"
                />
              </div>
              <div className="relative" ref={filterRef}>
                <button 
                  onClick={() => setShowFilter(!showFilter)}
                  className="p-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
                {showFilter && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10 min-w-[200px]">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Leave Type</label>
                        <select
                          value={filterLeaveType}
                          onChange={(e) => setFilterLeaveType(e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs"
                        >
                          <option value="">All</option>
                          <option value="Leave">Leave</option>
                          <option value="Permission">Permission</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setFilterLeaveType('');
                          setFilterDate('');
                        }}
                        className="w-full px-2.5 py-1.5 bg-gray-200 text-gray-700 rounded-md font-medium text-xs hover:bg-gray-300 transition-all"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#e6edf5' }}>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">S.No</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">From Time</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">To Time</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Leave Type-Reason</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs text-gray-900">{String(request.serialNo).padStart(2, '0')}</td>
                      <td className="px-4 py-3 text-xs text-gray-900">{request.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-900">{request.date}</td>
                      <td className="px-4 py-3 text-xs text-gray-900">{request.fromTime}</td>
                      <td className="px-4 py-3 text-xs text-gray-900">{request.toTime}</td>
                      <td className="px-4 py-3 text-xs text-gray-900">{request.leaveType} - {request.reason}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="px-2.5 py-1 bg-green-500 text-white rounded-md font-medium text-xs hover:bg-green-600 transition-all"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="px-2.5 py-1 bg-red-500 text-white rounded-md font-medium text-xs hover:bg-red-600 transition-all"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleViewRequest(request)}
                            className="px-2.5 py-1 rounded-md font-medium text-xs transition-all hover:shadow-sm"
                            style={{
                              backgroundColor: 'rgba(105, 56, 239, 0.1)',
                              color: '#6938ef',
                              border: '1px solid rgba(105, 56, 239, 0.3)'
                            }}
                          >
                            view
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
            <div className="bg-white rounded-xl shadow-md p-3 border border-gray-100 mt-4">
              <div className="flex items-center justify-end gap-2">
                <div className="text-xs text-gray-600">
                  {startIndex + 1}-{Math.min(endIndex, filteredRequests.length)} of {filteredRequests.length}
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

      {/* Leave Request Modal */}
      {viewingRequest && (
        <LeaveRequestModal
          request={viewingRequest}
          onClose={() => setViewingRequest(null)}
        />
      )}
    </div>
  );
};

export default Approval;

