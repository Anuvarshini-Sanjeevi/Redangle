import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

interface AttendanceRecord {
  id: string;
  serialNo: number;
  name: string;
  date: string;
  punchIn: string;
  punchOut: string;
  totalHours: string;
  status: 'Present' | 'Absent';
}

interface AvailableReport {
  id: string;
  reportId: string;
  reportName: string;
  isSelected?: boolean;
}

const EmployeeAttendanceReport = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<string>('employee');
  const itemsPerPage = 8;

  const [availableReports, setAvailableReports] = useState<AvailableReport[]>([
    { id: 'employee', reportId: 'PN0001245', reportName: 'Employee Attendance Report', isSelected: true },
    { id: 'client', reportId: 'PN0001245', reportName: 'Clients Report' },
    { id: 'invoice', reportId: 'PN0001245', reportName: 'Invoice' },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      serialNo: 1,
      name: 'Arun',
      date: '2025-11-25',
      punchIn: '2025-11-25T15:28:08:507Z',
      punchOut: '2025-11-25T15:28:08:507Z',
      totalHours: '2h 30m',
      status: 'Present'
    },
    {
      id: '2',
      serialNo: 2,
      name: 'Deepa',
      date: '2025-11-25',
      punchIn: '2025-11-25T15:28:08:507Z',
      punchOut: '2025-11-25T15:28:08:507Z',
      totalHours: '2h 30m',
      status: 'Present'
    },
    {
      id: '3',
      serialNo: 3,
      name: 'Oviya',
      date: '2025-11-25',
      punchIn: '2025-11-25T15:28:08:507Z',
      punchOut: '2025-11-25T15:28:08:507Z',
      totalHours: '2h 30m',
      status: 'Present'
    },
    {
      id: '4',
      serialNo: 4,
      name: 'Priya',
      date: '2025-11-25',
      punchIn: '2025-11-25T15:28:08:507Z',
      punchOut: '2025-11-25T15:28:08:507Z',
      totalHours: '2h 30m',
      status: 'Absent'
    },
    {
      id: '5',
      serialNo: 5,
      name: 'Deepak',
      date: '2025-11-25',
      punchIn: '2025-11-25T15:28:08:507Z',
      punchOut: '2025-11-25T15:28:08:507Z',
      totalHours: '2h 30m',
      status: 'Present'
    },
    {
      id: '6',
      serialNo: 6,
      name: 'Ashok',
      date: '2025-11-25',
      punchIn: '2025-11-25T15:28:08:507Z',
      punchOut: '2025-11-25T15:28:08:507Z',
      totalHours: '2h 30m',
      status: 'Present'
    },
  ]);

  const filteredRecords = attendanceRecords.filter(record =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  const totalEmployees = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(r => r.status === 'Present').length;
  const absentCount = attendanceRecords.filter(r => r.status === 'Absent').length;

  const handleReportClick = (reportId: string) => {
    setSelectedReport(reportId);
    setAvailableReports(prev => prev.map(r => ({
      ...r,
      isSelected: r.id === reportId
    })));

    if (reportId === 'client') {
      navigate('/admin/report/client');
    } else if (reportId === 'invoice') {
      navigate('/admin/report/invoice');
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Present') return 'bg-green-100 text-green-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Left Sidebar - Available Reports */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3">
                <h2 className="text-sm font-bold text-gray-900 mb-3">Available Reports</h2>
                <div className="space-y-2">
                  {availableReports.map((report) => (
                    <div
                      key={report.id}
                      onClick={() => handleReportClick(report.id)}
                      className={`p-2 rounded-lg cursor-pointer transition-colors ${
                        report.isSelected
                          ? 'bg-purple-50 border border-purple-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-gray-900">{report.reportId}</p>
                          <p className="text-xs text-gray-600">{report.reportName}</p>
                        </div>
                      </div>
                      {report.isSelected && (
                        <a
                          href="#"
                          className="text-xs text-[#6938ef] font-medium mt-1 inline-block"
                          onClick={(e) => {
                            e.preventDefault();
                            handleReportClick(report.id);
                          }}
                        >
                          View details &gt;
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-3">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Overall Employee Attendance Report</h1>

              {/* Search and Action Bar */}
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
                  <button className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1.5 text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    Sort by date
                  </button>
                  <button className="px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3">
                  <p className="text-xs text-gray-600 mb-1">Total Employees</p>
                  <p className="text-lg font-bold text-[#6938ef]">{totalEmployees}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3">
                  <p className="text-xs text-gray-600 mb-1">Present</p>
                  <p className="text-lg font-bold text-[#6938ef]">{presentCount}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3">
                  <p className="text-xs text-gray-600 mb-1">Absent</p>
                  <p className="text-lg font-bold text-[#6938ef]">{absentCount}</p>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ backgroundColor: '#e6edf5' }}>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">S.No</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Punch In</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Punch Out</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Total Hours</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords.map((record) => (
                        <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-xs text-gray-900">{String(record.serialNo).padStart(2, '0')}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{record.name}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{record.date}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{record.punchIn}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{record.punchOut}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{record.totalHours}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              className="px-2.5 py-1 rounded-md font-medium text-xs transition-all hover:shadow-sm"
                              style={{
                                backgroundColor: 'rgba(105, 56, 239, 0.1)',
                                color: '#6938ef',
                                border: '1px solid rgba(105, 56, 239, 0.3)'
                              }}
                            >
                              view
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
                  <div className="flex items-center justify-end gap-2">
                    <div className="text-xs text-gray-600">
                      {startIndex + 1}-{Math.min(endIndex, filteredRecords.length)} of {filteredRecords.length}
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeAttendanceReport;
