import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Calendar, Phone, Mail, Download } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

const LeadTrack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [leadData, setLeadData] = useState({
    name: 'Arjun',
    eventType: 'Wedding',
    source: 'Website form',
    location: 'NYC, New York, USA',
    eventDate: 'May 19, 1996',
    createdDate: 'May 19, 1996',
    leadId: 'LD - 1024',
    email: 'Arjun@gmail.co',
    contact: '91 - 123456785',
    currentStage: 'Lead',
    avatar: 'https://ui-avatars.com/api/?name=Arjun&background=6938ef&color=fff'
  });

  useEffect(() => {
    if (location.state?.lead) {
      const lead = location.state.lead;
      setLeadData({
        name: lead.leadName?.split(' ')[0] || lead.firstName || 'Arjun',
        eventType: lead.eventType || lead.leadName?.match(/\(([^)]+)\)/)?.[1] || 'Wedding',
        source: lead.leadSource?.type || 'Website form',
        location: lead.address || 'NYC, New York, USA',
        eventDate: lead.eventDate || 'May 19, 1996',
        createdDate: lead.createdTime || 'May 19, 1996',
        leadId: lead.leadId || 'LD - 1024',
        email: lead.email || 'Arjun@gmail.co',
        contact: lead.contactNumber || '91 - 123456785',
        currentStage: 'Lead',
        avatar: lead.leadSource?.avatar || 'https://ui-avatars.com/api/?name=Arjun&background=6938ef&color=fff'
      });
    }
  }, [location.state]);

  const stages = ['Lead', 'Quotation', 'Confirmation', 'Finalize'];
  const currentStageIndex = stages.indexOf(leadData.currentStage);

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 w-full">
          <h1 className="text-base sm:text-lg font-bold text-gray-900 mb-3">LEADS TRACKING</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Left Sidebar - Profile and Main Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-3 border border-gray-100 mb-4">
                <div className="text-center mb-3">
                  <img
                    src={leadData.avatar}
                    alt={leadData.name}
                    className="w-12 h-12 rounded-full mx-auto mb-2"
                  />
                  <h2 className="text-sm font-bold text-gray-900">{leadData.name}</h2>
                  <p className="text-gray-600 text-xs mt-1 font-normal">{leadData.eventType}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-900 mb-2">Main info</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Source</label>
                      <input
                        type="text"
                        value={leadData.source}
                        readOnly
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 text-xs"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Event type</label>
                      <input
                        type="text"
                        value={leadData.eventType}
                        readOnly
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 text-xs"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={leadData.location}
                          readOnly
                          className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded-lg bg-white text-gray-900 text-xs"
                        />
                        <MapPin className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Event Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={leadData.eventDate}
                          readOnly
                          className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded-lg bg-white text-gray-900 text-xs"
                        />
                        <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Created Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={leadData.createdDate}
                          readOnly
                          className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded-lg bg-white text-gray-900 text-xs"
                        />
                        <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md p-3 border border-gray-100 mb-4">
                {/* Highlighted Lead Profile - Blue Box */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={leadData.avatar}
                        alt={leadData.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h2 className="text-sm font-bold text-gray-900">{leadData.name}</h2>
                        <p className="text-xs text-gray-600 mt-0.5 font-normal">{leadData.eventType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6938ef] text-white rounded-lg font-semibold hover:bg-[#5a2dd4] text-xs">
                        <Phone className="w-3.5 h-3.5" />
                        Call
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6938ef] text-white rounded-lg font-semibold hover:bg-[#5a2dd4] text-xs">
                        <Mail className="w-3.5 h-3.5" />
                        Email
                      </button>
                    </div>
                  </div>
                </div>

                {/* Lead Details Section */}
                <div className="mb-3">
                  <h3 className="text-xs font-bold text-gray-900 mb-2">Lead Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Employee Id</label>
                      <input
                        type="text"
                        value={leadData.leadId}
                        readOnly
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 text-xs"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <label className="block text-xs font-medium text-gray-500 mb-1">EMAIL</label>
                      <input
                        type="email"
                        value={leadData.email}
                        readOnly
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 text-xs"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Contact</label>
                      <input
                        type="tel"
                        value={leadData.contact}
                        readOnly
                        className="w-full px-2 py-1.5 border border-blue-500 rounded-lg bg-white text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Current stage</label>
                      <input
                        type="text"
                        value={leadData.currentStage}
                        readOnly
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-900 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-4">
                  <h3 className="text-xs font-bold text-gray-900 mb-3">Status timeline</h3>
                  <div className="flex items-center justify-between relative px-3">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0 bg-gray-200"></div>
                    {stages.map((stage, index) => {
                      const isActive = index === 0; // Lead is the current stage
                      return (
                        <div key={stage} className="relative z-10 flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                              isActive
                                ? 'bg-[#6938ef] text-white'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className={`mt-1.5 text-xs font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{stage}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
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

export default LeadTrack;

