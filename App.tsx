
import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import CoursesDashboard from './components/Dashboard';
import CourseView from './components/CourseView';
import { LoadingSpinner } from './components/IconComponents';

const AUTH_KEY = 'eLearningAuth';

export default function App(): React.ReactNode {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_KEY);
      setIsAuthenticated(storedAuth === 'true');
    } catch (e) {
      console.error("Could not read auth status from local storage", e);
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = useCallback(() => {
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch (e) {
      console.error("Could not set auth status in local storage", e);
    }
    setIsAuthenticated(true);
  }, []);
  
  const handleLogout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {
      console.error("Could not remove auth status from local storage", e);
    }
    setIsAuthenticated(false);
    setSelectedPlaylistId(null);
  }, []);

  const handleSelectCourse = useCallback((playlistId: string) => {
    setSelectedPlaylistId(playlistId);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setSelectedPlaylistId(null);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <LoadingSpinner className="h-12 w-12 text-blue-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen bg-gray-900 text-gray-200 font-sans">
      {selectedPlaylistId ? (
        <CourseView playlistId={selectedPlaylistId} onBackToDashboard={handleBackToDashboard} onLogout={handleLogout}/>
      ) : (
        <CoursesDashboard onSelectCourse={handleSelectCourse} onLogout={handleLogout} />
      )}
    </div>
  );
}
