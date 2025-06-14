import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <ProjectProvider>
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <Dashboard />
            </div>
          </div>
        </ProjectProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;