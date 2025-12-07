import type { LeadChartProps } from '../../pages/partner_page/types';

const LeadChart = ({ data, hoveredIndex, onHover }: LeadChartProps) => {
  const maxValue = 12;
  const yAxisSteps = [0, 2, 4, 6, 8, 10, 12];
  const chartPadding = { top: 20, bottom: 60, left: 0, right: 0 };
  
  const getYPercent = (value: number) => {
    const usableHeight = 100 - chartPadding.top - chartPadding.bottom;
    return chartPadding.top + (usableHeight - (value / maxValue) * usableHeight);
  };
  
  const getXPercent = (index: number) => {
    return (index / (data.length - 1)) * 100;
  };
  
  const linePath = data.map((point, index) => {
    const x = getXPercent(index);
    const y = getYPercent(point.leads);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="w-full h-[320px] sm:h-[360px] md:h-[400px] lg:h-[440px] relative overflow-hidden">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-16 flex flex-col justify-between text-xs sm:text-sm md:text-base text-gray-500 pr-2 font-medium">
        {yAxisSteps.map((num) => (
          <span key={num}>{num}</span>
        ))}
      </div>
      
      {/* Chart SVG */}
      <div className="ml-6 sm:ml-8 md:ml-10 h-full pb-16 relative" onMouseLeave={() => onHover(null)}>
        <svg 
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="stripes" patternUnits="userSpaceOnUse" width="4" height="4">
              <path d="M 0,4 L 4,0" stroke="rgba(105, 56, 239, 0.3)" strokeWidth="0.5"/>
            </pattern>
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
          
          {/* Background bars with stripes */}
          {data.map((point, index) => {
            const x = getXPercent(index);
            const barWidth = 100 / data.length;
            const barHeight = 100 - getYPercent(point.leads);
            const isHighlighted = index === 5; // June (index 5)
            
            return (
              <rect
                key={index}
                x={x - barWidth / 2}
                y={getYPercent(point.leads)}
                width={barWidth}
                height={barHeight}
                fill={isHighlighted ? '#6938ef' : 'url(#stripes)'}
                opacity={isHighlighted ? 0.3 : 0.1}
              />
            );
          })}
          
          {/* Line graph */}
          <path
            d={linePath}
            fill="none"
            stroke="#6938ef"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points and hover areas */}
          {data.map((point, index) => {
            const x = getXPercent(index);
            const y = getYPercent(point.leads);
            const isHovered = hoveredIndex === index;
            const isHighlighted = index === 5; // June
            
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
                
                {/* Data point */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 1.2 : 0.8}
                  fill="#6938ef"
                  stroke="white"
                  strokeWidth={isHovered ? 0.5 : 0.3}
                />
                
                {/* Tooltip for June */}
                {isHighlighted && (
                  <g>
                    <rect
                      x={x - 8}
                      y={chartPadding.top - 12}
                      width="16"
                      height="10"
                      fill="white"
                      stroke="#6938ef"
                      strokeWidth="0.3"
                      rx="1"
                      filter="url(#shadow)"
                    />
                    <text
                      x={x}
                      y={chartPadding.top - 7}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill="#6938ef"
                      fontWeight="bold"
                    >
                      Lead {point.leads}
                    </text>
                  </g>
                )}
                
                {/* Tooltip for hovered items */}
                {isHovered && !isHighlighted && (
                  <g>
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
                    <text
                      x={x}
                      y={chartPadding.top - 7}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill="#6938ef"
                      fontWeight="bold"
                    >
                      Lead {point.leads}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* X-axis labels - Months */}
        <div className="absolute bottom-0 left-0 right-0 h-12 flex items-start justify-between px-0" style={{ paddingLeft: '0', paddingRight: '0' }}>
          {data.map((point, index) => {
            const xPercent = getXPercent(index);
            return (
              <div
                key={index}
                className="text-xs sm:text-sm md:text-base text-gray-700 text-center font-medium"
                style={{ 
                  position: 'absolute',
                  left: `${xPercent}%`,
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  bottom: '0',
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

export default LeadChart;
