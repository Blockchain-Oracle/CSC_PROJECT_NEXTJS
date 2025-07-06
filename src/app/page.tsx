'use client';
import React, { useState } from 'react';

import { SendIcon, CheckCircleIcon, ShieldIcon, EyeOffIcon, FileTextIcon } from 'lucide-react';

const SubmitFeedback = () => {
  
  const [category, setCategory] = useState('');

  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const categories = ['Academics', 'Hostel', 'Administrative Issues', 'Facilities', 'Welfare', 'Others'];

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (category && message.trim()) {
      setSubmitted(true);

      // Reset submitted state after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }

  };

  return (
    <div>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Share Your Feedback Anonymously
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help improve your school by providing honest feedback without
            revealing your identity. Your input matters and can make a real
            difference.
          </p>
        </section>
        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <EyeOffIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% Anonymous</h3>
            <p className="text-gray-600">
              We don't collect any personal information. Your identity remains
              completely protected.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <ShieldIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p className="text-gray-600">
              Your feedback is securely handled and only accessible to
              authorized personnel.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4">
              <FileTextIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Actionable Insights</h3>
            <p className="text-gray-600">
              Your feedback helps identify issues and implement meaningful
              improvements.
            </p>
          </div>
        </section>
        {/* Form Section */}
        <section className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Submit Your Feedback
          </h2>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h3 className="font-medium text-green-800">
                  Feedback Submitted Successfully!
                </h3>
                <p className="text-green-700 mt-1">
                  Thank you for helping improve your school. Your feedback has
                  been received.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Your Feedback
                </label>
                <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Please describe your feedback, suggestion or concern in detail..." required></textarea>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md flex items-center transition-colors">
                  <SendIcon className="h-4 w-4 mr-2" />
                  Submit Feedback
                </button>
              </div>
            </form>
          )}
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Privacy Notice:</strong> This system is designed to be
              completely anonymous. We do not track IP addresses, require login
              credentials, or collect any personally identifiable information
              when you submit feedback.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SubmitFeedback;