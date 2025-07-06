'use client';
import React from 'react';
import { XIcon, CheckCircleIcon, ClockIcon, CalendarIcon, TagIcon, MessageSquareIcon } from 'lucide-react';
import { FeedbackItem } from '@/utils/feedback';

interface FeedbackModalProps {
  feedback: FeedbackItem;
  onClose: () => void;
  onStatusChange: (id: string, status: 'pending' | 'resolved') => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  feedback,
  onClose,
  onStatusChange
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={handleBackdropClick}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header Section */}
        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Feedback Details
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            {/* Status Banner */}
            <div className={`w-full rounded-lg p-4 mb-4 ${feedback.status === 'resolved' ? 'bg-green-50 border border-green-100' : 'bg-amber-50 border border-amber-100'}`}>
              <div className="flex items-center">
                {feedback.status === 'resolved' ? <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" /> : <ClockIcon className="h-6 w-6 text-amber-600 mr-3" />}
                <div>
                  <h3 className={`font-semibold ${feedback.status === 'resolved' ? 'text-green-800' : 'text-amber-800'}`}>
                    {feedback.status === 'resolved' ? 'Resolved Feedback' : 'Pending Review'}
                  </h3>
                  <p className={`text-sm ${feedback.status === 'resolved' ? 'text-green-600' : 'text-amber-600'}`}>
                    {feedback.status === 'resolved' ? 'This feedback has been addressed' : 'This feedback is awaiting review'}
                  </p>
                </div>
              </div>
            </div>
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted on</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(feedback.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <TagIcon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">
                    {feedback.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Message Content */}
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquareIcon className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-800">
              Feedback Message
            </h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
            <p className="text-gray-800 whitespace-pre-wrap text-lg leading-relaxed">
              {feedback.message}
            </p>
          </div>
        </div>
        {/* Actions Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              Close
            </button>
            {feedback.status === 'pending' ? <button onClick={() => onStatusChange(feedback.id, 'resolved')} className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors shadow-sm">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Mark as Resolved
              </button> : <button onClick={() => onStatusChange(feedback.id, 'pending')} className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors shadow-sm">
                <ClockIcon className="h-5 w-5 mr-2" />
                Mark as Pending
              </button>}
          </div>
        </div>
      </div>
    </div>;
};
export default FeedbackModal;