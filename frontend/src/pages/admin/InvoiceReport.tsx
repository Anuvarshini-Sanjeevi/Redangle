import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

interface Invoice {
  id: string;
  leadId: string;
  leadName: string;
  contactId: string;
  invoiceId: string;
  billingDate: string;
  employeeAssigned: {
    name: string;
    avatar: string;
  };
  status: 'Paid' | 'Unpaid';
}

interface AvailableReport {
  id: string;
  reportId: string;
  reportName: string;
  isSelected?: boolean;
}

const InvoiceReport = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<string>('invoice');
  const itemsPerPage = 8;

  const [availableReports, setAvailableReports] = useState<AvailableReport[]>([
    { id: 'employee', reportId: 'PN0001245', reportName: 'Employee Attendance Report' },
    { id: 'client', reportId: 'PN0001245', reportName: 'Clients Report' },
    { id: 'invoice', reportId: 'PN0001245', reportName: 'Invoice', isSelected: true },
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      leadId: 'LD123',
      leadName: 'Priya (Wedding)',
      contactId: '7686536789',
      invoiceId: '234565',
      billingDate: '23 Jun 2025',
      employeeAssigned: {
        name: 'Assignee',
        avatar: 'https://ui-avatars.com/api/?name=Assignee&background=6938ef&color=fff'
      },
      status: 'Paid'
    },
    {
      id: '2',
      leadId: 'LD123',
      leadName: 'Anu (birthday)',
      contactId: '7686536789',
      invoiceId: '129878',
      billingDate: '12 April 2025',
      employeeAssigned: {
        name: 'Assignee',
        avatar: 'https://ui-avatars.com/api/?name=Assignee&background=10b981&color=fff'
      },
      status: 'Unpaid'
    },
    {
      id: '3',
      leadId: 'LD123',
      leadName: 'Priya (Wedding)',
      contactId: '7686536789',
      invoiceId: '234565',
      billingDate: '23 Jun 2025',
      employeeAssigned: {
        name: 'Assignee',
        avatar: 'https://ui-avatars.com/api/?name=Assignee&background=3b82f6&color=fff'
      },
      status: 'Paid'
    },
    {
      id: '4',
      leadId: 'LD123',
      leadName: 'Anu (birthday)',
      contactId: '7686536789',
      invoiceId: '129878',
      billingDate: '12 April 2025',
      employeeAssigned: {
        name: 'Assignee',
        avatar: 'https://ui-avatars.com/api/?name=Assignee&background=f59e0b&color=fff'
      },
      status: 'Unpaid'
    },
  ]);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.leadId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvoices = filteredInvoices.slice(startIndex, endIndex);

  const totalInvoice = invoices.length;
  const completedPayments = invoices.filter(i => i.status === 'Paid').length;
  const pendingPayments = invoices.filter(i => i.status === 'Unpaid').length;

  const handleReportClick = (reportId: string) => {
    setSelectedReport(reportId);
    setAvailableReports(prev => prev.map(r => ({
      ...r,
      isSelected: r.id === reportId
    })));

    if (reportId === 'employee') {
      navigate('/admin/report/employee-attendance');
    } else if (reportId === 'client') {
      navigate('/admin/report/client');
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Paid') return 'bg-green-100 text-green-800';
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Overall Invoice Report</h1>

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
                  <p className="text-xs text-gray-600 mb-1">Total Invoice</p>
                  <p className="text-lg font-bold text-[#6938ef]">{totalInvoice}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3">
                  <p className="text-xs text-gray-600 mb-1">Completed Payments</p>
                  <p className="text-lg font-bold text-[#6938ef]">{completedPayments}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3">
                  <p className="text-xs text-gray-600 mb-1">Pending Payments</p>
                  <p className="text-lg font-bold text-[#6938ef]">{pendingPayments}</p>
                </div>
              </div>

              {/* Invoice Table */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ backgroundColor: '#e6edf5' }}>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Lead Id</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Lead Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Contact Id</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Invoice Id</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Billing date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Employee Assigned</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentInvoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-xs text-gray-900">{invoice.leadId}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{invoice.leadName}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{invoice.contactId}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{invoice.invoiceId}</td>
                          <td className="px-4 py-3 text-xs text-gray-900">{invoice.billingDate}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <img
                                src={invoice.employeeAssigned.avatar}
                                alt={invoice.employeeAssigned.name}
                                className="w-5 h-5 rounded-full"
                              />
                              <span className="text-xs text-gray-900">{invoice.employeeAssigned.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(invoice.status)}`}>
                              {invoice.status}
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
                      {startIndex + 1}-{Math.min(endIndex, filteredInvoices.length)} of {filteredInvoices.length}
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

export default InvoiceReport;
