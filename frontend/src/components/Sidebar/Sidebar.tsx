import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Eye,
  UserCheck,
  FileText,
  CheckCircle,
  Users,
  FileCheck,
  BarChart3,
  LogOut,
} from 'lucide-react';
import redAngleLogo from '../../assets/red_angle_logo.png';

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { name: 'Dashboard',       icon: <LayoutDashboard className="w-7 h-7" />, path: '/admin/dashboard' },
    { name: 'View Leads',      icon: <Eye className="w-7 h-7" />,            path: '/admin/view-leads' },
    { name: 'Assign Leads',    icon: <UserCheck className="w-7 h-7" />,      path: '/admin/assign-leads' },
    { name: 'Tracking Details',icon: <FileText className="w-7 h-7" />,       path: '/admin/tracking' },
    { name: 'Invoice',         icon: <FileText className="w-7 h-7" />,       path: '/admin/invoice' },
    { name: 'Approval',        icon: <CheckCircle className="w-7 h-7" />,    path: '/admin/approval' },
    { name: 'Employees',       icon: <Users className="w-7 h-7" />,          path: '/admin/employees' },
    { name: 'Quotation',       icon: <FileCheck className="w-7 h-7" />,      path: '/admin/quotation' },
    { name: 'Report',          icon: <BarChart3 className="w-7 h-7" />,      path: '/admin/report' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* mobile toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#6938ef] text-white rounded-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-80 flex-shrink-0 transform
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out h-full`}
        style={{
          // #6938ef with 20% opacity
          backgroundColor: 'rgba(105, 56, 239, 0.20)',
          borderRadius: '24px',
        }}
      >
        <div className="flex flex-col h-full px-4 pt-6 pb-6">
          {/* admin avatar */}
          <div className="mb-8 flex items-center gap-4 px-2">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=6938ef&color=fff"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-base font-bold text-gray-700">Admin</span>
          </div>

          {/* menu */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-3">
              {menuItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-full
                        transition-colors`}
                      style={
                        active
                          ? {
                              backgroundColor: 'rgba(105, 56, 239, 0.20)',
                              color: '#6938ef',
                            }
                          : {
                              color: '#333333',
                            }
                      }
                    >
                      <span
                        className="flex items-center justify-center"
                        style={{
                          color: active ? '#6938ef' : '#000000',
                        }}
                      >
                        {item.icon}
                      </span>
                      <span className="font-bold text-lg">{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* logo + logout */}
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-5 py-3.5 mb-4 rounded-full text-lg text-gray-400 cursor-default"
              style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
            >
              <LogOut className="w-7 h-7" />
              <span className="font-bold">Logout</span>
            </button>

            <div className="flex items-center justify-center">
              <img src={redAngleLogo} alt="Red Angle Studio" className="h-8 w-auto" />
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </aside>
    </>
  );
};

export default Sidebar;
