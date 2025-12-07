import { useState } from 'react';
import PartnerSidebar from '../../components/PartnerSidebar/PartnerSidebar';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import KPICard from '../../components/KPICard/KPICard';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { exportToExcel } from '../../utils/excelExport';

interface EarningsData {
  leadId: string;
  leadName: string;
  type: string;
  createdDate: string;
  projectValue: number;
  commissionPercent: number;
  earnings: number;
  status: 'Paid' | 'Unpaid' | 'Pending';
}

const Earnings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 5;

  const earningsData: EarningsData[] = [
    { leadId: 'LD-104', leadName: 'Priya', type: 'Wedding', createdDate: 'March 26 2025', projectValue: 54000, commissionPercent: 2.0, earnings: 14000, status: 'Paid' },
    { leadId: 'LD-104', leadName: 'Priya', type: 'Birthday', createdDate: 'March 26 2025', projectValue: 62000, commissionPercent: 2.0, earnings: 24000, status: 'Unpaid' },
    { leadId: 'LD-104', leadName: 'Priya', type: 'Wedding', createdDate: 'March 26 2025', projectValue: 54000, commissionPercent: 2.0, earnings: 14000, status: 'Paid' },
    { leadId: 'LD-104', leadName: 'Priya', type: 'Birthday', createdDate: 'March 26 2025', projectValue: 62000, commissionPercent: 2.0, earnings: 24000, status: 'Pending' },
    { leadId: 'LD-104', leadName: 'Priya', type: 'Birthday', createdDate: 'March 26 2025', projectValue: 62000, commissionPercent: 2.0, earnings: 24000, status: 'Unpaid' },
    { leadId: 'LD-105', leadName: 'Priya', type: 'Wedding', createdDate: 'March 27 2025', projectValue: 50000, commissionPercent: 2.0, earnings: 10000, status: 'Paid' },
    { leadId: 'LD-106', leadName: 'Priya', type: 'Photoshoot', createdDate: 'March 28 2025', projectValue: 30000, commissionPercent: 2.0, earnings: 6000, status: 'Pending' },
    { leadId: 'LD-107', leadName: 'Priya', type: 'Wedding', createdDate: 'March 29 2025', projectValue: 70000, commissionPercent: 2.0, earnings: 14000, status: 'Paid' },
    { leadId: 'LD-108', leadName: 'Priya', type: 'Birthday', createdDate: 'March 30 2025', projectValue: 40000, commissionPercent: 2.0, earnings: 8000, status: 'Unpaid' },
    { leadId: 'LD-109', leadName: 'Priya', type: 'Wedding', createdDate: 'March 31 2025', projectValue: 60000, commissionPercent: 2.0, earnings: 12000, status: 'Paid' },
    { leadId: 'LD-110', leadName: 'Priya', type: 'Birthday', createdDate: 'April 1 2025', projectValue: 45000, commissionPercent: 2.0, earnings: 9000, status: 'Pending' },
    { leadId: 'LD-111', leadName: 'Priya', type: 'Wedding', createdDate: 'April 2 2025', projectValue: 55000, commissionPercent: 2.0, earnings: 11000, status: 'Paid' },
  ];

  const sortByDate = (earnings: EarningsData[]) => {
    return [...earnings].sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  const handleSortByDate = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleDownloadStatement = () => {
    const sortedEarnings = sortByDate(earningsData);
    const excelData = sortedEarnings.map(earning => ({
      'Lead ID': earning.leadId,
      'Lead Name': earning.leadName,
      'Type': earning.type,
      'Created Date': earning.createdDate,
      'Project Value': earning.projectValue,
      'Commission %': earning.commissionPercent,
      'Earnings': earning.earnings,
      'Status': earning.status,
    }));
    
    exportToExcel(excelData, 'earnings_statement', ['Lead ID', 'Lead Name', 'Type', 'Created Date', 'Project Value', 'Commission %', 'Earnings', 'Status']);
  };

  const sortedEarnings = sortByDate(earningsData);
  const totalPages = Math.ceil(sortedEarnings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEarnings = sortedEarnings.slice(startIndex, startIndex + itemsPerPage);

  const eligibleProjects = earningsData.length;
  const confirmedCommission = earningsData
    .filter(item => item.status === 'Paid')
    .reduce((sum, item) => sum + item.earnings, 0);
  const pendingCommission = earningsData
    .filter(item => item.status === 'Pending' || item.status === 'Unpaid')
    .reduce((sum, item) => sum + item.earnings, 0);

  const getStatusColor = (status: string) => {
    if (status === 'Paid') {
      return { bg: 'rgba(34, 197, 94, 0.2)', text: '#22c55e' };
    } else if (status === 'Unpaid') {
      return { bg: 'rgba(239, 68, 68, 0.2)', text: '#ef4444' };
    } else if (status === 'Pending') {
      return { bg: 'rgba(249, 115, 22, 0.2)', text: '#f97316' };
    }
    return { bg: 'rgba(105, 56, 239, 0.2)', text: '#6938ef' };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full bg-white flex overflow-hidden"
      style={{
        transform: 'scale(0.75)',
        transformOrigin: 'top left',
        width: '133.33%',
        height: '133.33%'
      }}
    >
      <PartnerSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <DashboardHeader title="EARNINGS" />
        
        <main className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-5 w-full">
          {/* KPI Cards and Download Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 flex-1">
              <KPICard title="Eligible Projects" value={eligibleProjects} />
              <KPICard title="Confirmed Commission" value={formatCurrency(confirmedCommission)} />
              <KPICard title="Pending Commission" value={formatCurrency(pendingCommission)} />
            </div>
            <button
              onClick={handleDownloadStatement}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#6938ef] text-white rounded-lg font-semibold hover:bg-[#5a2dd4] transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download Statement
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="text-left py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base font-bold text-gray-700">Lead id</th>
                    <th className="text-left py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base font-bold text-gray-700">Lead name</th>
                    <th className="text-left py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base font-bold text-gray-700">Type</th>
                    <th className="text-left py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base font-bold text-gray-700">CreatedDates</th>
                    <th className="text-left py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base font-bold text-gray-700">Projectvalue</th>
                    <th className="text-left py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base font-bold text-gray-700">Commission%</th>
                    <th className="text-left py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base font-bold text-gray-700">Earnings</th>
                    <th className="text-left py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base font-bold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEarnings.map((earning, index) => {
                    const statusColors = getStatusColor(earning.status);
                    return (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base text-gray-900 font-semibold">{earning.leadId}</td>
                        <td className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base text-gray-900 font-semibold">{earning.leadName}</td>
                        <td className="py-2 px-4 sm:px-6 md:px-8 lg:px-10">
                          <span 
                            className="inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold"
                            style={{ 
                              backgroundColor: 'rgba(247, 245, 254, 0.7)',
                              color: '#6938ef'
                            }}
                          >
                            {earning.type}
                          </span>
                        </td>
                        <td className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base text-gray-600 font-medium">{earning.createdDate}</td>
                        <td className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base text-gray-600 font-medium">{formatCurrency(earning.projectValue)}</td>
                        <td className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base text-gray-600 font-medium">{earning.commissionPercent}%</td>
                        <td className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 text-xs sm:text-sm md:text-base text-gray-600 font-medium">{formatCurrency(earning.earnings)}</td>
                        <td className="py-2 px-4 sm:px-6 md:px-8 lg:px-10">
                          <span 
                            className="inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold"
                            style={{ 
                              backgroundColor: statusColors.bg,
                              color: statusColors.text
                            }}
                          >
                            {earning.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

       
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity flex items-center"
                  style={{
                    backgroundColor: 'rgba(105, 56, 239, 0.2)',
                    border: '1px solid rgba(105, 56, 239, 0.3)',
                    color: '#6938ef'
                  }}
                  title="First page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <ChevronLeft className="w-4 h-4 -ml-3" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded text-sm sm:text-base font-medium transition-opacity hover:opacity-80 ${
                      currentPage === page
                        ? 'bg-[#6938ef] text-white'
                        : ''
                    }`}
                    style={currentPage !== page ? {
                      backgroundColor: 'rgba(105, 56, 239, 0.2)',
                      border: '1px solid rgba(105, 56, 239, 0.3)',
                      color: '#6938ef'
                    } : {}}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity flex items-center"
                  style={{
                    backgroundColor: 'rgba(105, 56, 239, 0.2)',
                    border: '1px solid rgba(105, 56, 239, 0.3)',
                    color: '#6938ef'
                  }}
                  title="Last page"
                >
                  <ChevronRight className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4 -ml-3" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 text-sm sm:text-base font-medium"
                  style={{
                    backgroundColor: 'rgba(105, 56, 239, 0.2)',
                    border: '1px solid rgba(105, 56, 239, 0.3)',
                    color: '#6938ef'
                  }}
                >
                  Prev
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 text-sm sm:text-base font-medium"
                  style={{
                    backgroundColor: 'rgba(105, 56, 239, 0.2)',
                    border: '1px solid rgba(105, 56, 239, 0.3)',
                    color: '#6938ef'
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Earnings;
