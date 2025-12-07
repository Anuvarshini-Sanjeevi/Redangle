import { useState, useEffect } from 'react';
import { User, Trash2 } from 'lucide-react';
import type { Lead } from '../pages/admin/ViewLeads';

interface ViewLeadModalProps {
  lead: Lead;
  onClose: () => void;
  onUpdate?: (lead: Lead) => void;
  onDelete?: (leadId: string) => void;
}

const ViewLeadModal = ({ lead, onClose, onUpdate, onDelete }: ViewLeadModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    eventType: '',
    eventDate: '',
    budget: '',
    assignee: '',
    leadSource: ''
  });

  useEffect(() => {
    setFormData({
      firstName: lead.firstName || lead.leadName.split(' ')[0] || '',
      lastName: lead.lastName || lead.leadName.split(' ').slice(1).join(' ') || '',
      email: lead.email || '',
      contactNumber: lead.contactNumber || '',
      address: lead.address || '',
      eventType: lead.eventType || lead.leadName.match(/\(([^)]+)\)/)?.[1] || '',
      eventDate: lead.eventDate || '',
      budget: lead.budget || '',
      assignee: lead.leadSource.assignee || '',
      leadSource: lead.leadSource.type || ''
    });
  }, [lead]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updatedLead: Lead = {
      ...lead,
      firstName: formData.firstName,
      lastName: formData.lastName,
      leadName: `${formData.firstName}${formData.lastName ? ' ' + formData.lastName : ''}${formData.eventType ? ' (' + formData.eventType + ')' : ''}`,
      email: formData.email,
      contactNumber: formData.contactNumber,
      address: formData.address,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      budget: formData.budget,
      leadSource: {
        ...lead.leadSource,
        assignee: formData.assignee,
        type: formData.leadSource
      }
    };
    
    if (onUpdate) {
      onUpdate(updatedLead);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      if (onDelete) {
        onDelete(lead.id);
      }
      onClose();
    }
  };

  const leadName = formData.firstName || lead.leadName.split(' ')[0] || 'Unknown';
  const leadSource = formData.leadSource || lead.leadSource.type || 'Unknown';

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-100 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section - Light Purple Background */}
        <div className="bg-purple-50 px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-gray-700" />
            <h2 className="text-base font-bold text-gray-900">Lead Details</h2>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
              className="px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs uppercase"
          >
            UPDATE EMPLOYEE
          </button>
        </div>

        {/* Lead Overview Section - Light Purple Background */}
        <div className="bg-purple-50 px-6 py-6 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {lead.leadSource.avatar ? (
              <img
                src={lead.leadSource.avatar}
                alt={leadName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={leadName}
                  onChange={(e) => {
                    const nameParts = e.target.value.split(' ');
                    handleChange('firstName', nameParts[0] || '');
                    handleChange('lastName', nameParts.slice(1).join(' ') || '');
                  }}
                  className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-[#6938ef] mb-2"
                  placeholder="Enter name"
                />
                <div className="flex items-center gap-2">
                  <span className="text-base text-gray-700">Lead Source :</span>
                  <select
                    value={formData.leadSource}
                    onChange={(e) => handleChange('leadSource', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-700 appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.25rem center',
                      backgroundSize: '12px',
                      paddingRight: '1.5rem'
                    }}
                  >
                    <option value="">Select lead source</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Assignee">Assignee</option>
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-sm text-gray-900">{leadName}</h3>
                <p className="text-xs text-gray-700 mt-0.5">Lead Source : {leadSource}</p>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Information Card - White Card */}
        <div className="bg-white rounded-xl shadow-lg m-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs font-bold text-gray-900"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs font-bold text-gray-900"
                      placeholder="Last Name"
                    />
                  </div>
                ) : (
                  <p className="text-xs text-gray-900">{formData.firstName} {formData.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Event type</label>
                {isEditing ? (
                  <select
                    value={formData.eventType}
                    onChange={(e) => handleChange('eventType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-base font-bold text-gray-900 appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    <option value="">Select event type</option>
                    <option value="Marriage">Marriage</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                ) : (
                  <p className="text-xs text-gray-900">{formData.eventType || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                {isEditing ? (
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-900 resize-none"
                  />
                ) : (
                  <p className="text-xs text-gray-900 whitespace-pre-line">{formData.address || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Employee Assigned</label>
                {isEditing ? (
                  <select
                    value={formData.assignee}
                    onChange={(e) => handleChange('assignee', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-base font-bold text-gray-900 appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    <option value="">Select Assignee</option>
                    <option value="Ramesh">Ramesh</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Mike Johnson">Mike Johnson</option>
                  </select>
                ) : (
                  <p className="text-xs text-gray-900">{formData.assignee || 'N/A'}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.eventDate ? (() => {
                      const parts = formData.eventDate.split('/');
                      if (parts.length === 3) {
                        return `${parts[2]}-${parts[1]}-${parts[0]}`;
                      }
                      return '';
                    })() : ''}
                    onChange={(e) => {
                      const date = e.target.value;
                      const formatted = date ? (() => {
                        const parts = date.split('-');
                        return `${parts[2]}/${parts[1]}/${parts[0]}`;
                      })() : '';
                      handleChange('eventDate', formatted);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-900"
                  />
                ) : (
                  <p className="text-xs text-gray-900">{formData.eventDate || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-900"
                  />
                ) : (
                  <p className="text-xs text-gray-900">{formData.email || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Contact Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleChange('contactNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-900"
                  />
                ) : (
                  <p className="text-xs text-gray-900">{formData.contactNumber || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Budget</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-900"
                    placeholder="Enter budget"
                  />
                ) : (
                  <p className="text-xs text-gray-900">{formData.budget || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-sm text-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
            <div className="flex items-center gap-3">
              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    // Reset form data
                    setFormData({
                      firstName: lead.firstName || lead.leadName.split(' ')[0] || '',
                      lastName: lead.lastName || lead.leadName.split(' ').slice(1).join(' ') || '',
                      email: lead.email || '',
                      contactNumber: lead.contactNumber || '',
                      address: lead.address || '',
                      eventType: lead.eventType || lead.leadName.match(/\(([^)]+)\)/)?.[1] || '',
                      eventDate: lead.eventDate || '',
                      budget: lead.budget || '',
                      assignee: lead.leadSource.assignee || '',
                      leadSource: lead.leadSource.type || ''
                    });
                  }}
                  className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-all text-xs"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={isEditing ? handleSave : onClose}
                className="px-5 py-2 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs uppercase"
              >
                {isEditing ? 'Save' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLeadModal;

