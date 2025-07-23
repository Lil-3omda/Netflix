import React, { useState } from 'react';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { Dashboard } from './pages/Dashboard';
import { ContentManagement } from './pages/ContentManagement';
import { UserManagement } from './pages/UserManagement';
import { Analytics } from './pages/Analytics';
import { Chatbot } from './pages/Chatbot';
import { Communications } from './pages/Communications';
import { Settings } from './pages/Settings';
import type { AdminPageType } from './types';

export function AdminApp() {
  const [currentPage, setCurrentPage] = useState<AdminPageType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'content':
        return <ContentManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <Analytics />;
      case 'chatbot':
        return <Chatbot />;
      case 'communications':
        return <Communications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        <AdminSidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}