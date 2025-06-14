import React from 'react';
import { FolderOpen, Users, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useProject } from '../../contexts/ProjectContext';
import { useUser } from '../../contexts/UserContext';

export const StatsCards = () => {
  const { state: projectState } = useProject();
  const { state: userState } = useUser();

  const completedTasks = projectState.projects.reduce(
    (acc, project) => acc + project.tasks.filter(task => task.status === 'completed').length,
    0
  );

  const inProgressTasks = projectState.projects.reduce(
    (acc, project) => acc + project.tasks.filter(task => task.status === 'in-progress').length,
    0
  );

  const stats = [
    {
      title: 'Total Projects',
      value: projectState.projects.length,
      icon: FolderOpen,
      color: 'bg-blue-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      change: '+12%',
      changeColor: 'text-green-600',
    },
    {
      title: 'Team Members',
      value: userState.users.length,
      icon: Users,
      color: 'bg-green-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      textColor: 'text-green-600 dark:text-green-400',
      change: '+3',
      changeColor: 'text-green-600',
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: CheckCircle,
      color: 'bg-purple-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      change: '+23%',
      changeColor: 'text-green-600',
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'bg-orange-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      change: '+8%',
      changeColor: 'text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className={`text-sm font-medium ${stat.changeColor}`}>
                {stat.change}
              </span>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {stat.title}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};