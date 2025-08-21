import React, { useState } from 'react';
import type { Lesson } from '../types';
import { CheckCircleIcon, PlayIcon } from './IconComponents';

interface LessonListItemProps {
    lesson: Lesson;
    lessonNumber: number;
    isCompleted: boolean;
    onSelectLesson: () => void;
}

const LessonListItem: React.FC<LessonListItemProps> = ({ lesson, lessonNumber, isCompleted, onSelectLesson }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const thumbnailUrl = `https://img.youtube.com/vi/${lesson.video_id}/sddefault.jpg`;

    return (
        <div
            className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-800 transition-all duration-200 cursor-pointer group"
            onClick={onSelectLesson}
        >
            <div className="relative w-32 h-20 bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                {!isImageLoaded && (
                    <div className="w-full h-full animate-pulse bg-gray-600"></div>
                )}
                <img
                    src={thumbnailUrl}
                    alt={`Thumbnail for ${lesson.title}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsImageLoaded(true)}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                    <PlayIcon className="w-10 h-10 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transform transition-all" />
                </div>
                {isCompleted && (
                    <div className="absolute top-1 right-1 bg-gray-900/50 rounded-full">
                      <CheckCircleIcon className="h-6 w-6 text-green-400" />
                    </div>
                )}
            </div>

            <div className="ml-4 flex-grow">
                <p className="text-sm text-gray-400">Lesson {lessonNumber}</p>
                <h3 className="text-lg font-semibold text-gray-200 group-hover:text-white">{lesson.title}</h3>
            </div>
            
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-sm hover:bg-blue-500 transition-colors"
                >
                    Watch
                </button>
            </div>
        </div>
    );
};

export default LessonListItem;