import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

interface ClientLead {
  id: string;
  leadId: string;
  leadName: string;
  contactNumber: string;
  createdTime: string;
  email: string;
  leadSource: string;
  assignee: {
    name: string;
    avatar: string;
  };
  status: 'Done' | 'In Progress';
}

interface AvailableReport {
  id: string;
  reportId: string;
  reportName: string;
  isSelected?: boolean;
}

const ClientReport = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<string>('client');
  const itemsPerPage = 8;

  const [availableReports, setAvailableReports] = useState<AvailableReport[]>([
    { id: 'employee', reportId: 'PN0001245', reportName: 'Employee Attendance Report' },
    { id: 'client', reportId: 'PN0001245', reportName: 'Clients Report', isSelected: true },
    { id: 'invoice', reportId: 'PN0001245', reportName: 'Invoice' },
  ]);

  const [clientLeads, setClientLeads] = useState<ClientLead[]>([
    {
      id: '1',
      leadId: 'LD123',
      leadName: 'Priya (Wedding)',
      contactNumber: '7686536789',
      createdTime: '2d 4h',
      email: 'priya@gmail.com',
      leadSource: 'Assignee',
      assignee: {
        name: 'Assignee',
        avatar: 'https://ui-avatars.com/api/?name=Assignee&background=6938ef&color=fff'
      },
      status: 'Done'
    },
    {
      id: '2',
      leadId: 'LD123',
      leadName: 'Anu (birthday)',
      contactNumber: '7686536789',
      createdTime: '1d 2h',
      email: 'anu@gmail.com',
      leadSource: 'Assignee',
      assignee: {
        name: 'Assignee',
        avatar: 'https://ui-avatars.com/api/?name=Assignee&background=10b981&color=fff'
      },
      status: 'Done'
    },
    {
      id: '3',
      leadId: 'LD123',
      leadName: 'Priya (Wedding)',
      contactNumber: '7686536789',
      createdTime: '2d 4h',
      email: 'priya@gmail.com',
      leadSource: 'Assignee',
      assignee: {
        name: 'Assignee',
        avatar: 'https://ui-avatars.com/api/?name=Assignee&background=3b82f6&color=fff'
      },
      status: 'Done'
    },
    {
      id: '4',
      leadId: 'LD123',
      leadName: 'Anu (birthday)',
      contactNumber: '7686536789',
      createdTime: '1d 2h',
      email: 'anu@gmail.com',
      leadSource: 'Assignee',
      assignee: {
        name: 'Assignee',
        avatar: 'https://ui-avatars.com/api/?name=Assignee&background=f59e0b&color=fff'
      },
      status: 'Done'
    },
  ]);

  const filteredLeads = clientLeads.filter(lead =>
    lead.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.leadId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  const totalClients = clientLeads.length;
  const completedLeads = clientLeads.filter(l => l.status === 'Done').length;
  const inProgressLeads = clientLeads.filter(l => l.status === 'In Progress').length;

  const handleReportClick = (reportId: string) => {
    setSelectedReport(reportId);
    setAvailableReports(prev => prev.map(r => ({
      ...r,
      isSelected: r.id === reportId
    })));

    if (reportId === 'employee') {
      navigate('/admin/report/employee-attendance');
    } else if (reportId === 'invoice') {
      navigate('/admin/report/invoice');
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Done') return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Overall Client Report</h1>

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
                  <p className="text-xs text-gray-600 mb-1">Total Clients</p>
                  <p className="text-lg font-bold text-[#6938ef]">{totalClients}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3">
                  <p className="text-xs text-gray-600 mb-1">Completed leads</p>
                  <p className="text-lg font-bold text-[#6938ef]">{completedLeads}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3">
                  <p className="text-xs text-gray-600 mb-1">Inprogress</p>
                  <p className="text-lg font-bold text-[#6938ef]">{inProgressLeads}</p>
                </div>
              </div>

              {/* Client Leads Table */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ backgroundColor: '#e6edf5' }}>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Lead ID</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Lead Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Contact Number</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Created time</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Lead source</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentLeads.map((lead) => (
                        <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-xs text-gray-900">{lead.leadId}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{lead.leadName}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{lead.contactNumber}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{lead.createdTime}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{lead.email}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <img
                                src={lead.assignee.avatar}
                                alt={lead.assignee.name}
                                className="w-5 h-5 rounded-full"
                              />
                              <span className="text-xs text-gray-900">{lead.assignee.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(lead.status)}`}>
                              {lead.status}
                            </span>
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
                      {startIndex + 1}-{Math.min(endIndex, filteredLeads.length)} of {filteredLeads.length}
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

export default ClientReport;
