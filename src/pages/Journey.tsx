import React, { useState } from 'react';
import { useStore } from '../store';
import {
  BookOpen,
  Clock,
  Award,
  Lock,
  Calendar,
  Star,
  MessageSquare,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';

export function Journey() {
  const { user, growthCycles } = useStore();
  const [selectedCycle, setSelectedCycle] = useState<number | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);

  // Calculate overall progress
  const overallProgress =
    growthCycles.reduce((acc, cycle) => acc + cycle.progress, 0) /
    growthCycles.length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Learning Journey</h1>
          <p className="text-gray-500">Track your progress and unlock achievements</p>
        </div>
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Ask Assistant
        </button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center mb-2">
            <Star className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Overall Progress</h3>
          </div>
          <p className="text-2xl font-bold">{Math.round(overallProgress)}%</p>
          <div className="w-full bg-white/30 rounded-full h-2 mt-2">
            <div
              className="bg-white h-2 rounded-full"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-6 text-white">
          <div className="flex items-center mb-2">
            <Award className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">XP Earned</h3>
          </div>
          <p className="text-2xl font-bold">{user?.xp || 0} XP</p>
          <p className="text-sm text-green-100">Level {user?.level || 1}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-6 text-white">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Attendance</h3>
          </div>
          <p className="text-2xl font-bold">
            {user?.attendance?.filter((a) => a.status === 'present').length || 0} Days
          </p>
          <p className="text-sm text-orange-100">Current Streak: {user?.streak || 0}</p>
        </div>
      </div>

      {/* Growth Cycles */}
      <div className="space-y-6">
        {growthCycles.map((cycle) => (
          <div
            key={cycle.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() =>
                setSelectedCycle(selectedCycle === cycle.id ? null : cycle.id)
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {cycle.title}
                  </h2>
                  <p className="text-gray-500">{cycle.description}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {cycle.duration}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {cycle.topics.length} Topics
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-sm font-medium text-indigo-600">
                      {cycle.progress}% Complete
                    </span>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${cycle.progress}%` }}
                      />
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transform transition-transform ${
                      selectedCycle === cycle.id ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </div>
            </div>

            {selectedCycle === cycle.id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {cycle.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className={`bg-white rounded-lg border ${
                        topic.status === 'locked'
                          ? 'border-gray-200'
                          : topic.status === 'completed'
                          ? 'border-green-200'
                          : 'border-indigo-200'
                      } p-6 relative`}
                    >
                      {topic.status === 'locked' ? (
                        <div className="absolute top-4 right-4">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                      ) : topic.status === 'completed' ? (
                        <div className="absolute top-4 right-4">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                      ) : null}
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {topic.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {topic.duration}
                        </span>
                        <span className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          {topic.xpReward} XP
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {topic.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chatbot */}
      {showChatbot && (
        <div className="fixed bottom-8 right-8 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Learning Assistant</h3>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                &times;
              </button>
            </div>
          </div>
          <div className="p-4 h-96 overflow-y-auto">
            {/* Chat messages would go here */}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask a question..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}