import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import type { Lead } from './ViewLeads';

interface LeadTracking {
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
  plan: string;
  status: 'Paid' | 'Unpaid';
}

interface EmployeeTracking {
  id: string;
  employeeName: string;
  employeeId: string;
  gender: string;
  email: string;
  position: string;
  contact: string;
  avatar: string;
}

const TrackingDetails = () => {
  const navigate = useNavigate();
  const [leadCurrentPage, setLeadCurrentPage] = useState(1);
  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState('');
  const [showLeadFilters, setShowLeadFilters] = useState(false);
  const [showEmployeeFilters, setShowEmployeeFilters] = useState(false);
  const leadFileInputRef = useRef<HTMLInputElement>(null);
  const employeeFileInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 8;

  const leadTracking: LeadTracking[] = [
    {
      id: '1',
      leadId: 'LD123',
      leadName: 'Priya (Wedding)',
      contactId: '7686536789',
      invoiceId: '234565',
      billingDate: '23 Jun 2025',
      employeeAssigned: {
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6938ef&color=fff'
      },
      plan: 'Basic Plan',
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
        name: 'Jane Smith',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff'
      },
      plan: 'Classic Plan',
      status: 'Unpaid'
    },
    {
      id: '3',
      leadId: 'LD125',
      leadName: 'Abi (Pre-Wedding)',
      contactId: '7686536789',
      invoiceId: '345678',
      billingDate: '15 May 2025',
      employeeAssigned: {
        name: 'Mike Johnson',
        avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=3b82f6&color=fff'
      },
      plan: 'Premium Plan',
      status: 'Paid'
    },
    {
      id: '4',
      leadId: 'LD126',
      leadName: 'Vikram (Baby shower)',
      contactId: '7686536789',
      invoiceId: '456789',
      billingDate: '20 Jul 2025',
      employeeAssigned: {
        name: 'Sarah Wilson',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=f59e0b&color=fff'
      },
      plan: 'Basic Plan',
      status: 'Unpaid'
    },
    {
      id: '5',
      leadId: 'LD127',
      leadName: 'Arjun (Wedding)',
      contactId: '7686536789',
      invoiceId: '567890',
      billingDate: '10 Aug 2025',
      employeeAssigned: {
        name: 'Tom Brown',
        avatar: 'https://ui-avatars.com/api/?name=Tom+Brown&background=ef4444&color=fff'
      },
      plan: 'Classic Plan',
      status: 'Paid'
    },
    {
      id: '6',
      leadId: 'LD128',
      leadName: 'Arun (Wedding)',
      contactId: '7686536789',
      invoiceId: '678901',
      billingDate: '25 Sep 2025',
      employeeAssigned: {
        name: 'Lisa Davis',
        avatar: 'https://ui-avatars.com/api/?name=Lisa+Davis&background=8b5cf6&color=fff'
      },
      plan: 'Premium Plan',
      status: 'Paid'
    },
    {
      id: '7',
      leadId: 'LD129',
      leadName: 'Manjoj (Wedding)',
      contactId: '7686536789',
      invoiceId: '789012',
      billingDate: '30 Oct 2025',
      employeeAssigned: {
        name: 'David Lee',
        avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=14b8a6&color=fff'
      },
      plan: 'Basic Plan',
      status: 'Unpaid'
    },
    {
      id: '8',
      leadId: 'LD130',
      leadName: 'Arjun (Wedding)',
      contactId: '7686536789',
      invoiceId: '890123',
      billingDate: '5 Nov 2025',
      employeeAssigned: {
        name: 'Emma White',
        avatar: 'https://ui-avatars.com/api/?name=Emma+White&background=ec4899&color=fff'
      },
      plan: 'Classic Plan',
      status: 'Paid'
    }
  ];

  const employeeTracking: EmployeeTracking[] = [
    {
      id: '1',
      employeeName: 'Lenora Fowler',
      employeeId: 'EM123',
      gender: 'Female',
      email: 'eravi@lec.gov',
      position: '',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Lenora+Fowler&background=6938ef&color=fff'
    },
    {
      id: '2',
      employeeName: 'Winnie McGuire',
      employeeId: 'EM123',
      gender: 'Female',
      email: 'winnie3498@gmail.com',
      position: 'Copywriter',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Winnie+McGuire&background=10b981&color=fff'
    },
    {
      id: '3',
      employeeName: 'John Smith',
      employeeId: 'EM124',
      gender: 'Male',
      email: 'john.smith@gmail.com',
      position: 'Designer',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff'
    },
    {
      id: '4',
      employeeName: 'Sarah Johnson',
      employeeId: 'EM125',
      gender: 'Female',
      email: 'sarah.j@gmail.com',
      position: 'Manager',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=f59e0b&color=fff'
    },
    {
      id: '5',
      employeeName: 'Mike Brown',
      employeeId: 'EM126',
      gender: 'Male',
      email: 'mike.brown@gmail.com',
      position: 'Developer',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Brown&background=ef4444&color=fff'
    },
    {
      id: '6',
      employeeName: 'Lisa Wilson',
      employeeId: 'EM127',
      gender: 'Female',
      email: 'lisa.w@gmail.com',
      position: 'Coordinator',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Lisa+Wilson&background=8b5cf6&color=fff'
    },
    {
      id: '7',
      employeeName: 'David Lee',
      employeeId: 'EM128',
      gender: 'Male',
      email: 'david.lee@gmail.com',
      position: 'Photographer',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=14b8a6&color=fff'
    },
    {
      id: '8',
      employeeName: 'Emma Davis',
      employeeId: 'EM129',
      gender: 'Female',
      email: 'emma.davis@gmail.com',
      position: 'Editor',
      contact: '7686536789',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=ec4899&color=fff'
    }
  ];

  const filteredLeads = leadTracking.filter(lead =>
    lead.leadName.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
    lead.leadId.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
    lead.invoiceId.includes(leadSearchQuery)
  );

  const filteredEmployees = employeeTracking.filter(emp =>
    emp.employeeName.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(employeeSearchQuery.toLowerCase())
  );

  const leadTotalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const leadStartIndex = (leadCurrentPage - 1) * itemsPerPage;
  const leadEndIndex = leadStartIndex + itemsPerPage;
  const currentLeads = filteredLeads.slice(leadStartIndex, leadEndIndex);

  const employeeTotalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const employeeStartIndex = (employeeCurrentPage - 1) * itemsPerPage;
  const employeeEndIndex = employeeStartIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(employeeStartIndex, employeeEndIndex);

  const handleViewLead = (lead: LeadTracking) => {
    const leadData: Lead = {
      id: lead.id,
      leadId: lead.leadId,
      leadName: lead.leadName,
      contactNumber: lead.contactId,
      createdTime: '',
      email: '',
      leadSource: {
        type: lead.plan,
        assignee: lead.employeeAssigned.name,
        avatar: lead.employeeAssigned.avatar
      },
      status: lead.status === 'Paid' ? 'Done' : 'In Progress'
    };
    navigate('/admin/lead-track', {
      state: { lead: leadData }
    });
  };

  const handleViewEmployee = (emp: EmployeeTracking) => {
    navigate('/admin/employee-track', {
      state: {
        employee: {
          id: emp.id,
          employeeId: emp.employeeId,
          employeeName: emp.employeeName,
          contactNumber: emp.contact,
          email: emp.email,
          position: emp.position || 'General',
          avatar: emp.avatar,
          gender: emp.gender
        }
      }
    });
  };

  const getStatusColor = (status: string) => {
    if (status === 'Paid') return 'bg-green-100 text-green-800';
    if (status === 'Unpaid') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 w-full">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5">TRACKING DETAILS</h1>

          {/* Lead Tracking Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-bold text-gray-900">Lead Tracking</h2>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={leadSearchQuery}
                  onChange={(e) => {
                    setLeadSearchQuery(e.target.value);
                    setLeadCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-sm"
                />
              </div>
              <button
                onClick={() => setShowLeadFilters(!showLeadFilters)}
                className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-5 h-5" />
              </button>
              <input
                type="file"
                ref={leadFileInputRef}
                className="hidden"
                accept=".csv,.xlsx,.xls"
              />
              <button
                onClick={() => leadFileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                Bulk upload
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#e6edf5' }}>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Lead Id</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Lead Name</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Contact Id</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Invoice Id</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Billing date</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Employee Assigned</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Plan</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-900">{lead.leadId}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-900">{lead.leadName}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{lead.contactId}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{lead.invoiceId}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{lead.billingDate}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={lead.employeeAssigned.avatar}
                              alt={lead.employeeAssigned.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-xs sm:text-sm text-gray-600">{lead.employeeAssigned.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{lead.plan}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(lead.status)}`}>
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

            {leadTotalPages > 1 && (
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 mb-6">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-sm text-gray-600">
                    {leadStartIndex + 1}-{Math.min(leadEndIndex, filteredLeads.length)} of {filteredLeads.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLeadCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={leadCurrentPage === 1}
                      className="text-gray-600 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setLeadCurrentPage(prev => Math.min(leadTotalPages, prev + 1))}
                      disabled={leadCurrentPage === leadTotalPages}
                      className="text-gray-600 disabled:opacity-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Employee Tracking Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-bold text-gray-900">Employee Tracking</h2>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={employeeSearchQuery}
                  onChange={(e) => {
                    setEmployeeSearchQuery(e.target.value);
                    setEmployeeCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-sm"
                />
              </div>
              <button
                onClick={() => setShowEmployeeFilters(!showEmployeeFilters)}
                className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-5 h-5" />
              </button>
              <input
                type="file"
                ref={employeeFileInputRef}
                className="hidden"
                accept=".csv,.xlsx,.xls"
              />
              <button
                onClick={() => employeeFileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#6938ef] text-white rounded-lg font-semibold hover:bg-[#5a2dd4] text-sm"
              >
                <Upload className="w-4 h-4" />
                Bulk upload
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#e6edf5' }}>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Employee Name</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Employee Id</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Gender</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Position</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Contact</th>
                      <th className="px-4 py-3 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEmployees.map((emp) => (
                      <tr key={emp.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={emp.avatar}
                              alt={emp.employeeName}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-xs sm:text-sm text-gray-900">{emp.employeeName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{emp.employeeId}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{emp.gender}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{emp.email}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">
                          {emp.position ? (
                            <div className="flex items-center gap-2">
                              <span>{emp.position}</span>
                              {emp.position === 'Copywriter' && (
                                <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded text-xs font-semibold">Senior</span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{emp.contact}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleViewEmployee(emp)}
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

            {employeeTotalPages > 1 && (
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-sm text-gray-600">
                    {employeeStartIndex + 1}-{Math.min(employeeEndIndex, filteredEmployees.length)} of {filteredEmployees.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEmployeeCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={employeeCurrentPage === 1}
                      className="text-gray-600 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEmployeeCurrentPage(prev => Math.min(employeeTotalPages, prev + 1))}
                      disabled={employeeCurrentPage === employeeTotalPages}
                      className="text-gray-600 disabled:opacity-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

    </div>
  );
};

export default TrackingDetails;

