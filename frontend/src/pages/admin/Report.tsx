import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

interface AvailableReport {
  id: string;
  reportId: string;
  reportName: string;
  isSelected?: boolean;
}

const Report = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<string | null>('employee');

  useEffect(() => {
    // Default to Employee Attendance Report
    navigate('/admin/report/employee-attendance', { replace: true });
  }, [navigate]);

  const [availableReports, setAvailableReports] = useState<AvailableReport[]>([
    { id: 'employee', reportId: 'PN0001245', reportName: 'Employee Attendance Report', isSelected: true },
    { id: 'client', reportId: 'PN0001245', reportName: 'Clients Report' },
    { id: 'invoice', reportId: 'PN0001245', reportName: 'Invoice' },
  ]);

  const handleReportClick = (reportId: string) => {
    setSelectedReport(reportId);
    setAvailableReports(prev => prev.map(r => ({
      ...r,
      isSelected: r.id === reportId
    })));

    // Navigate to specific report page
    if (reportId === 'employee') {
      navigate('/admin/report/employee-attendance');
    } else if (reportId === 'client') {
      navigate('/admin/report/client');
    } else if (reportId === 'invoice') {
      navigate('/admin/report/invoice');
    }
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

            {/* Right Content Area - Will redirect to Employee Attendance Report */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Reports</h1>
                <p className="text-xs text-gray-600">Loading report...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Report;
