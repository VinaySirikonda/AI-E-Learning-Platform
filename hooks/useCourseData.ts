import { useState, useEffect, useCallback } from 'react';
import { fetchCourseByPlaylistId } from '../services/youtubeService';
import { fetchQuizByCourseId } from '../services/quizService';
import type { Course, Progress, Week, Quiz, QuizProgress } from '../types';

const useCourseData = (playlistId: string | null) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<Progress>({});
  const [weekStatuses, setWeekStatuses] = useState<{ [weekId: string]: string }>({});
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizProgress, setQuizProgress] = useState<QuizProgress>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const PROGRESS_STORAGE_KEY = `eLearningProgress-${playlistId}`;
  const WEEK_STATUS_STORAGE_KEY = `eLearningWeekStatus-${playlistId}`;
  const QUIZ_PROGRESS_STORAGE_KEY = `eLearningQuizProgress-${playlistId}`;

  useEffect(() => {
    // Load all progress from localStorage when playlistId changes
    if (playlistId) {
      try {
        const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
        setProgress(savedProgress ? JSON.parse(savedProgress) : {});

        const savedStatuses = localStorage.getItem(WEEK_STATUS_STORAGE_KEY);
        setWeekStatuses(savedStatuses ? JSON.parse(savedStatuses) : {});

        const savedQuizProgress = localStorage.getItem(QUIZ_PROGRESS_STORAGE_KEY);
        setQuizProgress(savedQuizProgress ? JSON.parse(savedQuizProgress) : {});

      } catch (error) {
        console.error('Failed to load data from localStorage:', error);
        setProgress({});
        setWeekStatuses({});
        setQuizProgress({});
      }
    }
  }, [playlistId, PROGRESS_STORAGE_KEY, WEEK_STATUS_STORAGE_KEY, QUIZ_PROGRESS_STORAGE_KEY]);


  useEffect(() => {
    const loadCourseData = async () => {
      if (!playlistId) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError('');
        
        const courseData = await fetchCourseByPlaylistId(playlistId);
        setCourse(courseData);

        const quizData = await fetchQuizByCourseId(playlistId);
        setQuiz(quizData);

      } catch (err) {
        if (err instanceof Error) {
          setError(`Failed to load course: ${err.message}`);
        } else {
          setError('An unknown error occurred.');
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourseData();
  }, [playlistId]);

  useEffect(() => {
    // Save lesson progress to localStorage
    if (playlistId) {
      try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error('Failed to save lesson progress to localStorage:', error);
      }
    }
  }, [progress, playlistId, PROGRESS_STORAGE_KEY]);

  useEffect(() => {
    // Save week statuses to localStorage
    if (playlistId) {
      try {
        localStorage.setItem(WEEK_STATUS_STORAGE_KEY, JSON.stringify(weekStatuses));
      } catch (error) {
        console.error('Failed to save week statuses to localStorage:', error);
      }
    }
  }, [weekStatuses, playlistId, WEEK_STATUS_STORAGE_KEY]);
  
  useEffect(() => {
    // Save quiz progress to localStorage
    if (playlistId) {
      try {
        localStorage.setItem(QUIZ_PROGRESS_STORAGE_KEY, JSON.stringify(quizProgress));
      } catch (error) {
        console.error('Failed to save quiz progress to localStorage:', error);
      }
    }
  }, [quizProgress, playlistId, QUIZ_PROGRESS_STORAGE_KEY]);

  const toggleLessonComplete = useCallback((lessonId: string) => {
    setProgress(prevProgress => {
      const newProgress = {
        ...prevProgress,
        [lessonId]: { completed: !prevProgress[lessonId]?.completed },
      };

      // Automatically update the week status based on the new progress
      if (course) {
        const weekOfLesson = course.weeks.find(w => w.lessons.some(l => l.id === lessonId));
        if (weekOfLesson) {
          const completedCount = weekOfLesson.lessons.filter(l => newProgress[l.id]?.completed).length;
          const totalCount = weekOfLesson.lessons.length;
          let newStatus = 'Not started';

          if (totalCount > 0) {
            if (completedCount === totalCount) {
              newStatus = 'Completed';
            } else if (completedCount > 0) {
              newStatus = 'In progress';
            }
          }
          
          setWeekStatuses(prevStatuses => ({
            ...prevStatuses,
            [weekOfLesson.id]: newStatus,
          }));
        }
      }

      return newProgress;
    });
  }, [course]);
  
  const handleSelectAnswer = useCallback((questionId: string, selectedAnswer: string) => {
    setQuizProgress(prev => ({
      ...prev,
      [questionId]: { selectedAnswer }
    }));
  }, []);

  return { course, progress, toggleLessonComplete, isLoading, error, weekStatuses, quiz, quizProgress, handleSelectAnswer };
};

export default useCourseData;
