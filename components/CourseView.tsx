import React, { useState, useMemo, useCallback } from 'react';
import { Lesson, Week } from '../types';
import useCourseData from '../hooks/useCourseData';
import Sidebar from './Sidebar';
import LessonContent from './LessonContent';
import QuizView from './QuizView';
import { LoadingSpinner, BookOpenIcon } from './IconComponents';

interface CourseViewProps {
  playlistId: string;
  onBackToDashboard: () => void;
  onLogout: () => void;
}

const CourseView: React.FC<CourseViewProps> = ({ playlistId, onBackToDashboard, onLogout }) => {
  const { course, progress, toggleLessonComplete, isLoading, error, weekStatuses, quiz, quizProgress, handleSelectAnswer } = useCourseData(playlistId);
  const [selectedWeekId, setSelectedWeekId] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [viewMode, setViewMode] = useState<'lessons' | 'quiz'>('lessons');

  const handleSelectWeek = useCallback((weekId: string) => {
    setSelectedWeekId(weekId);
    setSelectedLesson(null);
  }, []);

  const handleSelectLesson = useCallback((lesson: Lesson) => {
    setSelectedLesson(lesson);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedLesson(null);
  }, []);

  const selectedWeek = useMemo(() => {
    if (!course || !selectedWeekId) return null;
    return course.weeks.find(w => w.id === selectedWeekId);
  }, [course, selectedWeekId]);

  const selectedQuizWeek = useMemo(() => {
    if (!quiz || !selectedWeek) return null;
    return quiz.weeks.find(qw => qw.week === selectedWeek.week_number);
  }, [quiz, selectedWeek]);

  const courseProgress = useMemo(() => {
    if (!course) return 0;
    const totalLessons = course.weeks.reduce((acc, week) => acc + week.lessons.length, 0);
    if (totalLessons === 0) return 0;
    const completedLessons = Object.values(progress).filter(p => p.completed).length;
    return (completedLessons / totalLessons) * 100;
  }, [course, progress]);

  const getWeekProgress = useCallback((week: Week) => {
    const totalLessons = week.lessons.length;
    if (totalLessons === 0) return 0;
    const completedLessons = week.lessons.filter(l => progress[l.id]?.completed).length;
    return (completedLessons / totalLessons) * 100;
  }, [progress]);
  
  const getWeekQuizProgress = useCallback((week: Week) => {
    const quizWeek = quiz?.weeks.find(qw => qw.week === week.week_number);
    if (!quizWeek) return { score: 0, maxScore: 0 };
    
    const maxScore = quizWeek.questions.length;
    let score = 0;
    quizWeek.questions.forEach(q => {
      const userAnswer = quizProgress[q.id]?.selectedAnswer;
      const correctAnswer = q.answer;
      if (userAnswer && userAnswer.charAt(0) === correctAnswer) {
        score++;
      }
    });
    return { score, maxScore };
  }, [quiz, quizProgress]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <LoadingSpinner className="h-12 w-12 mx-auto text-blue-500" />
          <p className="mt-4 text-lg font-semibold text-gray-300">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }

  if (!course) {
     return <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-400">No course data available.</div>;
  }

  // Auto-select the first week if none is selected
  if (!selectedWeekId && course.weeks.length > 0) {
    setSelectedWeekId(course.weeks[0].id);
  }

  const quizForCourseExists = !!quiz;
  const quizForWeekExists = !!selectedQuizWeek;

  return (
    <div className="flex h-screen">
      <Sidebar
        course={course}
        selectedWeekId={selectedWeekId}
        onSelectWeek={handleSelectWeek}
        getWeekProgress={getWeekProgress}
        getWeekQuizProgress={getWeekQuizProgress}
        courseProgress={courseProgress}
        onBackToDashboard={onBackToDashboard}
        onLogout={onLogout}
        weekStatuses={weekStatuses}
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 border-b border-gray-700 pb-4">
            <div>
                <h2 className="text-3xl font-bold text-white">{selectedWeek?.title}</h2>
                <p className="text-gray-400 mt-1">Select a lesson to watch or test your knowledge with the quiz.</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0 bg-gray-800 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('lessons')} 
                  className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${viewMode === 'lessons' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  Lessons
                </button>
                {quizForCourseExists && (
                  <button 
                    onClick={() => setViewMode('quiz')} 
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${viewMode === 'quiz' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    Quiz
                  </button>
                )}
            </div>
        </div>

        {viewMode === 'lessons' && (
          <LessonContent
            week={selectedWeek}
            lesson={selectedLesson}
            progress={progress}
            onSelectLesson={handleSelectLesson}
            onToggleComplete={toggleLessonComplete}
            onBackToList={handleBackToList}
          />
        )}
        {viewMode === 'quiz' && quizForCourseExists && (
          quizForWeekExists ? (
            <QuizView
              key={selectedWeek?.id} // Add key to force re-mount on week change
              quizWeek={selectedQuizWeek}
              quizProgress={quizProgress}
              onSelectAnswer={handleSelectAnswer}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-2/3 text-center">
              <BookOpenIcon className="h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-white">No Quiz Available</h3>
              <p className="text-gray-400 mt-2">There's no quiz content for this week.</p>
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default CourseView;
