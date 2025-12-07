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
        <Route path="/admin/employees" element={<EmployeeProfile />} />
        <Route path="/admin/employee-track" element={<EmployeeTrack />} />
        <Route path="/admin/lead-track" element={<LeadTrack />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
