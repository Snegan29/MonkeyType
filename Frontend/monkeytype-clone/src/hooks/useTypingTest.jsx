import { useState, useEffect } from 'react';
import { generateWords } from '../utils/wordGenerator';

export function useTypingTest() {
  const [time, setTime] = useState(30);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(time);
  const [testComplete, setTestComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  
  useEffect(() => {
    setWords(generateWords(200));
  }, []);
  
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(interval);
      endTest();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);
  
  useEffect(() => {
    if (testComplete) {
      calculateStats();
    }
  }, [testComplete]);

  useEffect(() => {
    setTimeLeft(time);
  }, [time]);
  
  const startTest = () => {
    setIsActive(true);
    setTimeLeft(time);
    setCurrentWordIndex(0);
    setInput('');
    setCorrectChars(0);
    setIncorrectChars(0);
    setCorrectWords(0);
    setIncorrectWords(0);
    setTestComplete(false);
  };
  
  const endTest = () => {
    setIsActive(false);
    setTestComplete(true);
  };
  
  const calculateStats = () => {
    const timeInMinutes = time / 60;
    const calculatedWpm = Math.round((correctChars / 5) / timeInMinutes);
    setWpm(calculatedWpm);
    
    const totalAttemptedWords = correctWords + incorrectWords;
    const calculatedAccuracy = totalAttemptedWords > 0 
      ? Math.round((correctWords / totalAttemptedWords) * 100) 
      : 100;
    setAccuracy(calculatedAccuracy);
  };
  
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    
    if (!isActive && inputValue.length === 1) {
      startTest();
    }
    
    if (isActive || (!isActive && inputValue.length === 1)) {
      setInput(inputValue);
      
      if (inputValue.endsWith(' ')) {
        const typedWord = inputValue.trim();
        const currentWord = words[currentWordIndex];
        
        let wordCorrectChars = 0;
        let wordIncorrectChars = 0;
        
        for (let i = 0; i < typedWord.length; i++) {
          if (i < currentWord.length && typedWord[i] === currentWord[i]) {
            wordCorrectChars++;
          } else {
            wordIncorrectChars++;
          }
        }
        
        if (typedWord.length < currentWord.length) {
          wordIncorrectChars += currentWord.length - typedWord.length;
        }
        
        setCorrectChars(prev => prev + wordCorrectChars);
        setIncorrectChars(prev => prev + wordIncorrectChars);
        
        if (typedWord === currentWord) {
          setCorrectWords(prev => prev + 1);
        } else {
          setIncorrectWords(prev => prev + 1);
        }
        
        setCurrentWordIndex(prev => prev + 1);
        setInput('');
      }
    }
  };

  return {
    time,
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
    startTest,
    endTest,
    handleInputChange,
    setTime,
  };
}