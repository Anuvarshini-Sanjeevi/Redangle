import { useState, useEffect } from 'react';
import { User, Trash2 } from 'lucide-react';
import type { Employee } from '../pages/admin/AssignLeads';

interface ViewEmployeeModalProps {
  employee: Employee;
  onClose: () => void;
  onUpdate?: (employee: Employee) => void;
  onDelete?: (employeeId: string) => void;
}

const ViewEmployeeModal = ({ employee, onClose, onUpdate, onDelete }: ViewEmployeeModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    taskName: '',
    taskGroup: '',
    estimate: '',
    deadline: '',
    priority: '',
    assignee: '',
    description: '',
    email: '',
    contactNumber: ''
  });

  useEffect(() => {
    setFormData({
      taskName: employee.taskName || employee.employeeName || '',
      taskGroup: employee.taskGroup || employee.department.type || '',
      estimate: employee.estimate || '',
      deadline: employee.deadline || '',
      priority: employee.priority || '',
      assignee: employee.department.manager || '',
      description: employee.description || '',
      email: employee.email || '',
      contactNumber: employee.contactNumber || ''
    });
  }, [employee]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updatedEmployee: Employee = {
      ...employee,
      taskName: formData.taskName,
      taskGroup: formData.taskGroup,
      estimate: formData.estimate,
      deadline: formData.deadline,
      priority: formData.priority as 'High' | 'Medium' | 'Low',
      description: formData.description,
      email: formData.email,
      contactNumber: formData.contactNumber,
      employeeName: formData.taskName || employee.employeeName,
      department: {
        ...employee.department,
        type: formData.taskGroup || employee.department.type,
        manager: formData.assignee,
        avatar: formData.assignee ? `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.assignee)}&background=6938ef&color=fff` : employee.department.avatar
      }
    };
    
    if (onUpdate) {
      onUpdate(updatedEmployee);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this employee assignment?')) {
      if (onDelete) {
        onDelete(employee.id);
      }
      onClose();
    }
  };

  const employeeName = formData.taskName || employee.employeeName || 'Unknown';
  const department = formData.taskGroup || employee.department.type || 'Unknown';

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
            <h2 className="text-base font-bold text-gray-900">Employee Details</h2>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs uppercase"
          >
            UPDATE EMPLOYEE
          </button>
        </div>

        {/* Employee Overview Section - Light Purple Background */}
        <div className="bg-purple-50 px-6 py-6 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {employee.department.avatar ? (
              <img
                src={employee.department.avatar}
                alt={employeeName}
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
                  value={employeeName}
                  onChange={(e) => handleChange('taskName', e.target.value)}
                  className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-[#6938ef] mb-2"
                  placeholder="Enter task name"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-700">Department :</span>
                  <select
                    value={formData.taskGroup}
                    onChange={(e) => handleChange('taskGroup', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-700 appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.25rem center',
                      backgroundSize: '12px',
                      paddingRight: '1.5rem'
                    }}
                  >
                    <option value="">Select department</option>
                    <option value="Design">Design</option>
                    <option value="Event Management">Event Management</option>
                    <option value="Photography">Photography</option>
                    <option value="Coordination">Coordination</option>
                    <option value="Catering">Catering</option>
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-sm text-gray-900">{employeeName}</h3>
                <p className="text-xs text-gray-700 mt-0.5">Department : {department}</p>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Information Card - White Card */}
        <div className="bg-white rounded-xl shadow-lg m-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Task Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.taskName}
                    onChange={(e) => handleChange('taskName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-900"
                    placeholder="Task Name"
                  />
                ) : (
                  <p className="text-xs font-bold text-gray-900">{formData.taskName || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Task Group</label>
                {isEditing ? (
                  <select
                    value={formData.taskGroup}
                    onChange={(e) => handleChange('taskGroup', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-900 appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    <option value="">Select Task Group</option>
                    <option value="Design">Design</option>
                    <option value="Event Management">Event Management</option>
                    <option value="Photography">Photography</option>
                    <option value="Coordination">Coordination</option>
                    <option value="Catering">Catering</option>
                  </select>
                ) : (
                  <p className="text-xs font-bold text-gray-900">{formData.taskGroup || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Estimate</label>
                {isEditing ? (
                  <select
                    value={formData.estimate}
                    onChange={(e) => handleChange('estimate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-900 appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    <option value="">Select duration</option>
                    <option value="1 day">1 day</option>
                    <option value="3 days">3 days</option>
                    <option value="1 week">1 week</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="1 month">1 month</option>
                  </select>
                ) : (
                  <p className="text-xs font-bold text-gray-900">{formData.estimate || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Assignee</label>
                {isEditing ? (
                  <select
                    value={formData.assignee}
                    onChange={(e) => handleChange('assignee', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-900 appearance-none bg-white"
                    style={{
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
                    <option value="Sarah Wilson">Sarah Wilson</option>
                    <option value="Tom Brown">Tom Brown</option>
                    <option value="Lisa Davis">Lisa Davis</option>
                    <option value="David Lee">David Lee</option>
                  </select>
                ) : (
                  <p className="text-xs font-bold text-gray-900">{formData.assignee || 'N/A'}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Deadline</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.deadline ? (() => {
                      const parts = formData.deadline.split('/');
                      if (parts.length === 3) {
                        return `${parts[2]}-${parts[1]}-${parts[0]}`;
                      }
                      return formData.deadline;
                    })() : ''}
                    onChange={(e) => {
                      const date = e.target.value;
                      const formatted = date ? (() => {
                        const parts = date.split('-');
                        return `${parts[2]}/${parts[1]}/${parts[0]}`;
                      })() : '';
                      handleChange('deadline', formatted);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-900"
                  />
                ) : (
                  <p className="text-xs font-bold text-gray-900">{formData.deadline || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Priority</label>
                {isEditing ? (
                  <select
                    value={formData.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs text-gray-900 appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                ) : (
                  <p className="text-xs font-bold text-gray-900">{formData.priority || 'N/A'}</p>
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
                  <p className="text-xs font-bold text-gray-900">{formData.email || 'N/A'}</p>
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
                  <p className="text-xs font-bold text-gray-900">{formData.contactNumber || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                {isEditing ? (
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-base font-bold text-gray-900 resize-none"
                  />
                ) : (
                  <p className="text-xs text-gray-900 whitespace-pre-line">{formData.description || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
            <div className="flex items-center gap-3">
              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    // Reset form data
                    setFormData({
                      taskName: employee.taskName || employee.employeeName || '',
                      taskGroup: employee.taskGroup || employee.department.type || '',
                      estimate: employee.estimate || '',
                      deadline: employee.deadline || '',
                      priority: employee.priority || '',
                      assignee: employee.department.manager || '',
                      description: employee.description || '',
                      email: employee.email || '',
                      contactNumber: employee.contactNumber || ''
                    });
                  }}
                  className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-all text-xs"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={isEditing ? handleSave : onClose}
                className="px-2.5 py-1.5 bg-gradient-to-r from-[#6938ef] to-[#5a2dd4] text-white rounded-md font-medium hover:from-[#5a2dd4] hover:to-[#4a23c3] transition-all shadow-sm text-xs uppercase"
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

export default ViewEmployeeModal;

