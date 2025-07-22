
import React from 'react';

const RouteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="py-4 px-8 w-full bg-stone-950/80 backdrop-blur-sm border-b border-stone-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
            <RouteIcon />
            <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">
                CareerPath AI
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
