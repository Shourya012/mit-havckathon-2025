import React from 'react';
import { useStore } from '../store';
import { BarChart2, TrendingUp, MessageSquare } from 'lucide-react';

export function Feedback() {
  const { feedbackScores } = useStore();

  const categories = feedbackScores.reduce((acc, score) => {
    if (!acc[score.category]) {
      acc[score.category] = {
        scores: [],
        average: 0,
      };
    }
    acc[score.category].scores.push(score.score);
    acc[score.category].average =
      acc[score.category].scores.reduce((sum, s) => sum + s, 0) /
      acc[score.category].scores.length;
    return acc;
  }, {} as Record<string, { scores: number[]; average: number }>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Feedback & Progress</h1>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-indigo-500" />
          <span className="text-sm text-gray-500">Performance Overview</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Category Performance
            </h2>
            <BarChart2 className="h-5 w-5 text-gray-400" />
          </div>
          
          {Object.entries(categories).length === 0 ? (
            <p className="text-gray-500">No feedback data available yet</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(categories).map(([category, data]) => (
                <div key={category}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {category}
                    </span>
                    <span className="text-sm text-gray-600">
                      {data.average.toFixed(1)}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{
                        width: `${(data.average / 10) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Feedback</h2>
            <MessageSquare className="h-5 w-5 text-gray-400" />
          </div>
          
          {feedbackScores.length === 0 ? (
            <p className="text-gray-500">No recent feedback available</p>
          ) : (
            <div className="space-y-4">
              {feedbackScores.slice(-5).map((score) => (
                <div
                  key={score.id}
                  className="border-l-4 border-indigo-500 pl-4 py-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {score.category}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {score.feedback}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {score.score}/10
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(score.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}