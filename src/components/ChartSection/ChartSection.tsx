import { useState } from 'react';
import LeadChart from '../LeadChart/LeadChart';
import type { ChartData } from '../../pages/partner_page/types';

interface ChartSectionProps {
  data: ChartData[];
  title?: string;
}

const ChartSection = ({ data, title = 'Monthly Leads' }: ChartSectionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(5); // Default to June
  const [filter, setFilter] = useState('week');

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-3 sm:p-4 mb-4 sm:mb-5 border border-gray-100">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{title}</h2>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-1.5 bg-[#6938ef] text-white border-none rounded-lg text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#6938ef] cursor-pointer appearance-none pr-6" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '10px'
          }}
        >
          <option value="week" className="bg-white text-gray-900">Last week</option>
          <option value="month" className="bg-white text-gray-900">Last month</option>
          <option value="year" className="bg-white text-gray-900">Last year</option>
        </select>
      </div>
      <div className="max-w-6xl mx-auto">
        <LeadChart 
          data={data}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
        />
      </div>
    </div>
  );
};

export default ChartSection;
