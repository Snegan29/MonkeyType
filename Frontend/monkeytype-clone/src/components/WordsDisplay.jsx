import React, { useRef, useEffect } from 'react';

function WordsDisplay({ words, currentWordIndex, input }) {
  const wordsRef = useRef(null);

  useEffect(() => {
    if (wordsRef.current && currentWordIndex > 0) {
      const wordElements = wordsRef.current.childNodes;
      const currentWordElement = wordElements[currentWordIndex];
      
      if (currentWordElement) {
        currentWordElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [currentWordIndex]);

  const renderCurrentWord = (word, userInput) => {
    if (!userInput) {
      return <span>{word}</span>;
    }
    
    return Array.from(word).map((char, idx) => {
      if (idx >= userInput.length) {
        return <span key={idx}>{char}</span>;
      }
      
      if (char === userInput[idx]) {
        return <span key={idx} className="text-green-600">{char}</span>;
      }
    
      return <span key={idx} className="text-red-600 bg-red-200">{char}</span>;
    });
  };
  
  return (
    <div className="mb-6 p-6 bg-opacity-20 bg-white backdrop-blur-lg rounded-lg shadow-lg overflow-hidden max-h-48">
      <div 
        ref={wordsRef}
        className="flex flex-wrap font-mono text-xl leading-relaxed"
      >
        {words.map((word, index) => (
          <span 
            key={index} 
            className={`mr-2 mb-2 px-1 rounded ${
              index < currentWordIndex 
                ? 'text-green-600' 
                : index === currentWordIndex 
                  ? 'bg-gray-300 bg-opacity-50' 
                  : ''
            }`}
          >
            {index === currentWordIndex 
              ? renderCurrentWord(word, input)
              : word
            }
          </span>
        ))}
      </div>
    </div>
  );
}

export default WordsDisplay;