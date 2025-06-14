import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  projects: [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with modern design and improved UX',
      status: 'active',
      color: '#3B82F6',
      progress: 65,
      dueDate: '2024-03-15',
      memberIds: ['1', '2', '3'],
      createdAt: '2024-01-01',
      tasks: [
        {
          id: '1',
          title: 'Design new homepage',
          description: 'Create wireframes and high-fidelity designs for the new homepage',
          status: 'completed',
          priority: 'high',
          assigneeId: '1',
          dueDate: '2024-02-10',
          createdAt: '2024-01-15',
          updatedAt: '2024-02-08',
        },
        {
          id: '2',
          title: 'Implement responsive navigation',
          description: 'Build a mobile-friendly navigation system',
          status: 'in-progress',
          priority: 'medium',
          assigneeId: '2',
          dueDate: '2024-02-20',
          createdAt: '2024-01-20',
          updatedAt: '2024-02-15',
        },
        {
          id: '3',
          title: 'Content migration',
          description: 'Migrate all existing content to new structure',
          status: 'todo',
          priority: 'medium',
          assigneeId: '3',
          dueDate: '2024-03-01',
          createdAt: '2024-01-25',
          updatedAt: '2024-01-25',
        },
      ],
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Develop cross-platform mobile application for iOS and Android',
      status: 'planning',
      color: '#10B981',
      progress: 25,
      dueDate: '2024-06-30',
      memberIds: ['2', '3'],
      createdAt: '2024-02-01',
      tasks: [
        {
          id: '4',
          title: 'User research and requirements',
          description: 'Conduct user interviews and define app requirements',
          status: 'in-progress',
          priority: 'high',
          assigneeId: '2',
          dueDate: '2024-02-28',
          createdAt: '2024-02-05',
          updatedAt: '2024-02-15',
        },
        {
          id: '5',
          title: 'UI/UX design',
          description: 'Design app interface and user experience flows',
          status: 'todo',
          priority: 'high',
          assigneeId: '1',
          dueDate: '2024-03-15',
          createdAt: '2024-02-10',
          updatedAt: '2024-02-10',
        },
      ],
    },
    {
      id: '3',
      name: 'Database Migration',
      description: 'Migrate legacy database to modern cloud infrastructure',
      status: 'completed',
      color: '#8B5CF6',
      progress: 100,
      dueDate: '2024-01-31',
      memberIds: ['2'],
      createdAt: '2023-12-01',
      tasks: [
        {
          id: '6',
          title: 'Data backup and validation',
          description: 'Create comprehensive backup and validate data integrity',
          status: 'completed',
          priority: 'high',
          assigneeId: '2',
          dueDate: '2024-01-15',
          createdAt: '2023-12-05',
          updatedAt: '2024-01-14',
        },
      ],
    },
    {
      id: '4',
      name: 'E-commerce Platform',
      description: 'Build a modern e-commerce platform with payment integration',
      status: 'active',
      color: '#F59E0B',
      progress: 40,
      dueDate: '2024-05-20',
      memberIds: ['1', '3'],
      createdAt: '2024-02-15',
      tasks: [
        {
          id: '7',
          title: 'Product catalog system',
          description: 'Implement product management and catalog features',
          status: 'in-progress',
          priority: 'high',
          assigneeId: '1',
          dueDate: '2024-03-10',
          createdAt: '2024-02-20',
          updatedAt: '2024-02-25',
        },
        {
          id: '8',
          title: 'Payment gateway integration',
          description: 'Integrate Stripe and PayPal payment systems',
          status: 'todo',
          priority: 'medium',
          assigneeId: '3',
          dueDate: '2024-04-01',
          createdAt: '2024-02-22',
          updatedAt: '2024-02-22',
        },
      ],
    },
  ],
  currentProject: null,
  searchTerm: '',
  filterStatus: '',
  isLoading: false,
};

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id
            ? { ...project, ...action.payload.updates }
            : project
        ),
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
      };
    case 'SET_CURRENT_PROJECT':
      return { ...state, currentProject: action.payload };
    case 'ADD_TASK':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, tasks: [...project.tasks, action.payload.task] }
            : project
        ),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? {
                ...project,
                tasks: project.tasks.map(task =>
                  task.id === action.payload.taskId
                    ? { ...task, ...action.payload.updates }
                    : task
                ),
              }
            : project
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? {
                ...project,
                tasks: project.tasks.filter(task => task.id !== action.payload.taskId),
              }
            : project
        ),
      };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_FILTER_STATUS':
      return { ...state, filterStatus: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};