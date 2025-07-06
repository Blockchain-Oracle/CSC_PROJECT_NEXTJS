/**
 * FeedbackModal Component
 * 
 * A modal component for displaying detailed feedback information
 * with status management capabilities. Built with Radix UI Dialog
 * for accessibility and proper focus management.
 * 
 * @example
 * <FeedbackModal 
 *   feedback={feedbackItem} 
 *   onClose={() => setOpen(false)}
 *   onStatusChange={handleStatusChange}
 * />
 */

'use client';

import React from 'react';
import { Calendar, Tag, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StatusBadge from '@/components/common/StatusBadge';
import Section from '@/components/common/Section';
import { FeedbackItem } from '@/utils/feedback';
import { cn } from '@/lib/utils';

interface FeedbackModalProps {
  /** The feedback item to display */
  feedback: FeedbackItem;
  /** Whether the modal is open */
  open?: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when status should change */
  onStatusChange: (id: string, status: 'pending' | 'resolved') => void;
}

/**
 * Feedback detail modal component
 */
const FeedbackModal: React.FC<FeedbackModalProps> = ({
  feedback,
  open = true,
  onClose,
  onStatusChange,
}) => {
  /**
   * Formats a date string for display
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Handles status change and closes modal
   */
  const handleStatusChange = (newStatus: 'pending' | 'resolved') => {
    onStatusChange(feedback.id, newStatus);
    onClose();
  };

  /**
   * Gets the opposite status for toggle button
   */
  const getToggleStatus = (): 'pending' | 'resolved' => {
    return feedback.status === 'pending' ? 'resolved' : 'pending';
  };

  /**
   * Gets the action button text and icon
   */
  const getActionButton = () => {
    const toggleStatus = getToggleStatus();
    
    if (toggleStatus === 'resolved') {
      return {
        text: 'Mark as Resolved',
        icon: CheckCircle,
        variant: 'default' as const,
      };
    } else {
      return {
        text: 'Mark as Pending',
        icon: Clock,
        variant: 'secondary' as const,
      };
    }
  };

  const actionButton = getActionButton();
  const ActionIcon = actionButton.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-text-primary">
                Feedback Details
              </DialogTitle>
              <DialogDescription className="text-text-secondary">
                Review and manage this feedback submission
              </DialogDescription>
            </div>
            
            <StatusBadge 
              status={feedback.status} 
              size="lg"
              className="flex-shrink-0"
            >
              {feedback.status === 'resolved' ? 'Resolved' : 'Pending Review'}
            </StatusBadge>
          </div>

          {/* Status Banner */}
          <Card 
            className={cn(
              'border-l-4',
              feedback.status === 'resolved' 
                ? 'border-l-success-500 bg-success-50' 
                : 'border-l-warning-500 bg-warning-50'
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {feedback.status === 'resolved' ? (
                  <CheckCircle className="h-6 w-6 text-success-600" />
                ) : (
                  <Clock className="h-6 w-6 text-warning-600" />
                )}
                
                <div>
                  <h3 className={cn(
                    'font-semibold',
                    feedback.status === 'resolved' 
                      ? 'text-success-800' 
                      : 'text-warning-800'
                  )}>
                    {feedback.status === 'resolved' 
                      ? 'This feedback has been resolved' 
                      : 'This feedback is awaiting review'
                    }
                  </h3>
                  <p className={cn(
                    'text-sm',
                    feedback.status === 'resolved' 
                      ? 'text-success-600' 
                      : 'text-warning-600'
                  )}>
                    {feedback.status === 'resolved' 
                      ? 'The issue has been addressed by the relevant team' 
                      : 'The feedback will be reviewed and addressed soon'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogHeader>

        {/* Metadata Section */}
        <Section spacing="none" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Submission Date */}
            <Card className="bg-background-tertiary">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-text-tertiary">Submitted on</p>
                    <p className="font-medium text-text-primary">
                      {formatDate(feedback.date)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card className="bg-background-tertiary">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-accent-100 p-2 rounded-lg">
                    <Tag className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm text-text-tertiary">Category</p>
                    <p className="font-medium text-text-primary">
                      {feedback.category}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Message Content */}
        <Section spacing="none">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-text-tertiary" />
              <h3 className="text-lg font-semibold text-text-primary">
                Feedback Message
              </h3>
            </div>
            
            <Card className="bg-background-tertiary">
              <CardContent className="p-6">
                <p className="text-text-primary whitespace-pre-wrap leading-relaxed">
                  {feedback.message}
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Actions Footer */}
        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="order-2 sm:order-1"
          >
            Close
          </Button>
          
          <Button
            variant={actionButton.variant}
            onClick={() => handleStatusChange(getToggleStatus())}
            className="order-1 sm:order-2"
          >
            <ActionIcon className="h-4 w-4 mr-2" />
            {actionButton.text}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;