import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

interface ChartData {
  month: string;
  achieved: number;
  target: number;
}

interface LineChartProps {
  data: ChartData[];
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
}

const LineChart = ({ data, hoveredIndex, onHover }: LineChartProps) => {
  const maxValue = 12;
  const yAxisSteps = [0, 2, 4, 6, 8, 10, 12];
  const chartPadding = { top: 20, bottom: 50, left: 0, right: 0 };
  
  // Calculate Y position as percentage (0-100)
  const getYPercent = (value: number) => {
    const usableHeight = 100 - chartPadding.top - chartPadding.bottom;
    return chartPadding.top + (usableHeight - (value / maxValue) * usableHeight);
  };
  
  // Calculate X position as percentage (0-100)
  const getXPercent = (index: number) => {
    return (index / (data.length - 1)) * 100;
  };
  
  // Build path strings
  const achievedPath = data.map((point, index) => {
    const x = getXPercent(index);
    const y = getYPercent(point.achieved);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  
  const targetPath = data.map((point, index) => {
    const x = getXPercent(index);
    const y = getYPercent(point.target);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  
  return (
    <div className="h-64 sm:h-80 relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs sm:text-sm text-gray-500 pr-2 font-medium">
        {yAxisSteps.map((num) => (
          <span key={num}>{num}</span>
        ))}
      </div>
      
      {/* Chart SVG */}
      <div className="ml-10 sm:ml-14 md:ml-16 h-full pb-8 relative" onMouseLeave={() => onHover(null)}>
        <svg 
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0.5" stdDeviation="0.5" floodOpacity="0.2"/>
            </filter>
          </defs>
          
          {/* Grid lines */}
          {yAxisSteps.slice(1).map((num) => {
            const y = getYPercent(num);
            return (
              <line
                key={num}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeDasharray="1,1"
              />
            );
          })}
          
          {/* Target line (purple) */}
          <path
            d={targetPath}
            fill="none"
            stroke="#6938ef"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Achieved line (orange) */}
          <path
            d={achievedPath}
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points and hover areas */}
          {data.map((point, index) => {
            const x = getXPercent(index);
            const achievedY = getYPercent(point.achieved);
            const targetY = getYPercent(point.target);
            const isHovered = hoveredIndex === index;
            
            return (
              <g key={index}>
                {/* Hover area */}
                <rect
                  x={x - 8}
                  y="0"
                  width="16"
                  height="100"
                  fill="transparent"
                  onMouseEnter={() => onHover(index)}
                  style={{ cursor: 'pointer' }}
                />
                
                {/* Target point (purple) */}
                <circle
                  cx={x}
                  cy={targetY}
                  r={isHovered ? 1.2 : 0.8}
                  fill="#6938ef"
                  stroke="white"
                  strokeWidth={isHovered ? 0.5 : 0.3}
                />
                
                {/* Achieved point (orange) */}
                <circle
                  cx={x}
                  cy={achievedY}
                  r={isHovered ? 1.2 : 0.8}
                  fill="#f97316"
                  stroke="white"
                  strokeWidth={isHovered ? 0.5 : 0.3}
                />
                
                {/* Tooltip */}
                {isHovered && (
                  <g>
                    {/* Vertical dashed line */}
                    <line
                      x1={x}
                      y1={chartPadding.top}
                      x2={x}
                      y2={100 - chartPadding.bottom}
                      stroke="#6938ef"
                      strokeWidth="0.5"
                      strokeDasharray="2,2"
                      opacity="0.4"
                    />
                    
                    {/* Tooltip box */}
                    <rect
                      x={x - 8}
                      y={chartPadding.top - 12}
                      width="16"
                      height="10"
                      fill="white"
                      stroke="#e5e7eb"
                      strokeWidth="0.3"
                      rx="1"
                      filter="url(#shadow)"
                    />
                    
                    {/* Tooltip text - Achieved */}
                    <text
                      x={x}
                      y={chartPadding.top - 7}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill="#f97316"
                      fontWeight="bold"
                    >
                      {Math.round(point.achieved)} Projects
                    </text>
                    
                    {/* Tooltip text - Target */}
                    <text
                      x={x}
                      y={chartPadding.top - 3}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill="#6938ef"
                      fontWeight="bold"
                    >
                      {Math.round(point.target)} Projects
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          {data.map((point, index) => {
            const xPercent = getXPercent(index);
            return (
              <div
                key={index}
                className="text-xs text-gray-600 text-center font-medium absolute"
                style={{ 
                  left: `${xPercent}%`,
                  transform: 'translateX(-50%)',
                  minWidth: '50px'
                }}
              >
                {point.month}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface Project {
  employee: string;
  date: string;
  budget: string;
  status: 'In Progress' | 'Complete' | 'Pending' | 'Approved';
  avatar: string;
}

const AdminDashboard = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects: Project[] = [
    {
      employee: 'ByeWind',
      date: 'Jun 24, 2025',
      budget: '$942.00',
      status: 'In Progress',
      avatar: 'https://ui-avatars.com/api/?name=ByeWind&background=6938ef&color=fff'
    },
    {
      employee: 'Natali Craig',
      date: 'Mar 10, 2025',
      budget: '$881.00',
      status: 'Complete',
      avatar: 'https://ui-avatars.com/api/?name=Natali+Craig&background=10b981&color=fff'
    },
    {
      employee: 'Drew Cano',
      date: 'Nov 10, 2025',
      budget: '$409.00',
      status: 'Pending',
      avatar: 'https://ui-avatars.com/api/?name=Drew+Cano&background=3b82f6&color=fff'
    },
    {
      employee: 'Orlando Diggs',
      date: 'Dec 20, 2025',
      budget: '$953.00',
      status: 'Approved',
      avatar: 'https://ui-avatars.com/api/?name=Orlando+Diggs&background=f59e0b&color=fff'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-purple-100 text-purple-800';
      case 'Complete':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      case 'Approved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-50 flex overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 w-full">
          {/* Admin Dashboard Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Employees Card */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100">
                    {/* Background circle (light grey outline) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    {/* Progress arc (cyan-blue, about 75% of circle) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45 * 0.75} ${2 * Math.PI * 45}`}
                      strokeDashoffset={2 * Math.PI * 45 * 0.25}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  {/* Number inside circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-[#06b6d4]">12</span>
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Employees</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Total Employees</p>
                </div>
              </div>
            </div>

            {/* Leads Card */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100">
                    {/* Background circle (light grey outline) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    {/* Progress arc (cyan-blue, about 50% of circle) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45 * 0.5} ${2 * Math.PI * 45}`}
                      strokeDashoffset={2 * Math.PI * 45 * 0.5}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  {/* Number inside circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-[#06b6d4]">6</span>
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Leads</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Total Leads</p>
                </div>
              </div>
            </div>

            {/* Billing Card */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100">
                    {/* Background circle (light grey outline) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    {/* Progress arc (cyan-blue, about 90% of circle) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45 * 0.9} ${2 * Math.PI * 45}`}
                      strokeDashoffset={2 * Math.PI * 45 * 0.1}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  {/* Number inside circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-[#06b6d4]">42</span>
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Billing</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Successful Billing</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Performance</h2>
              <select className="px-3 py-2 bg-[#6938ef] text-white border-none rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#6938ef] cursor-pointer appearance-none pr-8" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '12px'
              }}>
                <option value="week" className="bg-white text-gray-900">This Week</option>
                <option value="month" className="bg-white text-gray-900">This Month</option>
                <option value="year" className="bg-white text-gray-900">This Year</option>
              </select>
            </div>
            <LineChart 
              data={[
                { month: 'Oct 2021', achieved: 4.5, target: 3 },
                { month: 'Nov 2021', achieved: 6.5, target: 4.5 },
                { month: 'Dec 2021', achieved: 2.5, target: 4 },
                { month: 'Jan 2022', achieved: 7, target: 5 },
                { month: 'Feb 2022', achieved: 6, target: 5 },
                { month: 'Mar 2022', achieved: 5.5, target: 3.5 }
              ]}
              hoveredIndex={hoveredIndex}
              onHover={setHoveredIndex}
            />
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded shadow-sm"></div>
                <span className="text-sm text-gray-600 font-semibold">Achieved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#6938ef] rounded shadow-sm"></div>
                <span className="text-sm text-gray-600 font-semibold">Target</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Projects</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 text-xs font-bold text-gray-700">Employee</th>
                    <th className="text-left py-2 px-3 text-xs font-bold text-gray-700">Date</th>
                    <th className="text-left py-2 px-3 text-xs font-bold text-gray-700">Budget</th>
                    <th className="text-left py-2 px-3 text-xs font-bold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={project.avatar}
                            alt={project.employee}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-xs text-gray-900 font-semibold">{project.employee}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-xs text-gray-600 font-medium">{project.date}</td>
                      <td className="py-2 px-3 text-xs text-gray-900 font-bold">{project.budget}</td>
                      <td className="py-2 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

