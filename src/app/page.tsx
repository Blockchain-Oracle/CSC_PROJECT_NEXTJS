/**
 * Home Page - Anonymous Feedback Submission
 * 
 * The main page where users can submit anonymous feedback.
 * Features a hero section, benefits overview, and the feedback form.
 */

'use client';

import React from 'react';
import { Shield, Eye, FileText, Users, MessageSquare, Lock } from 'lucide-react';
import PageContainer from '@/components/common/PageContainer';
import Section from '@/components/common/Section';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Feature card data for the benefits section
 */
const FEATURES = [
  {
    icon: Eye,
    title: '100% Anonymous',
    description: 'We don\'t collect any personal information. Your identity remains completely protected.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your feedback is securely handled and only accessible to authorized personnel.',
    color: 'text-accent-600',
    bgColor: 'bg-accent-100',
  },
  {
    icon: FileText,
    title: 'Actionable Insights',
    description: 'Your feedback helps identify issues and implement meaningful improvements.',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-100',
  },
] as const;

/**
 * Statistics to build trust and credibility
 */
const STATS = [
  { number: '500+', label: 'Feedback Submissions' },
  { number: '95%', label: 'Issues Resolved' },
  { number: '24h', label: 'Average Response Time' },
] as const;

/**
 * Home page component
 */
const HomePage: React.FC = () => {
  /**
   * Handles feedback form submission
   */
  const handleFeedbackSubmit = async (data: { category: string; message: string }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Feedback submitted:', data);
    
    // Here you would typically send the data to your backend
    // Example: await submitFeedback(data);
  };

  return (
    <PageContainer variant="gradient">
      {/* Hero Section */}
      <PageContainer.Header>
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient leading-tight">
            Share Your Feedback
            <br />
            <span className="text-text-primary">Anonymously</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Help improve your school by providing honest feedback without revealing your identity. 
            Your input matters and can make a real difference in our community.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 text-sm text-text-tertiary">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Fully Anonymous</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Direct Impact</span>
            </div>
          </div>
        </div>
      </PageContainer.Header>

      <PageContainer.Content>
        {/* Statistics Section */}
        <Section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-normal">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-text-secondary font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Features Section */}
        <Section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Why Choose Anonymous Feedback?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Our system is designed with your privacy and safety in mind, 
              ensuring you can share honest feedback without any concerns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-normal hover:-translate-y-1"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.bgColor} group-hover:scale-110 transition-transform duration-normal`}>
                      <IconComponent className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary">
                      {feature.title}
                    </h3>
                    
                    <p className="text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* Feedback Form Section */}
        <Section>
          <FeedbackForm onSubmit={handleFeedbackSubmit} />
        </Section>

        {/* Additional Information */}
        <Section className="mt-12">
          <Card className="bg-gradient-card border-primary-200">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-text-primary">
                  Your Voice Matters
                </h3>
                
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Every piece of feedback is carefully reviewed by our administration team. 
                  Your suggestions have led to real improvements in facilities, policies, 
                  and student services. Together, we're building a better school environment.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm">
                  <div className="bg-background-secondary rounded-lg p-4 border border-primary-100">
                    <h4 className="font-medium text-text-primary mb-2">Recent Improvements</h4>
                    <ul className="text-text-secondary space-y-1 text-left">
                      <li>• Extended library hours</li>
                      <li>• Improved hostel facilities</li>
                      <li>• New study spaces</li>
                    </ul>
                  </div>
                  
                  <div className="bg-background-secondary rounded-lg p-4 border border-primary-100">
                    <h4 className="font-medium text-text-primary mb-2">How We Respond</h4>
                    <ul className="text-text-secondary space-y-1 text-left">
                      <li>• Review within 24 hours</li>
                      <li>• Forward to relevant departments</li>
                      <li>• Track resolution progress</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
      </PageContainer.Content>
    </PageContainer>
  );
};

export default HomePage;