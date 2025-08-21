
import React, { useState, useEffect } from 'react';
import type { Course } from '../types';
import { getAvailableCourses } from '../services/youtubeService';
import { LoadingSpinner, LogoutIcon } from './IconComponents';

interface CoursesDashboardProps {
    onSelectCourse: (playlistId: string) => void;
    onLogout: () => void;
}

type CourseInfo = Omit<Course, 'weeks'>;

const CoursesDashboard: React.FC<CoursesDashboardProps> = ({ onSelectCourse, onLogout }) => {
    const [courses, setCourses] = useState<CourseInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCourses = async () => {
            setIsLoading(true);
            try {
                const availableCourses = await getAvailableCourses();
                setCourses(availableCourses);
            } catch (error) {
                console.error("Failed to load courses", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadCourses();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner className="h-12 w-12 text-blue-500" />
            </div>
        );
    }
    
    return (
        <div className="p-4 md:p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Available Courses</h1>
                <button onClick={onLogout} className="flex items-center text-sm text-gray-400 hover:text-red-400 transition-colors group">
                    <LogoutIcon className="h-5 w-5 mr-2 text-gray-500 group-hover:text-red-400 transition-colors" />
                    Logout
                </button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} onSelectCourse={onSelectCourse} />
                ))}
            </div>
        </div>
    );
};

const CourseCard: React.FC<{ course: CourseInfo, onSelectCourse: (playlistId: string) => void }> = ({ course, onSelectCourse }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    
    return (
         <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 group transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
            <div className="relative aspect-video bg-gray-700">
                {!isImageLoaded && <div className="w-full h-full animate-pulse bg-gray-600"></div>}
                <img
                    src={course.thumbnailUrl}
                    alt={`${course.title} thumbnail`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsImageLoaded(true)}
                />
            </div>
            <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{course.title}</h2>
                <p className="text-gray-400 text-sm mb-4 h-20 overflow-hidden">{course.description}</p>
                <button 
                    onClick={() => onSelectCourse(course.playlistId)}
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors duration-200"
                >
                    Start Learning
                </button>
            </div>
        </div>
    );
}

export default CoursesDashboard;
