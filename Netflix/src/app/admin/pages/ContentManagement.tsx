import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Star } from 'lucide-react';
import type { Content } from '../types';

export function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const mockContent: Content[] = [
    {
      id: 1,
      title: 'Stranger Things 4',
      type: 'Series',
      genre: 'Sci-Fi',
      rating: 9.1,
      views: '1.2B',
      status: 'Published',
      releaseDate: '2022-05-27',
      seasons: 4,
    },
    {
      id: 2,
      title: 'The Gray Man',
      type: 'Movie',
      genre: 'Action',
      rating: 7.8,
      views: '856M',
      status: 'Published',
      releaseDate: '2022-07-22',
      duration: '2h 9m',
    },
    {
      id: 3,
      title: 'Wednesday',
      type: 'Series',
      genre: 'Comedy',
      rating: 8.9,
      views: '987M',
      status: 'Published',
      releaseDate: '2022-11-23',
      seasons: 1,
    },
    {
      id: 4,
      title: 'Glass Onion',
      type: 'Movie',
      genre: 'Mystery',
      rating: 8.2,
      views: '734M',
      status: 'Published',
      releaseDate: '2022-12-23',
      duration: '2h 19m',
    },
  ];

  const filteredContent = mockContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || content.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Content</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div className="flex space-x-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
          >
            <option value="all">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
          </select>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-700 flex items-center space-x-2 transition-colors">
            <Filter size={16} />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Content</p>
          <p className="text-2xl font-bold">{mockContent.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Movies</p>
          <p className="text-2xl font-bold">{mockContent.filter(c => c.type === 'Movie').length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Series</p>
          <p className="text-2xl font-bold">{mockContent.filter(c => c.type === 'Series').length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Avg Rating</p>
          <p className="text-2xl font-bold">8.5</p>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Genre</th>
                <th className="text-left p-4">Rating</th>
                <th className="text-left p-4">Views</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.map((content) => (
                <tr key={content.id} className="border-t border-gray-700 hover:bg-gray-750">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{content.title}</p>
                      <p className="text-sm text-gray-400">
                        {content.type === 'Series' ? `${content.seasons} seasons` : content.duration}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      content.type === 'Movie' ? 'bg-blue-600' : 'bg-purple-600'
                    }`}>
                      {content.type}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{content.genre}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400" size={16} />
                      <span>{content.rating}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{content.views}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-600">
                      {content.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Content Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Content</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <select className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600">
                <option>Select Type</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
              </select>
              <input
                type="text"
                placeholder="Genre"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Add Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}