import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Upload, Plus, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import CreateQuotationModal from '../../components/CreateQuotationModal';
import SendQuotationModal from '../../components/SendQuotationModal';

interface QuotationPackage {
  id: number;
  leadId?: number;
  eventId?: number;
  serviceName: string;
  description?: string;
  price: number;
  createdAt?: string;
  createdBy?: number;
}

interface AvailableService {
  id: string;
  packageId: string;
  serviceName: string;
  isSelected?: boolean;
}

const Quotation = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<QuotationPackage | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>('PH0001245');
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const itemsPerPage = 8;

  // Sample data - will be replaced with API call
  const [availableServices, setAvailableServices] = useState<AvailableService[]>([
    { id: '1', packageId: 'PH0001245', serviceName: 'Wedding Package', isSelected: true },
    { id: '2', packageId: 'PH0001245', serviceName: 'Birthday Package' },
    { id: '3', packageId: 'PH0001245', serviceName: 'Baby shower package' },
    { id: '4', packageId: 'PH0001245', serviceName: 'Wedding Elite Package' },
    { id: '5', packageId: 'PH0001245', serviceName: 'Pre-wedding Package' },
  ]);

  const [quotationPackages, setQuotationPackages] = useState<QuotationPackage[]>([
    {
      id: 1,
      serviceName: 'Wedding Photoshot',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 50000,
      leadId: 1,
      eventId: 1
    },
    {
      id: 2,
      serviceName: 'Birthday Celebration',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      price: 25000,
      leadId: 2,
      eventId: 2
    },
    {
      id: 3,
      serviceName: 'Baby Shower Event',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 30000,
      leadId: 3,
      eventId: 3
    },
    {
      id: 4,
      serviceName: 'Pre-Wedding Shoot',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price: 40000,
      leadId: 4,
      eventId: 4
    },
    {
      id: 5,
      serviceName: 'Anniversary Party',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      price: 35000,
      leadId: 5,
      eventId: 5
    },
    {
      id: 6,
      serviceName: 'Corporate Event',
      description: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      price: 60000,
      leadId: 6,
      eventId: 6
    },
    {
      id: 7,
      serviceName: 'Graduation Ceremony',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
      price: 20000,
      leadId: 7,
      eventId: 7
    },
    {
      id: 8,
      serviceName: 'Engagement Party',
      description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      price: 45000,
      leadId: 8,
      eventId: 8
    },
  ]);

  const filteredPackages = quotationPackages.filter(pkg =>
    pkg.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPackages = filteredPackages.slice(startIndex, endIndex);

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setAvailableServices(prev => prev.map(s => ({
      ...s,
      isSelected: s.id === serviceId
    })));
  };

  const handleUpload = () => {
    // Handle upload functionality
    console.log('Upload clicked');
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString('en-IN')}`;
  };

  const handlePackageClick = (pkg: QuotationPackage) => {
    setSelectedPackage(pkg);
    setShowSendModal(true);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 w-full">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">QUOTATION</h1>
            <div className="flex items-center gap-2">
              <button className="p-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={handleUpload}
                className="px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs"
              >
                Upload
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs"
              >
                Create New
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Left Sidebar - Available Services */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3">
                <button
                  onClick={() => setServicesExpanded(!servicesExpanded)}
                  className="w-full flex items-center justify-between mb-3"
                >
                  <h2 className="text-sm font-bold text-gray-900">Available Services</h2>
                  {servicesExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>
                {servicesExpanded && (
                  <div className="space-y-2">
                    {availableServices.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceClick(service.id)}
                        className={`p-2 rounded-lg cursor-pointer transition-colors ${
                          service.isSelected
                            ? 'bg-purple-50 border border-purple-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-gray-900">{service.packageId}</p>
                            <p className="text-xs text-gray-600">{service.serviceName}</p>
                          </div>
                        </div>
                        {service.isSelected && (
                          <a
                            href="#"
                            className="text-xs text-[#6938ef] font-medium mt-1 inline-block"
                            onClick={(e) => {
                              e.preventDefault();
                              // Handle view details
                            }}
                          >
                            View details &gt;
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Grid - Quotation Packages */}
            <div className="lg:col-span-3">
              {/* Search */}
              <div className="bg-white rounded-xl shadow-md p-3 border border-gray-100 mb-4">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Q Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs"
                  />
                </div>
              </div>

              {/* Package Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {currentPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handlePackageClick(pkg)}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="h-32 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <div className="text-4xl">📸</div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">{pkg.serviceName}</h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{pkg.description}</p>
                      <p className="text-sm font-bold text-[#6938ef]">{formatPrice(pkg.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white rounded-xl shadow-md p-3 border border-gray-100">
                  <div className="flex items-center justify-end gap-2">
                    <div className="text-xs text-gray-600">
                      {startIndex + 1}-{Math.min(endIndex, filteredPackages.length)} of {filteredPackages.length}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="text-gray-600 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="text-gray-600 disabled:opacity-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Create Quotation Modal */}
      {showCreateModal && (
        <CreateQuotationModal
          onClose={() => setShowCreateModal(false)}
          onSave={(formData) => {
            // Handle save logic
            console.log('Quotation saved:', formData);
            setShowCreateModal(false);
          }}
        />
      )}

      {/* Send Quotation Modal */}
      {showSendModal && selectedPackage && (
        <SendQuotationModal
          package={selectedPackage}
          onClose={() => {
            setShowSendModal(false);
            setSelectedPackage(null);
          }}
          onSend={(formData) => {
            // Handle send logic - creates QuotationApproval
            console.log('Quotation sent to client:', formData);
            setShowSendModal(false);
            setSelectedPackage(null);
          }}
        />
      )}
    </div>
  );
};

export default Quotation;
