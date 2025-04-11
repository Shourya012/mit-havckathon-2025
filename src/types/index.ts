export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'student' | 'professor' | 'teacher' | 'other';
  currentAddress: Address;
  permanentAddress: Address;
  streak: number;
  lastPracticeDate: string;
  xp: number;
  level: number;
  rewards: Reward[];
  attendance: AttendanceRecord[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface InterviewQuestion {
  id: string;
  category: 'hr' | 'technical' | 'aptitude' | 'english' | 'leadership';
  question: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  suggestedAnswer?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
}

export interface PracticeTask {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  date: string;
  xpReward: number;
  unlockDate: string;
}

export interface FeedbackScore {
  id: string;
  userId: string;
  mentorId?: string;
  category: string;
  score: number;
  feedback: string;
  date: string;
  areas: {
    name: string;
    score: number;
    comments: string;
  }[];
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'badge' | 'certificate' | 'achievement';
  dateEarned: string;
  imageUrl?: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'excused';
  sessionType: string;
  duration: number;
}

export interface GrowthCycle {
  id: number;
  title: string;
  description: string;
  duration: string;
  progress: number;
  topics: Topic[];
  unlockDate: string;
  rewards: Reward[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'quiz' | 'practice' | 'assignment' | 'assessment';
  status: 'locked' | 'available' | 'completed';
  xpReward: number;
  skills: string[];
  questions?: InterviewQuestion[];
}

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'professor' | 'teacher' | 'other';
  currentAddress: Address;
  permanentAddress: Address;
  otp: string;
}