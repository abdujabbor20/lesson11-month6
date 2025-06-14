import React from 'react';
import { Clock, AlertCircle, CheckCircle2, User, Calendar } from 'lucide-react';
import { useProject } from '../../contexts/ProjectContext';
import { useUser } from '../../contexts/UserContext';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
    case 'medium':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
    case 'low':
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed':
      return CheckCircle2;
    case 'in-progress':
      return Clock;
    default:
      return AlertCircle;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 dark:text-green-400';
    case 'in-progress':
      return 'text-blue-600 dark:text-blue-400';
    case 'review':
      return 'text-purple-600 dark:text-purple-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
};

export const TaskBoard = () => {
  const { state: projectState } = useProject();
  const { state: userState } = useUser();

  const allTasks = projectState.projects.flatMap(project =>
    project.tasks.map(task => ({ ...task, projectName: project.name, projectColor: project.color }))
  );

  const recentTasks = allTasks
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 8);

  const getAssignee = (assigneeId) => {
    return userState.users.find(user => user.id === assigneeId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Tasks
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {recentTasks.length} tasks
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentTasks.map((task) => {
            const StatusIcon = getStatusIcon(task.status);
            const assignee = getAssignee(task.assigneeId);

            return (
              <div
                key={task.id}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: task.projectColor }}
                    />
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {task.projectName}
                    </span>
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    <AlertCircle className="w-3 h-3" />
                    <span>{task.priority}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {task.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center space-x-2 ${getStatusColor(task.status)}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-xs font-medium capitalize">
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>

                  {assignee && (
                    <div className="flex items-center space-x-2">
                      <img
                        src={assignee.avatar}
                        alt={assignee.name}
                        className="w-6 h-6 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {assignee.name.split(' ')[0]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <span>Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};