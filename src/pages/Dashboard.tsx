import React from 'react';
import { useStore } from '../store';
import { Trophy, Target, Clock, Zap, TrendingUp, Calendar, CheckCircle2, Award } from 'lucide-react';

export function Dashboard() {
  const { user, tasks, feedbackScores } = useStore();

  const stats = [
    {
      name: 'Current Streak',
      value: '7 Days',
      icon: Zap,
      color: 'text-yellow-500',
      bg: 'bg-yellow-100'
    },
    {
      name: 'Tasks Completed',
      value: '12/15',
      icon: Target,
      color: 'text-green-500',
      bg: 'bg-green-100'
    },
    {
      name: 'Practice Hours',
      value: '12.5',
      icon: Clock,
      color: 'text-blue-500',
      bg: 'bg-blue-100'
    },
    {
      name: 'Total XP',
      value: '450',
      icon: Award,
      color: 'text-purple-500',
      bg: 'bg-purple-100'
    },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'task',
      title: 'Completed Active Listening Exercise',
      time: '2 hours ago',
      xp: 10,
    },
    {
      id: '2',
      type: 'interview',
      title: 'Mock Interview - HR Round',
      time: '4 hours ago',
      xp: 25,
    },
    {
      id: '3',
      type: 'feedback',
      title: 'Received Feedback on Communication',
      time: 'Yesterday',
      score: 8.5,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back, {user?.name || 'Learner'}!</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-indigo-500" />
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={'flex-shrink-0 rounded-full p-3 ' + stat.bg}>
                    <Icon className={'h-6 w-6 ' + stat.color} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className={
                    activity.type === 'task'
                      ? 'rounded-full p-2 bg-green-100'
                      : activity.type === 'interview'
                      ? 'rounded-full p-2 bg-blue-100'
                      : 'rounded-full p-2 bg-purple-100'
                  }>
                    {activity.type === 'task' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : activity.type === 'interview' ? (
                      <Trophy className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Target className="h-5 w-5 text-purple-500" />
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                {'xp' in activity ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +{activity.xp} XP
                  </span>
                ) : 'score' in activity ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Score: {activity.score}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Today's Goals</h2>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
              <h3 className="font-semibold mb-2">Complete Your Daily Tasks</h3>
              <div className="flex items-center justify-between">
                <p className="text-indigo-100">Progress: 4/5 tasks</p>
                <div className="w-32 bg-white/30 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
              <h3 className="font-semibold mb-2">Practice Mock Interviews</h3>
              <div className="flex items-center justify-between">
                <p className="text-green-100">Progress: 2/3 sessions</p>
                <div className="w-32 bg-white/30 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '66%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}