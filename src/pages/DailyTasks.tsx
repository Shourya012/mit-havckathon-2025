import React from 'react';
import { useStore } from '../store';
import { Calendar, CheckCircle2, Star, Clock, Target, Award } from 'lucide-react';

export function DailyTasks() {
  const { tasks } = useStore();

  const sampleTasks = [
    {
      id: '1',
      title: 'Practice Active Listening',
      description: 'Complete a 10-minute active listening exercise with a peer or family member.',
      category: 'Communication',
      completed: true,
      date: new Date().toISOString(),
      xp: 10
    },
    {
      id: '2',
      title: 'Body Language Analysis',
      description: 'Record a 2-minute self-introduction video and analyze your body language.',
      category: 'Non-verbal Communication',
      completed: false,
      date: new Date().toISOString(),
      xp: 15
    },
    {
      id: '3',
      title: 'Conflict Resolution Scenario',
      description: 'Write a response to a given workplace conflict scenario using the GROW model.',
      category: 'Problem Solving',
      completed: false,
      date: new Date().toISOString(),
      xp: 20
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Daily Skills Practice</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-indigo-500" />
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center mb-2">
            <Star className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Daily Streak</h3>
          </div>
          <p className="text-2xl font-bold">7 Days</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-4 text-white">
          <div className="flex items-center mb-2">
            <Target className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Tasks Completed</h3>
          </div>
          <p className="text-2xl font-bold">12/15</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-4 text-white">
          <div className="flex items-center mb-2">
            <Award className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">XP Earned</h3>
          </div>
          <p className="text-2xl font-bold">450 XP</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg divide-y">
        {sampleTasks.map((task) => (
          <div key={task.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {task.title}
                  </h3>
                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {task.xp} XP
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {task.description}
                </p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {task.category}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Due Today
                  </span>
                </div>
              </div>
              {task.completed ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                  Start Task
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}