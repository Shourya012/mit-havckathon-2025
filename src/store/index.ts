import { create } from 'zustand';
import { User, InterviewQuestion, PracticeTask, FeedbackScore, GrowthCycle, AttendanceRecord, Reward } from '../types';

interface AppState {
  user: User | null;
  questions: InterviewQuestion[];
  tasks: PracticeTask[];
  feedbackScores: FeedbackScore[];
  growthCycles: GrowthCycle[];
  chatbotMessages: { role: 'user' | 'assistant'; content: string }[];
  setUser: (user: User | null) => void;
  addTask: (task: PracticeTask) => void;
  completeTask: (taskId: string) => void;
  addFeedbackScore: (score: FeedbackScore) => void;
  markAttendance: (record: AttendanceRecord) => void;
  addReward: (reward: Reward) => void;
  updateProgress: (cycleId: number, topicId: string) => void;
  addChatMessage: (message: { role: 'user' | 'assistant'; content: string }) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  questions: [],
  tasks: [],
  feedbackScores: [],
  growthCycles: [
    {
      id: 1,
      title: 'Communication Skills',
      description: 'Master essential communication skills for professional success',
      duration: '4 weeks',
      progress: 0,
      unlockDate: new Date().toISOString(),
      rewards: [],
      topics: [
        {
          id: '1.1',
          title: 'Active Listening',
          description: 'Learn the art of effective listening and comprehension',
          duration: '2 hours',
          type: 'video',
          status: 'available',
          xpReward: 50,
          skills: ['Listening', 'Comprehension', 'Feedback']
        },
        {
          id: '1.2',
          title: 'Public Speaking',
          description: 'Develop confidence in public speaking',
          duration: '3 hours',
          type: 'practice',
          status: 'locked',
          xpReward: 100,
          skills: ['Presentation', 'Confidence', 'Body Language']
        },
        {
          id: '1.3',
          title: 'Business Writing',
          description: 'Master professional email and document writing',
          duration: '4 hours',
          type: 'assignment',
          status: 'locked',
          xpReward: 150,
          skills: ['Writing', 'Communication', 'Documentation']
        }
      ]
    },
    {
      id: 2,
      title: 'Leadership & Management',
      description: 'Develop essential leadership and team management skills',
      duration: '3 weeks',
      progress: 0,
      unlockDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      rewards: [],
      topics: [
        {
          id: '2.1',
          title: 'Team Leadership',
          description: 'Learn effective team management techniques',
          duration: '3 hours',
          type: 'video',
          status: 'locked',
          xpReward: 75,
          skills: ['Leadership', 'Management', 'Delegation']
        },
        {
          id: '2.2',
          title: 'Conflict Resolution',
          description: 'Handle workplace conflicts professionally',
          duration: '2 hours',
          type: 'practice',
          status: 'locked',
          xpReward: 100,
          skills: ['Conflict Management', 'Negotiation', 'Problem Solving']
        }
      ]
    },
    {
      id: 3,
      title: 'Aptitude Training',
      description: 'Enhance your logical and analytical thinking',
      duration: '4 weeks',
      progress: 0,
      unlockDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      rewards: [],
      topics: [
        {
          id: '3.1',
          title: 'Quantitative Aptitude',
          description: 'Master mathematical and numerical reasoning',
          duration: '5 hours',
          type: 'quiz',
          status: 'locked',
          xpReward: 200,
          skills: ['Mathematics', 'Problem Solving', 'Analytical Thinking'],
          questions: [
            {
              id: 'q1',
              category: 'aptitude',
              question: 'If a train travels 420 kilometers in 7 hours, what is its speed in kilometers per hour?',
              options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
              correctAnswer: '60 km/h',
              explanation: 'Speed = Distance/Time = 420/7 = 60 km/h',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: '3.2',
          title: 'Logical Reasoning',
          description: 'Develop critical thinking and problem-solving abilities',
          duration: '4 hours',
          type: 'quiz',
          status: 'locked',
          xpReward: 150,
          skills: ['Logic', 'Critical Thinking', 'Pattern Recognition']
        }
      ]
    },
    {
      id: 4,
      title: 'English Proficiency',
      description: 'Improve your English language skills',
      duration: '6 weeks',
      progress: 0,
      unlockDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      rewards: [],
      topics: [
        {
          id: '4.1',
          title: 'Business English',
          description: 'Master professional English communication',
          duration: '4 hours',
          type: 'video',
          status: 'locked',
          xpReward: 100,
          skills: ['Business Communication', 'Writing', 'Speaking']
        },
        {
          id: '4.2',
          title: 'Grammar & Vocabulary',
          description: 'Enhance your language accuracy and range',
          duration: '3 hours',
          type: 'quiz',
          status: 'locked',
          xpReward: 75,
          skills: ['Grammar', 'Vocabulary', 'Language Skills']
        }
      ]
    }
  ],
  chatbotMessages: [],
  setUser: (user) => set({ user }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  completeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      ),
    })),
  addFeedbackScore: (score) =>
    set((state) => ({ feedbackScores: [...state.feedbackScores, score] })),
  markAttendance: (record) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            attendance: [...(state.user.attendance || []), record],
          }
        : null,
    })),
  addReward: (reward) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            rewards: [...(state.user.rewards || []), reward],
          }
        : null,
    })),
  updateProgress: (cycleId, topicId) =>
    set((state) => ({
      growthCycles: state.growthCycles.map((cycle) =>
        cycle.id === cycleId
          ? {
              ...cycle,
              topics: cycle.topics.map((topic) =>
                topic.id === topicId
                  ? { ...topic, status: 'completed' }
                  : topic
              ),
              progress: Math.min(
                100,
                (cycle.topics.filter((t) => t.status === 'completed').length /
                  cycle.topics.length) *
                  100
              ),
            }
          : cycle
      ),
    })),
  addChatMessage: (message) =>
    set((state) => ({
      chatbotMessages: [...state.chatbotMessages, message],
    })),
}));