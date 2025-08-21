
import React, { useState } from 'react';
import { BookOpenIcon } from './IconComponents';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials here.
    // For this demo, we'll just proceed.
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
           <BookOpenIcon className="h-12 w-12 text-blue-500 mx-auto"/>
          <h1 className="text-3xl font-bold text-white mt-4">AI E-Learning Platform</h1>
          <p className="text-gray-400 mt-2">Sign in to start your learning journey.</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <p className="text-xs text-center text-gray-500">
                (This is a demo. Any email/password will work.)
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors duration-200"
            >
              Sign In / Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
