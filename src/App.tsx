import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ViewLeads from './pages/admin/ViewLeads';
import './App.css';
import Dashboard from './pages/partner_page/dashboard';
import Leads from './pages/partner_page/Leads';
import PartnerViewLeads from './pages/partner_page/ViewLeads';
import Earnings from './pages/partner_page/Earnings';
import Profile from './pages/partner_page/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/view-leads" element={<ViewLeads />} />
        <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="/partner/dashboard" element={<Dashboard />} />
        <Route path="/partner/leads" element={<Leads />} />
        <Route path="/partner/view-leads" element={<PartnerViewLeads />} />
        <Route path="/partner/earnings" element={<Earnings />} />
        <Route path="/partner/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/partner/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
