
import React, { forwardRef } from 'react';
import type { RoadmapData } from '../types';

interface RoadmapDisplayProps {
  roadmapData: RoadmapData;
  userName: string;
  onDownload: () => void;
  onReset: () => void;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const RestartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0114.12-6.36M20 15a9 9 0 01-14.12 6.36" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline text-stone-400 group-hover:text-sky-400 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const RoadmapDisplay = forwardRef<HTMLDivElement, RoadmapDisplayProps>(({ roadmapData, userName, onDownload, onReset }, ref) => {
    return (
        <div>
            <div ref={ref} className="bg-stone-900 p-6 md:p-10 rounded-2xl border border-stone-800 transition-all duration-500 ease-in-out">
                <header className="mb-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">Your Personalized Roadmap</h2>
                    <p className="text-lg text-stone-300 mt-2">Here's a strategic path to success for <span className="font-semibold text-white">{userName}</span>.</p>
                </header>

                <section className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 border-l-4 border-violet-500 pl-4 text-white">Skill Development Path</h3>
                    <div className="space-y-6">
                        {roadmapData.skillRoadmap.map((stage, index) => (
                            <div key={index} className="bg-stone-950/50 p-5 rounded-lg border border-stone-800">
                                <h4 className="font-bold text-xl text-violet-300 mb-2">{stage.stage}</h4>
                                <p className="text-stone-400 mb-4">{stage.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {stage.skills.map((skill, i) => (
                                        <span key={i} className="bg-stone-800 text-sky-200 text-xs font-medium px-2.5 py-1 rounded-full border border-stone-700">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <section>
                        <h3 className="text-2xl font-semibold mb-6 border-l-4 border-sky-500 pl-4 text-white">Recommended Courses</h3>
                        <div className="space-y-4">
                            {roadmapData.recommendedCourses.map((course, index) => (
                                <a key={index} href={course.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-stone-950/50 rounded-lg border border-stone-800 hover:border-sky-500/50 hover:bg-stone-800/40 transition group">
                                    <p className="font-semibold text-white">{course.name}<ExternalLinkIcon /></p>
                                    <p className="text-sm text-sky-300">{course.platform}</p>
                                </a>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold mb-6 border-l-4 border-sky-500 pl-4 text-white">Sample Projects</h3>
                        <div className="space-y-4">
                            {roadmapData.sampleProjects.map((project, index) => (
                                <a key={index} href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block p-4 bg-stone-950/50 rounded-lg border border-stone-800 hover:border-sky-500/50 hover:bg-stone-800/40 transition group">
                                    <p className="font-semibold text-white">{project.name}<ExternalLinkIcon /></p>
                                    <p className="text-sm text-stone-400">{project.description}</p>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>

                <section className="mt-12">
                    <h3 className="text-2xl font-semibold mb-6 border-l-4 border-violet-500 pl-4 text-white">Internship & Career Platforms</h3>
                    <div className="flex flex-wrap gap-4">
                        {roadmapData.internshipPlatforms.map((platform, index) => (
                             <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-950/50 rounded-lg border border-stone-800 hover:border-violet-500/50 hover:bg-stone-800/40 transition group font-semibold text-white">
                                {platform.name}<ExternalLinkIcon />
                            </a>
                        ))}
                    </div>
                </section>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={onDownload} className="flex items-center justify-center bg-gradient-to-r from-violet-600 to-sky-500 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-violet-500/30 transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
                    <DownloadIcon /> Download as PDF
                </button>
                <button onClick={onReset} className="flex items-center justify-center bg-stone-700 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-stone-600 transition-all duration-300 w-full sm:w-auto">
                    <RestartIcon /> Create New Roadmap
                </button>
            </div>
        </div>
    );
});

RoadmapDisplay.displayName = 'RoadmapDisplay';

export default RoadmapDisplay;
