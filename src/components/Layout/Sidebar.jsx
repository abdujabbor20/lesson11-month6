import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Settings, 
  BarChart3,
  Calendar,
  Bell,
  ChevronLeft,
  Plus
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FolderOpen, label: 'Projects', count: 8 },
  { icon: Users, label: 'Team', count: 12 },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Calendar, label: 'Calendar' },
  { icon: Bell, label: 'Notifications', count: 3 },
  { icon: Settings, label: 'Settings' },
];

export const Sidebar = () => {
  const { state: themeState, dispatch: themeDispatch } = useTheme();
  const { state: userState } = useUser();

  return (
    <div
      className={`${
        themeState.sidebarCollapsed ? 'w-20' : 'w-72'
      } h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!themeState.sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                ProjectHub
              </h1>
            </div>
          )}
          <button
            onClick={() => themeDispatch({ type: 'TOGGLE_SIDEBAR' })}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft
              className={`w-5 h-5 text-gray-500 transition-transform ${
                themeState.sidebarCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={userState.currentUser?.avatar}
              alt={userState.currentUser?.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
          </div>
          {!themeState.sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {userState.currentUser?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {userState.currentUser?.email}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              item.active
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!themeState.sidebarCollapsed && (
              <>
                <span className="font-medium truncate">{item.label}</span>
                {item.count && (
                  <span className="ml-auto bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full font-medium">
                    {item.count}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* New Project Button */}
      {!themeState.sidebarCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Project</span>
          </button>
        </div>
      )}
    </div>
  );
};