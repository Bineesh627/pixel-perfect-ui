export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Prediction {
  id: string;
  text: string;
  linkUrl?: string;
  prediction: 'Real' | 'Fake';
  confidence: number;
  votesUp: number;
  votesDown: number;
  userId: string;
  createdAt: Date;
  isCorrection: boolean;
}

export interface Feedback {
  id: string;
  predictionId: string;
  correctedLabel: 'Real' | 'Fake';
  note?: string;
  userId: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  action: string;
  userId: string;
  details: string;
  createdAt: Date;
}
