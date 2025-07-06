'use client';
import { useMemo, useState } from 'react';
import { CheckCircleIcon, ClockIcon, FilterIcon, SearchIcon, BarChart3Icon, CheckIcon, XIcon } from 'lucide-react';
import { FeedbackItem } from '@/utils/feedback';
import FeedbackModal from '@/components/FeedbackModal';
import { DummyFeedBackItems } from '@/dummyDatabase/feedback';

// interface AdminDashboardProps {
//   feedbackItems: FeedbackItem[];
//   updateStatus: (id: string, status: 'pending' | 'resolved') => void;
// }

const AdminDashboard = () => {

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

  const [feedBackList, setFeedBackList] = useState<FeedbackItem[]>(DummyFeedBackItems)
  
  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    feedBackList.forEach(item => uniqueCategories.add(item.category));
    return Array.from(uniqueCategories);
  }, [feedBackList]);
  
  // Filter feedback items
  const filteredItems = useMemo(() => {
    return feedBackList.filter(item => {
      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }
      // Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false;
      }
      // Search query
      if (searchQuery && !item.message.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [feedBackList, statusFilter, categoryFilter, searchQuery]);
  
  // Stats
  const stats = useMemo(() => {
    const total = feedBackList.length;
    const pending = feedBackList.filter(item => item.status === 'pending').length;
    const resolved = feedBackList.filter(item => item.status === 'resolved').length;
    const categoryCounts: Record<string, number> = {};
    feedBackList.forEach(item => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });
    return {
      total,
      pending,
      resolved,
      categoryCounts
    };
  }, [feedBackList]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };


  // Handle status update and close modal
  const handleStatusUpdate = (id: string, status: 'pending' | 'resolved') => {
    alert("update status")
  };
  return <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Feedback Dashboard
        </h1>
        <p className="text-gray-600">
          Manage and respond to anonymous feedback from your school community
        </p>
      </div>
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <BarChart3Icon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Feedback
              </p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.pending}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <CheckCircleIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.resolved}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="flex items-center mb-4 md:mb-0">
            <FilterIcon className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-gray-700 font-medium">Filters:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* Status Filter */}
            <div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            {/* Category Filter */}
            <div>
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category} ({stats.categoryCounts[category] || 0})
                  </option>
                ))}
              </select>
            </div>
            {/* Search */}
            <div className="relative">
              <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input type="text" placeholder="Search feedback..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </div>
      </div>
      {/* Feedback List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Feedback Items ({filteredItems.length})
          </h2>
        </div>
        {filteredItems.length === 0 ? 
        ( 
        <div className="p-8 text-center text-gray-500">
          No feedback items match your filters
        </div>
        ) :
        (
          <div className="divide-y divide-gray-200">
            {filteredItems.map(item => <div key={item.id} className="p-6 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedFeedback(item)}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center mb-2 md:mb-0">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${item.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {item.status === 'resolved' ? <CheckCircleIcon className="h-3 w-3 mr-1" /> : <ClockIcon className="h-3 w-3 mr-1" />}
                      {item.status === 'resolved' ? 'Resolved' : 'Pending'}
                    </span>
                    <div className="ml-4" onClick={e => e.stopPropagation()} // Prevent modal from opening when clicking status button
              >
                      {item.status === 'pending' ? <button onClick={() => handleStatusUpdate(item.id, 'resolved')} className="flex items-center text-sm text-green-600 hover:text-green-800">
                          <CheckIcon className="h-4 w-4 mr-1" />
                          Mark Resolved
                        </button> : <button onClick={() => handleStatusUpdate(item.id, 'pending')} className="flex items-center text-sm text-amber-600 hover:text-amber-800">
                          <XIcon className="h-4 w-4 mr-1" />
                          Mark Pending
                        </button>}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 line-clamp-2">{item.message}</p>
                <button className="text-purple-600 text-sm mt-2 hover:text-purple-800" onClick={e => {
            e.stopPropagation();
            setSelectedFeedback(item);
          }}>
                  Read more
                </button>
              </div>)}
          </div>
        )}
      </div>
      
    {/* Feedback Modal */}
    
    {selectedFeedback && (
      <FeedbackModal feedback={selectedFeedback} onClose={() => setSelectedFeedback(null)} onStatusChange={handleStatusUpdate} />
    )}
    </div>;
};
export default AdminDashboard;