import React from 'react';
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  BarChart3, 
  MessageCircle, 
  MessageSquare, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { AdminPageType } from '../types';

interface SidebarProps {
  currentPage: AdminPageType;
  onPageChange: (page: AdminPageType) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ currentPage, onPageChange, isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as AdminPageType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'content' as AdminPageType, label: 'Content Library', icon: Film },
    { id: 'users' as AdminPageType, label: 'User Management', icon: Users },
    { id: 'analytics' as AdminPageType, label: 'Analytics', icon: BarChart3 },
    { id: 'chatbot' as AdminPageType, label: 'AI Chatbot', icon: MessageCircle },
    { id: 'communications' as AdminPageType, label: 'Communications', icon: MessageSquare },
    { id: 'settings' as AdminPageType, label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-black border-r border-gray-800 transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-sm">
              N
            </div>
            <span className="text-xl font-bold text-red-600">Netflix Admin</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-800 transition-colors ${
                isActive ? 'bg-red-600 hover:bg-red-700' : ''
              }`}
            >
              <Icon size={20} className={`${isOpen ? 'mr-3' : 'mx-auto'}`} />
              {isOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}