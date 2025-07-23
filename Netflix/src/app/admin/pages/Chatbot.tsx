import React, { useState } from 'react';
import { Send, Bot, User, Database, MessageSquare, Settings, Zap } from 'lucide-react';
import type { ChatMessage } from '../types';

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m the Netflix AI assistant. I can help you with movie information, user queries, and platform management. How can I assist you today?',
      timestamp: '10:30 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('movie') || lowerInput.includes('film')) {
      return 'I found several movies in our database. Our top-rated movies include "The Gray Man" (7.8/10), "Glass Onion" (8.2/10), and "Red Notice" (6.9/10). Would you like more details about any specific movie?';
    }
    
    if (lowerInput.includes('user') || lowerInput.includes('subscriber')) {
      return 'We currently have 247.15M active subscribers across all regions. 68% are on Premium plans, 24% on Standard, and 8% on Basic. Is there a specific user metric you\'d like to know about?';
    }
    
    if (lowerInput.includes('revenue') || lowerInput.includes('money')) {
      return 'Our monthly revenue is $8.2B with a 15.2% growth rate. Premium subscriptions contribute 78% of total revenue. Would you like a breakdown by region or subscription type?';
    }
    
    if (lowerInput.includes('content') || lowerInput.includes('show')) {
      return 'Our content library contains 15,273 titles including movies, series, and documentaries. Top performers this month are "Stranger Things 4", "Wednesday", and "The Crown". Need specific content analytics?';
    }
    
    return 'I can help you with movie information, user analytics, revenue data, and content management. Try asking about specific movies, user statistics, or platform metrics!';
  };

  const quickActions = [
    { label: 'Movie Database', icon: Database, action: () => setInputMessage('Show me movie statistics') },
    { label: 'User Analytics', icon: User, action: () => setInputMessage('Tell me about user metrics') },
    { label: 'Revenue Report', icon: Zap, action: () => setInputMessage('Show revenue breakdown') },
    { label: 'Content Stats', icon: MessageSquare, action: () => setInputMessage('Content library overview') }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Chatbot Assistant</h1>
        <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Settings size={20} />
          <span>Bot Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg flex flex-col h-96">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Netflix AI Assistant</h3>
              <p className="text-sm text-gray-400">Connected to database • Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about movies, users, analytics..."
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                onClick={handleSendMessage}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Icon size={16} className="text-red-400" />
                    <span className="text-sm">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bot Statistics */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Bot Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Queries Today</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Accuracy Rate</span>
                <span className="font-semibold text-green-400">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Response Time</span>
                <span className="font-semibold">0.8s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Database Queries</span>
                <span className="font-semibold">3,891</span>
              </div>
            </div>
          </div>

          {/* Database Status */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Database Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Connection</span>
                <span className="text-green-400 text-sm">●  Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Movies</span>
                <span className="font-semibold">8,947</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Series</span>
                <span className="font-semibold">6,326</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Updated</span>
                <span className="font-semibold">2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}