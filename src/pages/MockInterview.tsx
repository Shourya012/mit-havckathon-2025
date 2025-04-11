import React, { useState } from 'react';
import { Play, Mic, Camera, MessageSquare, RefreshCw, CheckCircle } from 'lucide-react';
import { useStore } from '../store';

export function MockInterview() {
  const [selectedCategory, setSelectedCategory] = useState<'hr' | 'technical'>('hr');
  const { questions } = useStore();

  const sampleQuestions = [
    {
      id: '1',
      category: 'hr',
      question: 'Tell me about a time you handled a challenging situation at work.',
      suggestedAnswer: 'Use the STAR method to structure your response...'
    },
    {
      id: '2',
      category: 'hr',
      question: 'Where do you see yourself in 5 years?',
      suggestedAnswer: 'Focus on your career growth and aspirations...'
    },
    {
      id: '3',
      category: 'technical',
      question: 'Explain the concept of state management in React.',
      suggestedAnswer: 'Discuss different state management solutions...'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mock Interview Practice</h1>
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 text-indigo-500" />
          <span className="text-sm text-gray-500">New questions daily</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Ready to Practice?</h2>
        <p className="text-indigo-100 mb-4">Practice makes perfect! Record your responses and get feedback.</p>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
            <Camera className="h-5 w-5 mr-2" />
            Video Response
          </button>
          <button className="flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
            <Mic className="h-5 w-5 mr-2" />
            Audio Response
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSelectedCategory('hr')}
          className={
            selectedCategory === 'hr'
              ? 'px-4 py-2 rounded-lg font-medium bg-indigo-100 text-indigo-700'
              : 'px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100'
          }
        >
          HR Questions
        </button>
        <button
          onClick={() => setSelectedCategory('technical')}
          className={
            selectedCategory === 'technical'
              ? 'px-4 py-2 rounded-lg font-medium bg-indigo-100 text-indigo-700'
              : 'px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100'
          }
        >
          Technical Questions
        </button>
      </div>

      <div className="grid gap-6">
        {sampleQuestions
          .filter((q) => q.category === selectedCategory)
          .map((question) => (
            <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {question.question}
                  </h3>
                  <p className="text-sm text-gray-500">{question.suggestedAnswer}</p>
                </div>
                <button className="flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors">
                  <Play className="h-4 w-4 mr-1" />
                  Practice
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}