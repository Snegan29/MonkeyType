import React, { useState, useEffect } from 'react';
import Header from './Header';
import WordsDisplay from './WordsDisplay';
import TypingInput from './TypingInput';
import TestResults from './TestResults';
import Instructions from './Instructions';
import { useTypingTest } from '../hooks/useTypingTest';
import { themeClasses } from '../utils/themes';

function TypingTest() {
  const [theme, setTheme] = useState('default');
  const {
    words,
    currentWordIndex,
    input,
    correctChars,
    incorrectChars,
    correctWords,
    incorrectWords,
    isActive,
    timeLeft,
    testComplete,
    accuracy,
    wpm,
    time,
    startTest,
    handleInputChange,
    setTime,
  } = useTypingTest();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${themeClasses[theme]}`}>
      <div className="container max-w-3xl mx-auto">
        <Header 
          time={time}
          handleTimeChange={setTime}
          theme={theme}
          handleThemeChange={handleThemeChange}
          isActive={isActive}
        />
        
        {testComplete && (
          <TestResults 
            wpm={wpm}
            accuracy={accuracy}
            correctWords={correctWords}
            incorrectWords={incorrectWords}
            correctChars={correctChars}
            incorrectChars={incorrectChars}
            startTest={startTest}
          />
        )}
        
        {isActive && (
          <div className="mb-4 text-center">
            <p className="text-2xl font-mono font-bold">{timeLeft}s</p>
          </div>
        )}
        
        {!testComplete && (
          <WordsDisplay 
            words={words}
            currentWordIndex={currentWordIndex}
            input={input}
          />
        )}
        
        {!testComplete && (
          <TypingInput 
            input={input}
            handleInputChange={handleInputChange}
            isActive={isActive}
            testComplete={testComplete}
            startTest={startTest}
          />
        )}
        
        <Instructions />
      </div>
    </div>
  );
}

export default TypingTest;