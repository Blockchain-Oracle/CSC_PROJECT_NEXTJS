/**
 * Admin Dashboard Page
 * 
 * A comprehensive dashboard for managing feedback submissions.
 * Features filtering, searching, statistics, and detailed feedback management.
 */

'use client';

import React, { useMemo, useState } from 'react';
import { Search, Filter, BarChart3, CheckCircle, Clock, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/common/PageContainer';
import Section from '@/components/common/Section';
import StatusBadge from '@/components/common/StatusBadge';
import FeedbackModal from '@/components/FeedbackModal';
import { FeedbackItem } from '@/utils/feedback';
import { DummyFeedBackItems } from '@/dummyDatabase/feedback';
import { cn } from '@/lib/utils';

/**
 * Admin Dashboard component for managing feedback
 */
const AdminDashboard: React.FC = () => {
  // State management
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(DummyFeedBackItems);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

  /**
   * Get unique categories from feedback items
   */
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    feedbackList.forEach(item => uniqueCategories.add(item.category));
    return Array.from(uniqueCategories);
  }, [feedbackList]);

  /**
   * Filter feedback items based on current filters
   */
  const filteredItems = useMemo(() => {
    return feedbackList.filter(item => {
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
  }, [feedbackList, statusFilter, categoryFilter, searchQuery]);

  /**
   * Calculate statistics from feedback data
   */
  const stats = useMemo(() => {
    const total = feedbackList.length;
    const pending = feedbackList.filter(item => item.status === 'pending').length;
    const resolved = feedbackList.filter(item => item.status === 'resolved').length;
    
    const categoryCounts: Record<string, number> = {};
    feedbackList.forEach(item => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });
    
    return {
      total,
      pending,
      resolved,
      categoryCounts,
      resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0,
    };
  }, [feedbackList]);

  /**
   * Format date for display
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Handle status update for feedback item
   */
  const handleStatusUpdate = (id: string, status: 'pending' | 'resolved') => {
    setFeedbackList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setStatusFilter('all');
    setCategoryFilter('all');
    setSearchQuery('');
  };

  return (
    <PageContainer>
      <PageContainer.Header>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
            Feedback Dashboard
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Manage and respond to anonymous feedback from your school community. 
            Track issues, monitor trends, and ensure every voice is heard.
          </p>
        </div>
      </PageContainer.Header>

      <PageContainer.Content>
        {/* Statistics Section */}
        <Section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Total Feedback */}
            <Card className="hover:shadow-lg transition-shadow duration-normal">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-tertiary">
                      Total Feedback
                    </p>
                    <p className="text-3xl font-bold text-text-primary">
                      {stats.total}
                    </p>
                  </div>
                  <div className="bg-primary-100 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending */}
            <Card className="hover:shadow-lg transition-shadow duration-normal">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-tertiary">
                      Pending
                    </p>
                    <p className="text-3xl font-bold text-warning-600">
                      {stats.pending}
                    </p>
                  </div>
                  <div className="bg-warning-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-warning-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resolved */}
            <Card className="hover:shadow-lg transition-shadow duration-normal">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-tertiary">
                      Resolved
                    </p>
                    <p className="text-3xl font-bold text-success-600">
                      {stats.resolved}
                    </p>
                  </div>
                  <div className="bg-success-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-success-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resolution Rate */}
            <Card className="hover:shadow-lg transition-shadow duration-normal">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-tertiary">
                      Resolution Rate
                    </p>
                    <p className="text-3xl font-bold text-accent-600">
                      {stats.resolutionRate}%
                    </p>
                  </div>
                  <div className="bg-accent-100 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-accent-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Filters Section */}
        <Section variant="card" spacing="medium" className="mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-text-tertiary" />
              <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
              {(statusFilter !== 'all' || categoryFilter !== 'all' || searchQuery) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="ml-auto"
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Category
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category} ({stats.categoryCounts[category] || 0})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                  <Input
                    placeholder="Search feedback..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Feedback List */}
        <Section variant="card" spacing="none">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Feedback Items ({filteredItems.length})</span>
              {filteredItems.length > 0 && (
                <span className="text-sm font-normal text-text-secondary">
                  Showing {filteredItems.length} of {feedbackList.length} items
                </span>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-secondary-400" />
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  No feedback found
                </h3>
                <p className="text-text-secondary">
                  {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                    ? 'Try adjusting your filters to see more results.'
                    : 'No feedback submissions yet.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border-primary">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      'p-6 hover:bg-background-tertiary cursor-pointer',
                      'transition-colors duration-fast'
                    )}
                    onClick={() => setSelectedFeedback(item)}
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <StatusBadge status={item.status}>
                            {item.status === 'resolved' ? 'Resolved' : 'Pending'}
                          </StatusBadge>
                          
                          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                            {item.category}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-text-tertiary">
                            {formatDate(item.date)}
                          </span>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFeedback(item);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>

                      {/* Message Preview */}
                      <div>
                        <p className="text-text-primary line-clamp-2 leading-relaxed">
                          {item.message}
                        </p>
                        
                        {item.message.length > 150 && (
                          <button
                            className="text-primary-600 text-sm mt-2 hover:text-primary-700 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFeedback(item);
                            }}
                          >
                            Read more →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Section>
      </PageContainer.Content>

      {/* Feedback Modal */}
      {selectedFeedback && (
        <FeedbackModal
          feedback={selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
          onStatusChange={handleStatusUpdate}
        />
      )}
    </PageContainer>
  );
};

export default AdminDashboard;