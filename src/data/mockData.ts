import { Prediction, Feedback, ActivityLog, User } from '@/types';

export const mockPredictions: Prediction[] = [
  {
    id: '1',
    text: 'Scientists discover new species of deep-sea fish with bioluminescent properties in the Mariana Trench. The discovery was made by an international team of marine biologists using advanced underwater drones.',
    linkUrl: 'https://example.com/science-discovery',
    prediction: 'Real',
    confidence: 0.94,
    votesUp: 45,
    votesDown: 3,
    userId: '1',
    createdAt: new Date('2024-01-15'),
    isCorrection: false,
  },
  {
    id: '2',
    text: 'BREAKING: Government secretly installing mind-control chips in all new smartphones. Anonymous sources reveal shocking conspiracy involving major tech companies.',
    prediction: 'Fake',
    confidence: 0.98,
    votesUp: 12,
    votesDown: 156,
    userId: '2',
    createdAt: new Date('2024-01-14'),
    isCorrection: false,
  },
  {
    id: '3',
    text: 'Climate report shows significant reduction in Arctic ice coverage over the past decade, with experts warning of accelerated melting patterns.',
    linkUrl: 'https://example.com/climate-report',
    prediction: 'Real',
    confidence: 0.89,
    votesUp: 78,
    votesDown: 5,
    userId: '3',
    createdAt: new Date('2024-01-13'),
    isCorrection: false,
  },
  {
    id: '4',
    text: 'Local bakery wins international award for their innovative sourdough bread recipe that uses a 200-year-old starter culture.',
    prediction: 'Real',
    confidence: 0.76,
    votesUp: 23,
    votesDown: 8,
    userId: '1',
    createdAt: new Date('2024-01-12'),
    isCorrection: true,
  },
  {
    id: '5',
    text: 'Miracle cure found! Drinking lemon water before bed eliminates all diseases within 30 days. Big Pharma doesn\'t want you to know this!',
    prediction: 'Fake',
    confidence: 0.99,
    votesUp: 2,
    votesDown: 234,
    userId: '4',
    createdAt: new Date('2024-01-11'),
    isCorrection: false,
  },
];

export const mockFeedback: Feedback[] = [
  {
    id: '1',
    predictionId: '4',
    correctedLabel: 'Real',
    note: 'The bakery story was verified by multiple local news sources.',
    userId: '2',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '2',
    predictionId: '1',
    correctedLabel: 'Real',
    note: 'Confirmed by peer-reviewed journal.',
    userId: '3',
    createdAt: new Date('2024-01-15'),
  },
];

export const mockUsers: User[] = [
  { id: '1', username: 'john_doe', email: 'john@example.com', isAdmin: false, createdAt: new Date('2024-01-01') },
  { id: '2', username: 'jane_smith', email: 'jane@example.com', isAdmin: false, createdAt: new Date('2024-01-02') },
  { id: '3', username: 'bob_wilson', email: 'bob@example.com', isAdmin: false, createdAt: new Date('2024-01-03') },
  { id: '4', username: 'admin', email: 'admin@example.com', isAdmin: true, createdAt: new Date('2023-12-01') },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: '1', action: 'prediction_created', userId: '1', details: 'User submitted new article for analysis', createdAt: new Date('2024-01-15T10:30:00') },
  { id: '2', action: 'vote_up', userId: '2', details: 'User upvoted prediction #1', createdAt: new Date('2024-01-15T11:00:00') },
  { id: '3', action: 'feedback_submitted', userId: '3', details: 'User flagged prediction #4 as incorrect', createdAt: new Date('2024-01-14T15:20:00') },
  { id: '4', action: 'user_login', userId: '1', details: 'User logged in successfully', createdAt: new Date('2024-01-14T09:00:00') },
  { id: '5', action: 'prediction_created', userId: '4', details: 'User submitted new article for analysis', createdAt: new Date('2024-01-13T14:45:00') },
];
