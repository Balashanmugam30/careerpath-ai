
import { GoogleGenAI, Type } from "@google/genai";
import type { UserInput, RoadmapData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const roadmapSchema = {
    type: Type.OBJECT,
    properties: {
        skillRoadmap: {
            type: Type.ARRAY,
            description: "A detailed, stage-by-stage skill development plan.",
            items: {
                type: Type.OBJECT,
                properties: {
                    stage: { type: Type.STRING, description: "Name of the learning stage (e.g., 'Foundation', 'Intermediate')." },
                    skills: { type: Type.ARRAY, description: "List of specific skills to learn in this stage.", items: { type: Type.STRING } },
                    description: { type: Type.STRING, description: "A brief explanation of the focus of this stage." }
                },
                required: ["stage", "skills", "description"]
            }
        },
        recommendedCourses: {
            type: Type.ARRAY,
            description: "A list of recommended online courses.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The full name of the course." },
                    platform: { type: Type.STRING, description: "The platform hosting the course (e.g., Coursera, YouTube)." },
                    url: { type: Type.STRING, description: "A direct URL to the course." }
                },
                required: ["name", "platform", "url"]
            }
        },
        sampleProjects: {
            type: Type.ARRAY,
            description: "A list of sample projects to build for practice.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The name of the project." },
                    description: { type: Type.STRING, description: "A brief description of the project and its learning goals." },
                    githubUrl: { type: Type.STRING, description: "A placeholder or example GitHub URL for the project." }
                },
                required: ["name", "description", "githubUrl"]
            }
        },
        internshipPlatforms: {
            type: Type.ARRAY,
            description: "A list of platforms to find relevant internships.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The name of the internship platform." },
                    url: { type: Type.STRING, description: "A direct URL to the platform's website." }
                },
                required: ["name", "url"]
            }
        }
    },
    required: ["skillRoadmap", "recommendedCourses", "sampleProjects", "internshipPlatforms"]
};


export const generateRoadmap = async (userInput: UserInput): Promise<RoadmapData> => {
    const { name, year, domain, interests } = userInput;

    const prompt = `
        You are "CareerPath AI", an expert career counselor for engineering students. Your goal is to generate a personalized and actionable skill development roadmap.

        A student named ${name}, who is in their ${year} of engineering, wants to specialize in the ${domain} domain. Their specific interests include: ${interests.join(', ')}.

        Based on this information, generate a comprehensive roadmap in a structured JSON format. The roadmap should be highly tailored to their current academic year and interests. For example, a 1st-year student's roadmap should focus on fundamentals, while a 3rd-year's should include more advanced topics and internship preparation.

        The JSON output must strictly adhere to the provided schema.

        - For "skillRoadmap", create 3-4 distinct stages (e.g., 'Foundation', 'Intermediate', 'Advanced', 'Specialization').
        - For "recommendedCourses", provide a mix of courses from platforms like Coursera, Udemy, freeCodeCamp, and YouTube. Ensure the links are valid and direct.
        - For "sampleProjects", suggest 3-4 projects of increasing complexity. Describe what skills each project will help develop.
        - For "internshipPlatforms", list well-known platforms like LinkedIn, AngelList, and others relevant to the tech domain.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: roadmapSchema
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as RoadmapData;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get a valid response from the AI model.");
    }
};
