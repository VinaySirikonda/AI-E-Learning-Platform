import React, { useState } from 'react';
import type { Lesson } from '../types';
import { generateLessonSummary } from '../services/geminiService';
import { ArrowLeftIcon, CheckCircleIcon, SparklesIcon, LoadingSpinner, PlayIcon } from './IconComponents';

interface VideoPlayerProps {
  lesson: Lesson;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
  onBack: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ lesson, isCompleted, onToggleComplete, onBack }) => {
  const [summary, setSummary] = useState<string>('');
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false);
  const [summaryError, setSummaryError] = useState<string>('');
  const [showVideo, setShowVideo] = useState(false);

  const handleGetSummary = async () => {
    setIsLoadingSummary(true);
    setSummary('');
    setSummaryError('');
    try {
      const result = await generateLessonSummary(lesson.title);
      setSummary(result);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      setSummaryError("Sorry, I couldn't generate a summary for this lesson. Please try again.");
    } finally {
      setIsLoadingSummary(false);
    }
  };
  
  const videoThumbnailUrl = `https://img.youtube.com/vi/${lesson.video_id}/sddefault.jpg`;

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center text-sm text-blue-400 hover:text-blue-300 mb-4 transition-colors">
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to Lesson List
      </button>

      <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl mb-6 border border-gray-700">
        {!showVideo ? (
          <div
            className="w-full h-full bg-cover bg-center cursor-pointer group relative"
            style={{ backgroundImage: `url(${videoThumbnailUrl})` }}
            onClick={() => setShowVideo(true)}
            aria-label={`Play video: ${lesson.title}`}
            role="button"
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="bg-black bg-opacity-50 rounded-full p-1">
                <PlayIcon className="w-20 h-20 text-white opacity-90 group-hover:opacity-100 transform group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${lesson.video_id}?autoplay=1`}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-0">{lesson.title}</h1>
        <button
          onClick={() => onToggleComplete(lesson.id)}
          className={`flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-all duration-200 text-base ${
            isCompleted
              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              : 'bg-blue-600 text-white hover:bg-blue-500'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Completed
            </>
          ) : (
            'Mark as Complete'
          )}
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">AI-Powered Summary</h2>
        <button
          onClick={handleGetSummary}
          disabled={isLoadingSummary}
          className="flex items-center bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700/50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          {isLoadingSummary ? (
            <LoadingSpinner className="h-5 w-5 mr-2"/>
          ) : (
            <SparklesIcon className="h-5 w-5 mr-2" />
          )}
          {isLoadingSummary ? 'Generating...' : 'Generate Summary'}
        </button>
        
        {summary && (
           <div className="mt-4 text-gray-300 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: summary }} />
        )}
        {summaryError && (
          <p className="mt-4 text-red-400">{summaryError}</p>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;