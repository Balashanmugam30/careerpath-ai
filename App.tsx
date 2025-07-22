
import React, { useState, useRef, useCallback } from 'react';
import { generateRoadmap } from './services/geminiService';
import { RoadmapData, UserInput } from './types';
import { INTEREST_OPTIONS, YEAR_OPTIONS, DOMAIN_OPTIONS } from './constants';
import UserInputForm from './components/UserInputForm';
import RoadmapDisplay from './components/RoadmapDisplay';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    name: '',
    year: YEAR_OPTIONS[0],
    domain: DOMAIN_OPTIONS[0],
    interests: [],
  });
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);

  const handleGenerateRoadmap = async () => {
    if (!userInput.name || !userInput.domain || userInput.interests.length === 0) {
        setError("Please fill out all fields and select at least one interest.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setRoadmapData(null);

    try {
      const data = await generateRoadmap(userInput);
      setRoadmapData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate roadmap. The AI might be busy or an error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPdf = useCallback(() => {
    if (!roadmapRef.current || !window.html2canvas || !window.jspdf) {
        console.error("PDF generation resources not available.");
        setError("Could not generate PDF. Please try refreshing the page.");
        return;
    }
    const { jsPDF } = window.jspdf;
    
    window.html2canvas(roadmapRef.current, { 
        useCORS: true,
        scale: 2, 
        backgroundColor: '#0c0a09' 
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const imgHeight = pdfWidth / ratio;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
        
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`CareerPath_Roadmap_${userInput.name.replace(/\s/g, '_')}.pdf`);
    }).catch(err => {
        console.error("Error during PDF generation:", err);
        setError("An error occurred while creating the PDF.");
    });
  }, [userInput.name]);

  const resetForm = () => {
    setRoadmapData(null);
    setError(null);
    setUserInput({
        name: '',
        year: YEAR_OPTIONS[0],
        domain: DOMAIN_OPTIONS[0],
        interests: [],
    });
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
          {!roadmapData ? (
            <UserInputForm
              userInput={userInput}
              setUserInput={setUserInput}
              onSubmit={handleGenerateRoadmap}
              isLoading={isLoading}
              error={error}
            />
          ) : (
             <RoadmapDisplay 
                ref={roadmapRef}
                roadmapData={roadmapData}
                userName={userInput.name}
                onDownload={handleDownloadPdf}
                onReset={resetForm}
             />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
