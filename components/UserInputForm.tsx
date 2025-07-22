
import React from 'react';
import type { UserInput } from '../types';
import { YEAR_OPTIONS, DOMAIN_OPTIONS, INTEREST_OPTIONS } from '../constants';

interface UserInputFormProps {
  userInput: UserInput;
  setUserInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const UserInputForm: React.FC<UserInputFormProps> = ({ userInput, setUserInput, onSubmit, isLoading, error }) => {
  const handleInterestChange = (interest: string) => {
    setUserInput(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  return (
    <div className="bg-stone-900/50 p-6 md:p-8 rounded-2xl shadow-2xl shadow-violet-500/10 border border-stone-800 backdrop-blur-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Craft Your Future</h2>
        <p className="text-stone-400 mt-2">Tell us about yourself to get a personalized skill roadmap.</p>
      </div>
      
      {error && <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-lg mb-6 text-center">{error}</div>}

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-300 mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              value={userInput.name}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              className="w-full bg-stone-800/70 border border-stone-700 rounded-lg px-4 py-2.5 text-white placeholder-stone-500 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
              placeholder="e.g., Ada Lovelace"
              required
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-stone-300 mb-2">Current Academic Year</label>
            <select
              id="year"
              value={userInput.year}
              onChange={(e) => setUserInput({ ...userInput, year: e.target.value })}
              className="w-full bg-stone-800/70 border border-stone-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
            >
              {YEAR_OPTIONS.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-stone-300 mb-2">Preferred Domain</label>
          <select
            id="domain"
            value={userInput.domain}
            onChange={(e) => setUserInput({ ...userInput, domain: e.target.value })}
            className="w-full bg-stone-800/70 border border-stone-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
          >
            {DOMAIN_OPTIONS.map(domain => <option key={domain} value={domain}>{domain}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-300 mb-2">Your Interests</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INTEREST_OPTIONS.map(interest => (
              <label key={interest} className="flex items-center space-x-3 p-3 bg-stone-800/70 border border-stone-700 rounded-lg cursor-pointer hover:bg-stone-700/50 transition-colors duration-200 has-[:checked]:bg-violet-900/50 has-[:checked]:border-violet-600">
                <input
                  type="checkbox"
                  checked={userInput.interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                  className="h-4 w-4 rounded-sm border-stone-600 bg-stone-700 text-violet-500 focus:ring-violet-500 focus:ring-offset-stone-800"
                />
                <span className="text-sm text-stone-200">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-gradient-to-r from-violet-600 to-sky-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-violet-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isLoading ? <LoadingSpinner /> : 'Generate My Roadmap'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInputForm;
