import React, { useState } from 'react';
import { Save, Shield, Database, Bell, Users, Globe, Lock, Key } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'api', label: 'API Settings', icon: Key }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Platform Name</label>
              <input
                type="text"
                defaultValue="Netflix Admin Dashboard"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Default Language</label>
              <select className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time Zone</label>
              <select className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+1 (Central European Time)</option>
              </select>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Lock className="text-green-400" size={20} />
                <h3 className="font-semibold">Two-Factor Authentication</h3>
              </div>
              <p className="text-gray-400 text-sm mb-3">Add an extra layer of security to your account</p>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-colors">
                Enable 2FA
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                defaultValue="30"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password Policy</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Require uppercase letters</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Require numbers</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Require special characters</span>
                </label>
              </div>
            </div>
          </div>
        );
      case 'database':
        return (
          <div className="space-y-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Database Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Connection</span>
                  <span className="text-green-400">● Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Backup</span>
                  <span>2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Storage Used</span>
                  <span>2.4 TB / 5 TB</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Backup Frequency</label>
              <select className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600">
                <option>Every 6 hours</option>
                <option>Every 12 hours</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
              Create Manual Backup
            </button>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Email Notifications</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">New user registrations</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Payment failures</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Content uploads</span>
                </label>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Push Notifications</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">System alerts</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Security warnings</span>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Settings content for {activeTab}</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Save size={20} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="bg-gray-800 rounded-lg p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6 capitalize">{activeTab} Settings</h2>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}