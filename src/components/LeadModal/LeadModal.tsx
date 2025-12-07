import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';

export interface Lead {
  leadId: string;
  leadName: string;
  type: string;
  createdDate: string;
  editedDate: string;
  status: string;
  // Extended fields for the form
  firstName?: string;
  lastName?: string;
  email?: string;
  priority?: string;
  contactNumber?: string;
  address?: string;
  eventType?: string;
  leadSource?: string;
  budget?: string;
  eventDate?: string;
  assignee?: string;
  description?: string;
}

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (leadData: Partial<Lead>) => void;
  leadData?: Lead | null;
  mode: 'add' | 'edit' | 'view';
}

const LeadModal = ({ isOpen, onClose, onSave, leadData, mode }: LeadModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    priority: '',
    contactNumber: '',
    address: '',
    eventType: '',
    leadSource: '',
    budget: '',
    eventDate: '',
    assignee: '',
    description: ''
  });

  // Update form data when leadData changes
  useEffect(() => {
    if (leadData) {
      setFormData({
        firstName: leadData.firstName || '',
        lastName: leadData.lastName || '',
        email: leadData.email || '',
        priority: leadData.priority || '',
        contactNumber: leadData.contactNumber || '',
        address: leadData.address || '',
        eventType: leadData.eventType || leadData.type || '',
        leadSource: leadData.leadSource || '',
        budget: leadData.budget || '',
        eventDate: leadData.eventDate || '',
        assignee: leadData.assignee || '',
        description: leadData.description || ''
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        priority: '',
        contactNumber: '',
        address: '',
        eventType: '',
        leadSource: '',
        budget: '',
        eventDate: '',
        assignee: '',
        description: ''
      });
    }
  }, [leadData, isOpen]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Partial<Lead> = {
      ...formData,
      leadName: `${formData.firstName} ${formData.lastName}`.trim(),
      type: formData.eventType,
      createdDate: leadData?.createdDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      editedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: leadData?.status || 'New',
      leadId: leadData?.leadId || `LD-${Math.floor(Math.random() * 1000)}`,
    };
    onSave(newLead);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'add' ? 'Add New Leads' : mode === 'edit' ? 'Edit Lead' : 'View Lead'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{currentDate}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Communication Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Communication Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="">Choose the priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.contactNumber}
                  onChange={(e) => handleChange('contactNumber', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => handleChange('eventType', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="">Select event type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Pre-Wedding">Pre-Wedding</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Photoshoot">Photoshoot</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                <select
                  value={formData.leadSource}
                  onChange={(e) => handleChange('leadSource', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="">Select lead source</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Assignee">Assignee</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget (Optional)</label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="">Choose budget</option>
                  <option value="0-10000">$0 - $10,000</option>
                  <option value="10000-25000">$10,000 - $25,000</option>
                  <option value="25000-50000">$25,000 - $50,000</option>
                  <option value="50000+">$50,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                <div className="relative">
                  <input
                    type="date"
                    placeholder="Choose event date"
                    value={formData.eventDate}
                    onChange={(e) => handleChange('eventDate', e.target.value)}
                    disabled={mode === 'view'}
                    className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    style={{
                      border: '1px solid rgba(0, 0, 0, 0.2)'
                    }}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                <select
                  value={formData.assignee}
                  onChange={(e) => handleChange('assignee', e.target.value)}
                  disabled={mode === 'view'}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="">Select Assignee</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Add some description of the task"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  disabled={mode === 'view'}
                  rows={4}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {mode !== 'view' && (
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-lg font-semibold hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-lg"
              >
                Save Lead
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LeadModal;
