import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ViewLeads from './pages/admin/ViewLeads';
import AddLead from './pages/admin/AddLead';
import ViewLead from './pages/admin/ViewLead';
import AssignLeads from './pages/admin/AssignLeads';
import TrackingDetails from './pages/admin/TrackingDetails';
import EmployeeProfile from './pages/admin/EmployeeProfile';
import EmployeeTrack from './pages/admin/EmployeeTrack';
import LeadTrack from './pages/admin/LeadTrack';
import Approval from './pages/admin/Approval';
import Employees from './pages/admin/Employees';
import EmployeeActivity from './pages/admin/EmployeeActivity';
import Quotation from './pages/admin/Quotation';
import Report from './pages/admin/Report';
import EmployeeAttendanceReport from './pages/admin/EmployeeAttendanceReport';
import ClientReport from './pages/admin/ClientReport';
import InvoiceReport from './pages/admin/InvoiceReport';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/view-leads" element={<ViewLeads />} />
        <Route path="/admin/add-lead" element={<AddLead />} />
        <Route path="/admin/view-lead/:id" element={<ViewLead />} />
        <Route path="/admin/assign-leads" element={<AssignLeads />} />
        <Route path="/admin/tracking" element={<TrackingDetails />} />
        <Route path="/admin/approval" element={<Approval />} />
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/employees/activity" element={<EmployeeActivity />} />
        <Route path="/admin/employees/profile" element={<EmployeeProfile />} />
        <Route path="/admin/quotation" element={<Quotation />} />
        <Route path="/admin/report" element={<Report />} />
        <Route path="/admin/report/employee-attendance" element={<EmployeeAttendanceReport />} />
        <Route path="/admin/report/client" element={<ClientReport />} />
        <Route path="/admin/report/invoice" element={<InvoiceReport />} />
        <Route path="/admin/tracking/track-leads" element={<LeadTrack />} />
        <Route path="/admin/tracking/employee-profile/track-employee" element={<EmployeeTrack />} />
        <Route path="/admin/employee-track" element={<EmployeeTrack />} />
        <Route path="/admin/lead-track" element={<LeadTrack />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
