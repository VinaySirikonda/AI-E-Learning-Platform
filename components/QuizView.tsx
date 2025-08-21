import React, { useState, useMemo } from 'react';
import type { QuizWeek, QuizProgress, Question } from '../types';
import { ClipboardCheckIcon, CheckCircleIcon } from './IconComponents';

interface QuizViewProps {
  quizWeek: QuizWeek;
  quizProgress: QuizProgress;
  onSelectAnswer: (questionId: string, selectedAnswer: string) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quizWeek, quizProgress, onSelectAnswer }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!isSubmitted) return 0;
    return quizWeek.questions.reduce((acc, q) => {
      const userAnswer = quizProgress[q.id]?.selectedAnswer;
      const correctAnswer = q.answer;
      return userAnswer && userAnswer.charAt(0) === correctAnswer ? acc + 1 : acc;
    }, 0);
  }, [isSubmitted, quizWeek, quizProgress]);

  const allQuestionsAnswered = useMemo(() => {
    return quizWeek.questions.every(q => quizProgress[q.id]?.selectedAnswer);
  }, [quizWeek, quizProgress]);

  return (
    <div className="max-w-4xl mx-auto">
      {isSubmitted && (
        <div className="bg-gray-800 border border-blue-500 rounded-lg p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold text-white">Quiz Results</h2>
          <p className="text-4xl font-bold text-blue-400 my-2">
            {score} / {quizWeek.questions.length}
          </p>
          <p className="text-gray-300">You've completed the quiz for this week!</p>
          <button onClick={() => setIsSubmitted(false)} className="mt-4 text-sm text-blue-400 hover:underline">
            Try Again
          </button>
        </div>
      )}

      <div className="space-y-6">
        {quizWeek.questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={index + 1}
            userAnswer={quizProgress[question.id]?.selectedAnswer}
            onSelectAnswer={(answer) => onSelectAnswer(question.id, answer)}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>
      
      {!isSubmitted && (
        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end">
          <button
            onClick={() => setIsSubmitted(true)}
            disabled={!allQuestionsAnswered}
            className="flex items-center bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-500 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <ClipboardCheckIcon className="h-5 w-5 mr-2" />
            Submit & See Results
          </button>
        </div>
      )}
    </div>
  );
};


interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  userAnswer?: string;
  onSelectAnswer: (answer: string) => void;
  isSubmitted: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, userAnswer, onSelectAnswer, isSubmitted }) => {
  const getChoiceStyle = (choice: string) => {
    const choiceLetter = choice.charAt(0);
    const isSelected = userAnswer === choice;
    const isCorrect = choiceLetter === question.answer;

    if (isSubmitted) {
      if (isCorrect) return 'bg-green-500/20 border-green-500 text-green-300';
      if (isSelected && !isCorrect) return 'bg-red-500/20 border-red-500 text-red-300';
      return 'border-gray-600';
    }
    
    if (isSelected) return 'bg-blue-600/30 border-blue-500';
    return 'border-gray-600 hover:border-blue-500 hover:bg-gray-700/50';
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <p className="text-sm font-semibold text-gray-400 mb-1">Question {questionNumber}</p>
      <h3 className="text-lg font-semibold text-white mb-4">{question.question}</h3>
      <div className="space-y-3">
        {question.choices.map(choice => (
          <button
            key={choice}
            onClick={() => !isSubmitted && onSelectAnswer(choice)}
            disabled={isSubmitted}
            className={`w-full text-left p-4 rounded-md border-2 transition-all duration-200 ${getChoiceStyle(choice)} disabled:cursor-default`}
          >
            {choice}
          </button>
        ))}
      </div>
      {isSubmitted && (
        <div className={`mt-4 p-4 rounded-md text-sm ${userAnswer && userAnswer.charAt(0) === question.answer ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
           <p><strong>{userAnswer && userAnswer.charAt(0) === question.answer ? 'Correct!' : 'Incorrect.'}</strong> {userAnswer && userAnswer.charAt(0) === question.answer ? question.explanations.correct : question.explanations.incorrect}</p>
        </div>
      )}
    </div>
  );
};


export default QuizView;
