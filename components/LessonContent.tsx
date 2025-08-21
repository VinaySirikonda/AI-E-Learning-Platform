
import React from 'react';
import type { Lesson, Week, Progress } from '../types';
import VideoPlayer from './VideoPlayer';
import LessonListItem from './LessonListItem';
import { ArrowLeftIcon, GridIcon } from './IconComponents';

interface LessonContentProps {
  week: Week | null | undefined;
  lesson: Lesson | null;
  progress: Progress;
  onSelectLesson: (lesson: Lesson) => void;
  onToggleComplete: (lessonId: string) => void;
  onBackToList: () => void;
}

const LessonContent: React.FC<LessonContentProps> = ({
  week,
  lesson,
  progress,
  onSelectLesson,
  onToggleComplete,
  onBackToList,
}) => {
  if (lesson) {
    return (
      <VideoPlayer
        lesson={lesson}
        isCompleted={progress[lesson.id]?.completed || false}
        onToggleComplete={onToggleComplete}
        onBack={onBackToList}
      />
    );
  }

  if (week) {
    return (
      <div className="space-y-3">
        {week.lessons.map((l, index) => (
          <LessonListItem
            key={l.id}
            lesson={l}
            lessonNumber={index + 1}
            isCompleted={progress[l.id]?.completed || false}
            onSelectLesson={() => onSelectLesson(l)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">Select a week from the sidebar to view lessons.</p>
    </div>
  );
};

export default LessonContent;
