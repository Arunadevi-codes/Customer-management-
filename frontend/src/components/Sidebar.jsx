// src/pages/Sidebar.jsx
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  LogOut,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [collapsed] = useState(false);
  // const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);
  //     // setUserName(user.name || user.username || 'User');
  //   }
  // }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', active: location.pathname === '/dashboard' },
    { icon: Users, label: 'Customers', path: '/customers', active: location.pathname === '/customers' },
    { icon: Briefcase, label: 'Staff', path: '/staff', active: location.pathname === '/staff' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div 
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >

      {/* Main Menu */}
      <nav className="flex-1 py-4">
        <div className="space-y-1 px-2">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                item.active
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-[#FFDAB9]'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <item.icon size={20} />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="border-t border-gray-200 py-4">
        <div className="space-y-1 px-2">
          <button
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              navigate('/');
            }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-[#FFDAB9] transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={20} />
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;