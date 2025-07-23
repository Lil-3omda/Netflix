import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Send, Filter, Search, MoreVertical } from 'lucide-react';
import type { Conversation, Platform } from '../types';

export function Communications() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const platforms: Platform[] = [
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, color: 'text-green-400', active: 1247 },
    { id: 'telegram', name: 'Telegram', icon: Send, color: 'text-blue-400', active: 892 },
    { id: 'sms', name: 'SMS', icon: Phone, color: 'text-yellow-400', active: 634 },
    { id: 'email', name: 'Email', icon: Mail, color: 'text-purple-400', active: 2156 }
  ];

  const conversations: Conversation[] = [
    {
      id: 1,
      user: 'John Smith',
      platform: 'WhatsApp',
      lastMessage: 'I can\'t find the new season of Stranger Things',
      timestamp: '2 min ago',
      status: 'unread',
      priority: 'medium'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      platform: 'Telegram',
      lastMessage: 'My payment failed, can you help?',
      timestamp: '5 min ago',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 3,
      user: 'Mike Chen',
      platform: 'SMS',
      lastMessage: 'How do I change my subscription plan?',
      timestamp: '12 min ago',
      status: 'pending',
      priority: 'low'
    },
    {
      id: 4,
      user: 'Emma Wilson',
      platform: 'Email',
      lastMessage: 'Account suspended - need assistance',
      timestamp: '1 hour ago',
      status: 'resolved',
      priority: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-600';
      case 'pending': return 'bg-yellow-600';
      case 'in-progress': return 'bg-blue-600';
      case 'resolved': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || conv.platform.toLowerCase() === selectedPlatform.toLowerCase();
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Multi-Platform Communications</h1>
        <div className="flex space-x-2">
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
            Broadcast Message
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
            Settings
          </button>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <div key={platform.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <Icon className={platform.color} size={24} />
                <span className="text-sm text-gray-400">Active</span>
              </div>
              <p className="text-lg font-semibold">{platform.name}</p>
              <p className="text-2xl font-bold">{platform.active.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
          >
            <option value="all">All Platforms</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
            <option value="sms">SMS</option>
            <option value="email">Email</option>
          </select>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2 transition-colors">
            <Filter size={16} />
            <span>Status</span>
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="bg-gray-800 rounded-lg">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Recent Conversations</h3>
        </div>
        <div className="divide-y divide-gray-700">
          {filteredConversations.map((conversation) => (
            <div key={conversation.id} className="p-4 hover:bg-gray-750 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{conversation.user}</h4>
                    <span className="text-sm text-gray-400">{conversation.platform}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(conversation.status)}`}>
                      {conversation.status}
                    </span>
                    <span className={`text-xs font-medium ${getPriorityColor(conversation.priority)}`}>
                      {conversation.priority} priority
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{conversation.lastMessage}</p>
                  <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                </div>
                <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold mb-4">Response Times</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Average</span>
              <span className="font-semibold">2.3 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">WhatsApp</span>
              <span className="font-semibold">1.8 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Email</span>
              <span className="font-semibold">4.2 min</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold mb-4">Resolution Rate</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Today</span>
              <span className="font-semibold text-green-400">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">This Week</span>
              <span className="font-semibold text-green-400">91.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">This Month</span>
              <span className="font-semibold text-green-400">89.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold mb-4">Active Agents</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Online</span>
              <span className="font-semibold text-green-400">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Busy</span>
              <span className="font-semibold text-yellow-400">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Away</span>
              <span className="font-semibold text-gray-400">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}