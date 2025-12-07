import { useState } from 'react';
import { X } from 'lucide-react';

interface QuotationPackage {
  id: number;
  leadId?: number;
  eventId?: number;
  serviceName: string;
  description?: string;
  price: number;
}

interface SendQuotationModalProps {
  package: QuotationPackage;
  onClose: () => void;
  onSend?: (formData: any) => void;
}

const SendQuotationModal = ({ package: pkg, onClose, onSend }: SendQuotationModalProps) => {
  const [formData, setFormData] = useState({
    leadId: pkg.leadId || '',
    eventId: pkg.eventId || '',
    status: 'Pending' as 'Pending' | 'Approved' | 'Rejected',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSend) {
      onSend({
        ...formData,
        packageId: pkg.id,
        serviceName: pkg.serviceName,
        price: pkg.price
      });
    }
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-base font-bold text-gray-900">Send Quotation to Client</h2>
            <p className="text-xs text-gray-600 mt-0.5">Package: {pkg.serviceName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-red-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-3">
            {/* Package Info Display */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-900">{pkg.serviceName}</h3>
                <p className="text-sm font-bold text-[#6938ef]">Rs. {pkg.price.toLocaleString('en-IN')}</p>
              </div>
              {pkg.description && (
                <p className="text-xs text-gray-600 line-clamp-2">{pkg.description}</p>
              )}
            </div>

            {/* Lead Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Select Lead/Client</label>
              <select
                value={formData.leadId}
                onChange={(e) => handleChange('leadId', parseInt(e.target.value) || '')}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '12px'
                }}
                required
              >
                <option value="">Select Lead</option>
                <option value="1">Lead 1 - John Doe</option>
                <option value="2">Lead 2 - Jane Smith</option>
                <option value="3">Lead 3 - Mike Johnson</option>
                <option value="4">Lead 4 - Sarah Wilson</option>
              </select>
            </div>

            {/* Event Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Select Event</label>
              <select
                value={formData.eventId}
                onChange={(e) => handleChange('eventId', parseInt(e.target.value) || '')}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '12px'
                }}
                required
              >
                <option value="">Select Event</option>
                <option value="1">Event 1 - Wedding</option>
                <option value="2">Event 2 - Birthday</option>
                <option value="3">Event 3 - Corporate</option>
                <option value="4">Event 4 - Anniversary</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '12px'
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea
                placeholder="Add any additional notes for the client"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={3}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200 mt-4">
            <button
              type="submit"
              className="px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs"
            >
              Send Quotation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendQuotationModal;
