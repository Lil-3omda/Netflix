import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function AdminHeader({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search content, users, analytics..."
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@netflix.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
