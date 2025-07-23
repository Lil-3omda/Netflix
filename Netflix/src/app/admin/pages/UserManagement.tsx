import React, { useState } from 'react';
import { Search, Filter, UserPlus, Edit, Ban, Mail, MoreVertical } from 'lucide-react';
import type { User } from '../types';

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      subscription: 'Premium',
      status: 'Active',
      joinDate: '2023-01-15',
      lastActive: '2024-01-10',
      region: 'North America'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      subscription: 'Standard',
      status: 'Active',
      joinDate: '2023-03-22',
      lastActive: '2024-01-09',
      region: 'Europe'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      subscription: 'Basic',
      status: 'Inactive',
      joinDate: '2023-06-10',
      lastActive: '2023-12-15',
      region: 'Asia Pacific'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma.w@email.com',
      subscription: 'Premium',
      status: 'Suspended',
      joinDate: '2023-08-05',
      lastActive: '2023-12-20',
      region: 'North America'
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-600';
      case 'Inactive': return 'bg-yellow-600';
      case 'Suspended': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'Premium': return 'bg-purple-600';
      case 'Standard': return 'bg-blue-600';
      case 'Basic': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <UserPlus size={20} />
          <span>Add User</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div className="flex space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2 transition-colors">
            <Filter size={16} />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold">{mockUsers.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Active Users</p>
          <p className="text-2xl font-bold">{mockUsers.filter(u => u.status === 'Active').length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Premium Subscribers</p>
          <p className="text-2xl font-bold">{mockUsers.filter(u => u.subscription === 'Premium').length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Suspended</p>
          <p className="text-2xl font-bold">{mockUsers.filter(u => u.status === 'Suspended').length}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Subscription</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Region</th>
                <th className="text-left p-4">Join Date</th>
                <th className="text-left p-4">Last Active</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-750">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSubscriptionColor(user.subscription)}`}>
                      {user.subscription}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{user.region}</td>
                  <td className="p-4 text-gray-300">{user.joinDate}</td>
                  <td className="p-4 text-gray-300">{user.lastActive}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                        <Mail size={16} />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors text-red-400">
                        <Ban size={16} />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}