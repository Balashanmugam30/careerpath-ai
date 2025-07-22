
// Augment the window object to declare global libraries loaded via CDN
declare global {
    interface Window {
        html2canvas: any;
        jspdf: any;
    }
}

export interface UserInput {
  name: string;
  year: string;
  domain: string;
  interests: string[];
}

export interface SkillStage {
  stage: string;
  skills: string[];
  description: string;
}

export interface RecommendedCourse {
  name: string;
  platform: string;
  url: string;
}

export interface SampleProject {
  name: string;
  description: string;
  githubUrl: string;
}

export interface InternshipPlatform {
  name: string;
  url: string;
}

export interface RoadmapData {
  skillRoadmap: SkillStage[];
  recommendedCourses: RecommendedCourse[];
  sampleProjects: SampleProject[];
  internshipPlatforms: InternshipPlatform[];
}
