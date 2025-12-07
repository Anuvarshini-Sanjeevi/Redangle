import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Eye,
  FileText,
  DollarSign,
  LogOut,
} from 'lucide-react';
import redAngleLogo from '../../assets/red_angle_logo.png';
import type { MenuItem } from '../../pages/partner_page/types';

interface PartnerSidebarProps {
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  menuItems?: MenuItem[];
}

const PartnerSidebar = ({ 
  userName = 'Priya',
  userRole = 'Partner',
  userAvatar,
  menuItems: customMenuItems
}: PartnerSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const defaultMenuItems: MenuItem[] = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-7 h-7" />, path: '/partner/dashboard' },
    { name: 'Leads', icon: <FileText className="w-7 h-7" />, path: '/partner/leads' },
    { name: 'View Leads', icon: <Eye className="w-7 h-7" />, path: '/partner/view-leads' },
    { name: 'Earnings', icon: <DollarSign className="w-7 h-7" />, path: '/partner/earnings' },
  ];

  const menuItems = customMenuItems || defaultMenuItems;

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;
  const isProfileActive = location.pathname === '/partner/profile';

  const avatarUrl = userAvatar || `https://ui-avatars.com/api/?name=${userName}&background=6938ef&color=fff`;

  const handleProfileClick = () => {
    navigate('/partner/profile');
    setIsMobileMenuOpen(false);
  };

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
          backgroundColor: 'rgba(105, 56, 239, 0.10)',
          borderRadius: '24px',
        }}
      >
        <div className="flex flex-col h-full px-4 pt-6 pb-6">
          {/* Partner Profile - Clickable */}
          <button
            onClick={handleProfileClick}
            className="mb-8 flex items-center gap-4 px-2 py-2 rounded-lg transition-colors hover:bg-[#6938ef] hover:bg-opacity-20 cursor-pointer w-full text-left"
            style={
              isProfileActive
                ? {
                    backgroundColor: 'rgba(105, 56, 239, 0.15)',
                    color: '#6938ef',
                  }
                : {
                    backgroundColor: 'transparent',
                    color: '#6938ef',
                  }
            }
          >
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={avatarUrl}
                alt={userName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span 
                className="text-base font-bold"
                style={{ color: '#6938ef' }}
              >
                {userName}
              </span>
              <span className="text-sm text-gray-500">{userRole}</span>
            </div>
          </button>

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
                      className="w-full flex items-center gap-4 px-5 py-3.5 rounded-full transition-colors relative hover:bg-[#6938ef] hover:bg-opacity-20"
                      style={
                        active
                          ? {
                              backgroundColor: '#6938ef',
                              color: '#ffffff',
                            }
                          : {
                              backgroundColor: 'transparent',
                              color: '#333333',
                            }
                      }
                    >
                      {active && (
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                          style={{ backgroundColor: '#6938ef' }}
                        />
                      )}
                      <span
                        className="flex items-center justify-center"
                        style={{
                          color: active ? '#ffffff' : '#000000',
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

          {/* logout + logo */}
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-5 py-3.5 mb-4 rounded-full text-lg text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors"
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

export default PartnerSidebar;


