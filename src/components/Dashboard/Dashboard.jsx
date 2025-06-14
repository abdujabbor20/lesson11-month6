import React from 'react';
import { StatsCards } from './StatsCards';
import { ProjectList } from './ProjectList';
import { TaskBoard } from './TaskBoard';
import { useProject } from '../../contexts/ProjectContext';
import { TrendingUp, Users, Calendar, Target } from 'lucide-react';

export const Dashboard = () => {
  const { state: projectState } = useProject();

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="p-8">
        {/* Welcome header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening with your projects today.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Projects */}
          <div className="lg:col-span-1">
            <ProjectList />
          </div>

          {/* Tasks */}
          <div className="lg:col-span-1">
            <TaskBoard />
          </div>
        </div>

        {/* Quick actions and insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Team Performance</h3>
            </div>
            <p className="text-blue-100 text-sm mb-4">
              Your team completed 23 tasks this week! That's 15% more than last week.
            </p>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm">
              View Details
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Project Health</h3>
            </div>
            <p className="text-green-100 text-sm mb-4">
              All projects are on track for this month. Great job keeping everything organized!
            </p>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm">
              View Reports
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
            </div>
            <p className="text-purple-100 text-sm mb-4">
              3 projects due in the next 7 days. Stay focused to meet your deadlines!
            </p>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm">
              Review Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};