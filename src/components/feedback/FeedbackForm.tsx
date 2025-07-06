/**
 * FeedbackForm Component
 * 
 * A comprehensive form component for submitting anonymous feedback.
 * Includes validation, accessibility features, and success states.
 * 
 * @example
 * <FeedbackForm onSubmit={handleSubmit} />
 */

'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Section from '@/components/common/Section';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { cn } from '@/lib/utils';

interface FeedbackFormData {
  category: string;
  message: string;
}

interface FeedbackFormProps {
  /** Callback function when form is submitted */
  onSubmit?: (data: FeedbackFormData) => Promise<void> | void;
  /** Whether the form is in a loading state */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// Available feedback categories
const FEEDBACK_CATEGORIES = [
  'Academics',
  'Hostel',
  'Administrative Issues',
  'Facilities',
  'Welfare',
  'Others'
] as const;

/**
 * Feedback submission form component
 */
const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onSubmit,
  loading = false,
  className,
}) => {
  // Form state
  const [formData, setFormData] = useState<FeedbackFormData>({
    category: '',
    message: '',
  });
  
  // UI state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FeedbackFormData>>({});

  /**
   * Validates form data
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<FeedbackFormData> = {};

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your feedback';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Feedback must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit?.(formData);
      
      // Show success state
      setIsSubmitted(true);
      
      // Reset form after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ category: '', message: '' });
        setErrors({});
      }, 5000);
      
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // Handle error state here if needed
    }
  };

  /**
   * Handles input changes
   */
  const handleInputChange = (field: keyof FeedbackFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Show success state
  if (isSubmitted) {
    return (
      <Card className={cn('max-w-2xl mx-auto', className)}>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-success-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success-600" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-text-primary">
                Feedback Submitted Successfully!
              </h3>
              <p className="text-text-secondary">
                Thank you for helping improve your school. Your feedback has been received 
                and will be reviewed by the appropriate team.
              </p>
            </div>
            
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <p className="text-sm text-success-700">
                <strong>What happens next?</strong> Your anonymous feedback will be 
                reviewed and addressed by the relevant department. You can submit 
                additional feedback anytime.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('max-w-2xl mx-auto', className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-text-primary">
          Submit Your Feedback
        </CardTitle>
        <p className="text-text-secondary">
          Share your thoughts, suggestions, or concerns anonymously. 
          Your input helps make our school better for everyone.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <label 
              htmlFor="category" 
              className="text-sm font-medium text-text-primary"
            >
              Category <span className="text-error-500">*</span>
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange('category', value)}
            >
              <SelectTrigger 
                className={cn(
                  errors.category && 'border-error-500 focus:border-error-500'
                )}
                aria-describedby={errors.category ? 'category-error' : undefined}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {FEEDBACK_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p id="category-error" className="text-sm text-error-600">
                {errors.category}
              </p>
            )}
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label 
              htmlFor="message" 
              className="text-sm font-medium text-text-primary"
            >
              Your Feedback <span className="text-error-500">*</span>
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Please describe your feedback, suggestion, or concern in detail..."
              className={cn(
                'min-h-[120px] resize-none',
                errors.message && 'border-error-500 focus:border-error-500'
              )}
              aria-describedby={errors.message ? 'message-error' : 'message-help'}
            />
            {errors.message ? (
              <p id="message-error" className="text-sm text-error-600">
                {errors.message}
              </p>
            ) : (
              <p id="message-help" className="text-sm text-text-tertiary">
                Minimum 10 characters. Be specific to help us understand and address your feedback.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="min-w-[140px]"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Privacy Notice */}
        <Section 
          variant="bordered" 
          spacing="small" 
          className="mt-6 bg-background-tertiary"
        >
          <div className="text-sm text-text-secondary space-y-2">
            <p className="font-medium text-text-primary">
              🔒 Privacy Notice
            </p>
            <p>
              This system is designed to be completely anonymous. We do not track 
              IP addresses, require login credentials, or collect any personally 
              identifiable information when you submit feedback.
            </p>
            <p>
              Your feedback is securely stored and only accessible to authorized 
              school personnel who can take action on your concerns.
            </p>
          </div>
        </Section>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;