import React from 'react';
import type { Course, Week } from '../types';
import ProgressBar from './ProgressBar';
import { BookOpenIcon, CheckCircleIcon, GridIcon, LogoutIcon } from './IconComponents';

interface SidebarProps {
  course: Course;
  selectedWeekId: string | null;
  onSelectWeek: (weekId: string) => void;
  getWeekProgress: (week: Week) => number;
  getWeekQuizProgress: (week: Week) => { score: number; maxScore: number };
  courseProgress: number;
  onBackToDashboard: () => void;
  onLogout: () => void;
  weekStatuses: { [weekId: string]: string };
}

const getStatusStyles = (status: string): string => {
  switch (status) {
    case 'In progress':
      return 'bg-blue-500/20 text-blue-300';
    case 'Completed':
      return 'bg-green-500/20 text-green-400';
    default: // Not started
      return 'bg-gray-700 text-gray-300';
  }
};

const Sidebar: React.FC<SidebarProps> = ({ course, selectedWeekId, onSelectWeek, getWeekProgress, getWeekQuizProgress, courseProgress, onBackToDashboard, onLogout, weekStatuses }) => {
  return (
    <aside className="w-64 md:w-72 lg:w-80 bg-gray-800 flex-shrink-0 p-4 md:p-6 flex flex-col border-r border-gray-700">
       <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BookOpenIcon className="h-8 w-8 text-blue-500 flex-shrink-0" />
          <h1 className="text-xl font-bold ml-3 text-white leading-tight">{course.title}</h1>
        </div>
      </div>

      <button onClick={onBackToDashboard} className="flex items-center text-sm w-full text-blue-400 hover:text-blue-300 mb-6 transition-colors group">
        <GridIcon className="h-5 w-5 mr-2 text-gray-400 group-hover:text-blue-300 transition-colors" />
        Back to Courses
      </button>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Overall Progress</h3>
        <ProgressBar percentage={courseProgress} />
      </div>

      <nav className="flex-1 overflow-y-auto -mr-2 pr-2">
        <h2 className="text-sm font-bold uppercase text-gray-500 mb-3 tracking-wider">Weeks</h2>
        <ul>
          {course.weeks.map((week) => {
            const progress = getWeekProgress(week);
            const { score, maxScore } = getWeekQuizProgress(week);
            const isSelected = week.id === selectedWeekId;
            const status = weekStatuses[week.id] || 'Not started';

            return (
              <li key={week.id} className="mb-2">
                <div
                  onClick={() => onSelectWeek(week.id)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectWeek(week.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${week.title}`}
                  className={`w-full text-left p-3 rounded-lg flex flex-col transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/20 text-white'
                      : 'hover:bg-gray-700/50 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{week.title}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusStyles(status)} transition-colors duration-300`}>
                      {status}
                    </span>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-xs font-semibold text-gray-400">Lessons</span>
                      <ProgressBar percentage={progress} slim={true} />
                    </div>
                    {maxScore > 0 && (
                      <div>
                        <div className="flex justify-between items-center">
                           <span className="text-xs font-semibold text-gray-400">Quiz</span>
                           <span className="text-xs font-semibold text-gray-300">{score}/{maxScore}</span>
                        </div>
                        <ProgressBar percentage={(score / maxScore) * 100} slim={true} />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-6 border-t border-gray-700 pt-4">
         <button onClick={onLogout} className="w-full flex items-center text-sm text-gray-400 hover:text-red-400 transition-colors group">
            <LogoutIcon className="h-5 w-5 mr-2 text-gray-500 group-hover:text-red-400 transition-colors" />
            Logout
        </button>
        <p className="mt-4 text-center text-xs text-gray-500">Powered by AI</p>
      </div>
    </aside>
  );
};

export default Sidebar;
