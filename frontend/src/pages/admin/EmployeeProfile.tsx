import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Filter, MapPin, Calendar, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

interface Project {
  id: string;
  projectId: string;
  projectName: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  role: string;
  status: 'Done' | 'In Progress' | 'In Review';
  team: string[];
  avatar: string;
}

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('Current Projects');
  const itemsPerPage = 8;

  const [employeeInfo, setEmployeeInfo] = useState({
    name: 'Arjun',
    position: 'Designer',
    company: 'Cadabra',
    location: 'NYC, New York, USA',
    birthday: 'May 19, 1996',
    email: 'arjun@gmail.com',
    mobile: '+1 675 346 23-10',
    experience: 'Evan 2256',
    avatar: 'https://ui-avatars.com/api/?name=Arjun&background=6938ef&color=fff'
  });

  useEffect(() => {
    if (location.state?.employee) {
      const emp = location.state.employee;
      setEmployeeInfo({
        name: emp.employeeName || 'Arjun',
        position: emp.position || 'Designer',
        company: 'Cadabra',
        location: 'NYC, New York, USA',
        birthday: 'May 19, 1996',
        email: emp.email || 'arjun@gmail.com',
        mobile: emp.contactNumber || '+1 675 346 23-10',
        experience: 'Evan 2256',
        avatar: emp.avatar || 'https://ui-avatars.com/api/?name=Arjun&background=6938ef&color=fff'
      });
    }
  }, [location.state]);

  const projects: Project[] = [
    {
      id: '1',
      projectId: 'PN0001265',
      projectName: 'Priya (Wedding)',
      date: 'Sep 12, 2020',
      priority: 'Medium',
      role: 'Photographer',
      status: 'In Progress',
      team: ['user1', 'user2', 'user3'],
      avatar: 'https://ui-avatars.com/api/?name=Priya&background=10b981&color=fff'
    },
    {
      id: '2',
      projectId: 'PN0001221',
      projectName: 'Video Edition (Pre-Wedding)',
      date: 'Sep 10, 2020',
      priority: 'Medium',
      role: 'Editor',
      status: 'Done',
      team: ['user1', 'user2', 'user3'],
      avatar: 'https://ui-avatars.com/api/?name=Arjun&background=3b82f6&color=fff'
    },
    {
      id: '3',
      projectId: 'PN0001290',
      projectName: 'Photograph - birthday',
      date: 'May 28, 2020',
      priority: 'Low',
      role: 'Designer',
      status: 'In Review',
      team: ['user1', 'user2', 'user3'],
      avatar: 'https://ui-avatars.com/api/?name=Arjun&background=f59e0b&color=fff'
    },
    {
      id: '4',
      projectId: 'PN0001300',
      projectName: 'Wedding Photography',
      date: 'Jun 15, 2020',
      priority: 'High',
      role: 'Photographer',
      status: 'In Progress',
      team: ['user1', 'user2', 'user3'],
      avatar: 'https://ui-avatars.com/api/?name=Wedding&background=ef4444&color=fff'
    },
    {
      id: '5',
      projectId: 'PN0001310',
      projectName: 'Baby Shower Event',
      date: 'Jul 20, 2020',
      priority: 'Medium',
      role: 'Designer',
      status: 'Done',
      team: ['user1', 'user2', 'user3'],
      avatar: 'https://ui-avatars.com/api/?name=Baby+Shower&background=8b5cf6&color=fff'
    },
    {
      id: '6',
      projectId: 'PN0001320',
      projectName: 'Corporate Event',
      date: 'Aug 5, 2020',
      priority: 'Low',
      role: 'Editor',
      status: 'In Progress',
      team: ['user1', 'user2', 'user3'],
      avatar: 'https://ui-avatars.com/api/?name=Corporate&background=14b8a6&color=fff'
    },
    {
      id: '7',
      projectId: 'PN0001330',
      projectName: 'Birthday Party',
      date: 'Sep 1, 2020',
      priority: 'Medium',
      role: 'Photographer',
      status: 'In Review',
      team: ['user1', 'user2', 'user3'],
      avatar: 'https://ui-avatars.com/api/?name=Birthday&background=ec4899&color=fff'
    },
    {
      id: '8',
      projectId: 'PN0001340',
      projectName: 'Anniversary Celebration',
      date: 'Oct 10, 2020',
      priority: 'High',
      role: 'Designer',
      status: 'Done',
      team: ['user1', 'user2', 'user3'],
      avatar: 'https://ui-avatars.com/api/?name=Anniversary&background=06b6d4&color=fff'
    }
  ];

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    if (status === 'Done') return 'bg-green-100 text-green-800';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800';
    if (status === 'In Review') return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };


  const handleProjectClick = (project: Project) => {
    navigate('/admin/tracking/employee-profile/track-employee', {
      state: {
        employee: {
          employeeName: employeeInfo.name,
          employeeId: employeeInfo.experience || 'EMP-001',
          contactNumber: employeeInfo.mobile,
          email: employeeInfo.email,
          position: employeeInfo.position,
          avatar: employeeInfo.avatar,
          location: employeeInfo.location
        },
        project: project
      }
    });
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-50 flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5">Employee Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Left Column - Employee Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-3 border border-gray-100 max-w-sm">
                <div className="text-center mb-3">
                  <img
                    src={employeeInfo.avatar}
                    alt={employeeInfo.name}
                    className="w-12 h-12 rounded-full mx-auto mb-2"
                  />
                  <h2 className="text-sm font-bold text-gray-900">{employeeInfo.name}</h2>
                  <p className="text-xs text-gray-600 mt-1 font-normal">{employeeInfo.position}</p>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Position</label>
                    <input
                      type="text"
                      value={employeeInfo.position}
                      readOnly
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Company</label>
                    <input
                      type="text"
                      value={employeeInfo.company}
                      readOnly
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={employeeInfo.location}
                        readOnly
                        className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-xs"
                      />
                      <MapPin className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Birthday Date</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={employeeInfo.birthday}
                        readOnly
                        className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-xs"
                      />
                      <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={employeeInfo.email}
                        readOnly
                        className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-xs"
                      />
                      <Mail className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Mobile Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={employeeInfo.mobile}
                        readOnly
                        className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-xs"
                      />
                      <Phone className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Experience</label>
                    <input
                      type="text"
                      value={employeeInfo.experience}
                      readOnly
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Projects */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6938ef] text-xs"
                    >
                      <option>Current Projects</option>
                      <option>All Projects</option>
                      <option>Completed Projects</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={project.avatar}
                          alt={project.projectName}
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 mb-0.5">{project.projectId}</p>
                          <h3 className="text-xs text-gray-900 mb-0.5 truncate">{project.projectName}</h3>
                          <p className="text-xs text-gray-500 mb-2">{project.date}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <div>
                              <span className="text-xs text-gray-500">Role: </span>
                              <span className="text-xs text-gray-900">{project.role}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                            <div className="flex items-center gap-1">
                              {project.team.slice(0, 3).map((_, idx) => (
                                <div
                                  key={idx}
                                  className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white -ml-2 first:ml-0"
                                />
                              ))}
                              <span className="text-xs text-gray-500 ml-1">+{project.team.length - 3}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-end gap-2">
                    <div className="text-xs text-gray-600">
                      {startIndex + 1}-{Math.min(endIndex, projects.length)} of {projects.length}
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
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeProfile;

