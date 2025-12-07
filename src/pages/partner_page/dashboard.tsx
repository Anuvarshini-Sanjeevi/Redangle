import { useState } from 'react';
import PartnerSidebar from '../../components/PartnerSidebar/PartnerSidebar';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import KPICard from '../../components/KPICard/KPICard';
import ChartSection from '../../components/ChartSection/ChartSection';
import RecentLeadsTable from '../../components/RecentLeadsTable/RecentLeadsTable';
import LeadModal from '../../components/LeadModal/LeadModal';
import type { ChartData, RecentLead } from './types';

interface Lead {
  leadId: string;
  leadName: string;
  type: string;
  createdDate: string;
  editedDate: string;
  status: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  priority?: string;
  contactNumber?: string;
  address?: string;
  eventType?: string;
  leadSource?: string;
  budget?: string;
  eventDate?: string;
  assignee?: string;
  description?: string;
}

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('view');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const chartData: ChartData[] = [
    { month: 'Jan', leads: 3 },
    { month: 'Feb', leads: 5 },
    { month: 'Mar', leads: 4 },
    { month: 'Apr', leads: 7 },
    { month: 'May', leads: 6 },
    { month: 'Jun', leads: 12 },
    { month: 'Jul', leads: 8 },
    { month: 'Aug', leads: 9 },
    { month: 'Sep', leads: 6 },
    { month: 'Oct', leads: 5 },
    { month: 'Nov', leads: 7 },
    { month: 'Dec', leads: 4 },
  ];

 
  const leads: Lead[] = [
    {
      leadId: 'LD-104',
      leadName: 'Priya',
      type: 'Wedding',
      createdDate: 'March 26 2025',
      editedDate: 'March 29 2025',
      status: 'New',
    },
  ];

  const recentLeads: RecentLead[] = [
    {
      leadId: 'LD-104',
      leadName: 'Priya',
      type: 'Wedding',
      createdDate: 'March 26 2025',
      status: 'New',
    },
  ];

  const handleViewLead = (leadId: string) => {
    const lead = leads.find(l => l.leadId === leadId);
    if (lead) {
      setSelectedLead(lead);
      setModalMode('view');
      setShowModal(true);
    }
  };

  const handleEditLead = (leadId: string) => {
    const lead = leads.find(l => l.leadId === leadId);
    if (lead) {
      setSelectedLead(lead);
      setModalMode('edit');
      setShowModal(true);
    }
  };

  const handleSaveLead = (leadData: Partial<Lead>) => {
    
    console.log('Save lead:', leadData);
    setShowModal(false);
    setSelectedLead(null);
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
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-5 w-full">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">
            <KPICard title="Active Project" value="24 / 128" />
            <KPICard title="Completed Projects" value={9} />
            <KPICard title="Total Earnings" value="84,000" />
          </div>

          <ChartSection data={chartData} />

         
          <RecentLeadsTable 
            leads={recentLeads}
            onView={handleViewLead}
            onEdit={handleEditLead}
          />
        </main>
      </div>

      <LeadModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedLead(null);
        }}
        onSave={handleSaveLead}
        leadData={selectedLead}
        mode={modalMode}
      />
    </div>
  );
};

export default Dashboard;
