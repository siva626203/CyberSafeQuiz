import { introQuestions } from './introQuiz';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Category = 'Passwords' | 'Phishing' | 'Safe Browsing' | 'Network Security' | 'Data Protection' | 'Malware' | 'Social Engineering' | 'Authentication' | 'System Security';
export type QuestionType = 'multiple-choice' | 'true-false' | 'image-identification' | 'scenario' | 'puzzle';

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: Category;
  difficulty: Difficulty;
  imageUrl?: string;
  scenarioText?: string;
  puzzleData?: string; // For scrambled words or cipher text
}

// Combine original demo questions (optional) or just use the new robust set.
// The user asked to "Generate quiz data... How you can use it... Feed JSON into existing component".
// To ensure the "levels" logic works (which depends on array length ~12+),
// and to fulfill the "Introduction to Cyber Safety" request, I will use the generated set.
// The generated set has 21 questions, which is perfect for 5 levels (4 questions each).

export const allQuestions: QuizQuestion[] = introQuestions;

export function getQuestionsByFilter(difficulty?: Difficulty, category?: Category): QuizQuestion[] {
  let filtered = [...allQuestions];
  
  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  
  if (category) {
    filtered = filtered.filter(q => q.category === category);
  }
  
  return filtered;
}

export const categories: Category[] = [
  'Passwords',
  'Phishing',
  'Safe Browsing',
  'Network Security',
  'Data Protection',
  'Malware',
  'Social Engineering',
  'Authentication',
  'System Security'
];

export const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced'];

export const quizQuestions = allQuestions;
