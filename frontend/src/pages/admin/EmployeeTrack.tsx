import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Calendar, Phone, Mail, Download } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

const EmployeeTrack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employeeData, setEmployeeData] = useState({
    name: 'Arjun',
    eventType: 'Wedding',
    source: 'Website form',
    location: 'NYC, New York, USA',
    eventDate: 'May 19, 1996',
    createdDate: 'May 19, 1996',
    employeeId: 'EMP - 1024',
    email: 'Arjun@gmail.co',
    contact: '91 - 123456785',
    currentStage: 'Assigned',
    avatar: 'https://ui-avatars.com/api/?name=Arjun&background=6938ef&color=fff'
  });

  useEffect(() => {
    if (location.state?.employee) {
      const emp = location.state.employee;
      setEmployeeData({
        name: emp.employeeName || 'Arjun',
        eventType: emp.position || 'Wedding',
        source: 'Website form',
        location: 'NYC, New York, USA',
        eventDate: 'May 19, 1996',
        createdDate: 'May 19, 1996',
        employeeId: emp.employeeId || 'EMP - 1024',
        email: emp.email || 'Arjun@gmail.co',
        contact: emp.contactNumber || '91 - 123456785',
        currentStage: 'Assigned',
        avatar: emp.avatar || 'https://ui-avatars.com/api/?name=Arjun&background=6938ef&color=fff'
      });
    }
  }, [location.state]);

  const stages = ['Assigned', 'Started', 'Inprogress', 'Done'];
  const currentStageIndex = stages.indexOf(employeeData.currentStage);

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 w-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">EMPLOYEE TRACKING</h1>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs">
                <Phone className="w-3.5 h-3.5" />
                Call
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs">
                <Mail className="w-3.5 h-3.5" />
                Email
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Left Sidebar - Profile and Main Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 mb-4">
                <div className="text-center mb-4">
                  <img
                    src={employeeData.avatar}
                    alt={employeeData.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3"
                  />
                  <h2 className="text-lg font-bold text-gray-900">{employeeData.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">{employeeData.eventType}</p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-3">Main info</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Source</label>
                      <input
                        type="text"
                        value={employeeData.source}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Event type</label>
                      <input
                        type="text"
                        value={employeeData.eventType}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Location</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={employeeData.location}
                          readOnly
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                        />
                        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Event Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={employeeData.eventDate}
                          readOnly
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Created Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={employeeData.createdDate}
                          readOnly
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 mb-4">
                <div className="text-center mb-4">
                  <img
                    src={employeeData.avatar}
                    alt={employeeData.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3"
                  />
                  <h2 className="text-lg font-bold text-gray-900">{employeeData.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">{employeeData.eventType}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Employee Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Employee Id</label>
                      <input
                        type="text"
                        value={employeeData.employeeId}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-500 mb-1">EMAIL</label>
                      <input
                        type="email"
                        value={employeeData.email}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Contact</label>
                      <input
                        type="tel"
                        value={employeeData.contact}
                        readOnly
                        className="w-full px-3 py-2 border border-blue-500 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Current stage</label>
                      <input
                        type="text"
                        value={employeeData.currentStage}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Status timeline</h3>
                  <div className="flex items-center justify-between relative px-4">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0" style={{ 
                      background: `linear-gradient(to right, #6938ef 0%, #6938ef 33.33%, #e5e7eb 33.33%, #e5e7eb 100%)` 
                    }}></div>
                    {stages.map((stage, index) => {
                      const isActive = index === 0; // Assigned is the current stage
                      return (
                        <div key={stage} className="relative z-10 flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                              isActive
                                ? 'bg-[#6938ef] text-white'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className={`mt-2 text-sm font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{stage}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeTrack;

