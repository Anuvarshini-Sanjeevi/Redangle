import { useState } from 'react';
import PartnerSidebar from '../../components/PartnerSidebar/PartnerSidebar';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';

const Profile = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    paymentAlerts: false,
    newProjectLaunches: true,
  });

  const [profileData, setProfileData] = useState({
    name: 'Priya',
    role: 'Partner',
    email: 'Priya@gmail.com',
    phone: '+91 - 2345678678',
    accountHolderName: 'Priya',
    bankName: 'SBI',
    accountNumber: 'xxxxxxxx1234',
    ifscCode: 'IFSC000000',
    commissionPercent: '2.0%',
  });

  const avatarUrl = `https://ui-avatars.com/api/?name=${profileData.name}&background=6938ef&color=fff`;

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleReset = () => {
    setNotifications({
      emailNotifications: true,
      paymentAlerts: false,
      newProjectLaunches: true,
    });
  };

  const handleSavePreference = () => {
 
    console.log('Saving preferences:', notifications);
   
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
        <DashboardHeader title="PROFILE AND SETTINGS" />
        
        <main className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-5 w-full">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Profile Details Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={avatarUrl}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 w-full">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
                  <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">{profileData.role}</p>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <span className="text-sm sm:text-base text-gray-600 font-medium">Email</span>
                      <p className="text-sm sm:text-base text-gray-900 font-semibold underline">
                        {profileData.email}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm sm:text-base text-gray-600 font-medium">Phone</span>
                      <p className="text-sm sm:text-base text-gray-900 font-semibold">
                        {profileData.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Bank / Payout details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <span className="text-sm sm:text-base text-gray-600 font-medium">Account holder name</span>
                  <p className="text-sm sm:text-base text-gray-900 font-semibold underline mt-1">
                    {profileData.accountHolderName}
                  </p>
                </div>
                <div>
                  <span className="text-sm sm:text-base text-gray-600 font-medium">Bank name</span>
                  <p className="text-sm sm:text-base text-gray-900 font-semibold mt-1">
                    {profileData.bankName}
                  </p>
                </div>
                <div>
                  <span className="text-sm sm:text-base text-gray-600 font-medium">Account number</span>
                  <p className="text-sm sm:text-base text-gray-900 font-semibold mt-1">
                    {profileData.accountNumber}
                  </p>
                </div>
                <div>
                  <span className="text-sm sm:text-base text-gray-600 font-medium">IFSC code</span>
                  <p className="text-sm sm:text-base text-gray-900 font-semibold mt-1">
                    {profileData.ifscCode}
                  </p>
                </div>
                <div>
                  <span className="text-sm sm:text-base text-gray-600 font-medium">Commission%</span>
                  <p className="text-sm sm:text-base text-gray-900 font-semibold mt-1">
                    {profileData.commissionPercent}
                  </p>
                </div>
              </div>
            </div>

           
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Notification preference</h3>
              
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-900 font-medium">Email notifications</span>
                  <button
                    onClick={() => handleToggle('emailNotifications')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:ring-offset-2 ${
                      notifications.emailNotifications ? 'bg-[#6938ef]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

               
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-900 font-medium">Payment alerts</span>
                  <button
                    onClick={() => handleToggle('paymentAlerts')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:ring-offset-2 ${
                      notifications.paymentAlerts ? 'bg-[#6938ef]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.paymentAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

               
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-900 font-medium">New project launches</span>
                  <button
                    onClick={() => handleToggle('newProjectLaunches')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:ring-offset-2 ${
                      notifications.newProjectLaunches ? 'bg-[#6938ef]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.newProjectLaunches ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#6938ef] text-white rounded-lg font-semibold hover:bg-[#5a2dd4] transition-colors text-sm sm:text-base"
                >
                  Reset
                </button>
                <button
                  onClick={handleSavePreference}
                  className="px-6 py-2.5 bg-[#6938ef] text-white rounded-lg font-semibold hover:bg-[#5a2dd4] transition-colors text-sm sm:text-base"
                >
                  Save Preference
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
