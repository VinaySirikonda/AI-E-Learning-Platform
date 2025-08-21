
export interface Lesson {
  id: string;
  week_id: string;
  title: string;
  video_id: string;
}

export interface Week {
  id: string;
  course_id: string;
  week_number: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  playlistId: string;
  title: string;
  description: string;
  weeks: Week[];
  thumbnailUrl: string;
}

export interface Progress {
  [lesson_id: string]: {
    completed: boolean;
  };
}

// Quiz Types
export interface Explanations {
  correct: string;
  incorrect: string;
}

export interface Question {
  id: string;
  question: string;
  choices: string[];
  answer: string;
  explanations: Explanations;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface QuizWeek {
  week: number;
  questions: Question[];
}

export interface Quiz {
  course: string;
  weeks: QuizWeek[];
}

export interface QuizProgress {
  [questionId: string]: {
    selectedAnswer: string; // e.g., "A", "B"
  };
}
