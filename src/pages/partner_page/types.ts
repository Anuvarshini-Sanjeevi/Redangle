export interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

export interface ChartData {
  month: string;
  leads: number;
}

export interface RecentLead {
  leadId: string;
  leadName: string;
  type: string;
  createdDate: string;
  status: string;
}

export interface KPICardProps {
  title: string;
  value: string | number;
}

export interface LeadChartProps {
  data: ChartData[];
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
}

export interface RecentLeadsTableProps {
  leads: RecentLead[];
  onView?: (leadId: string) => void;
  onEdit?: (leadId: string) => void;
}
