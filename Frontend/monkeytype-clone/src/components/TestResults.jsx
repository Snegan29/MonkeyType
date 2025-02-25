import React from 'react';

function TestResults({ wpm, accuracy, correctWords, incorrectWords, correctChars, incorrectChars, startTest }) {
  const totalChars = correctChars + incorrectChars;
  const charAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

  return (
    <div className="mb-8 p-6 bg-opacity-20 bg-white backdrop-blur-lg rounded-lg shadow-lg">
      <h2 className="text-2xl font-mono font-bold mb-4">Test Results</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-3xl font-bold">{wpm}</p>
          <p className="text-sm">WPM</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">{accuracy}%</p>
          <p className="text-sm">Word Accuracy</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">{charAccuracy}%</p>
          <p className="text-sm">Character Accuracy</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 bg-opacity-50 rounded p-3">
          <p className="text-sm font-medium mb-1">Words</p>
          <div className="flex justify-between">
            <div className="text-green-600">
              <span className="text-lg font-bold">{correctWords}</span>
              <span className="text-xs ml-1">correct</span>
            </div>
            <div className="text-red-600">
              <span className="text-lg font-bold">{incorrectWords}</span>
              <span className="text-xs ml-1">incorrect</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 bg-opacity-50 rounded p-3">
          <p className="text-sm font-medium mb-1">Characters</p>
          <div className="flex justify-between">
            <div className="text-green-600">
              <span className="text-lg font-bold">{correctChars}</span>
              <span className="text-xs ml-1">correct</span>
            </div>
            <div className="text-red-600">
              <span className="text-lg font-bold">{incorrectChars}</span>
              <span className="text-xs ml-1">incorrect</span>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={startTest}
        className="w-full py-2 bg-gray-800 text-white rounded font-mono hover:bg-gray-700 transition"
      >
        Restart Test
      </button>
    </div>
  );
}

export default TestResults;
