import React, { useRef, useEffect } from 'react';

function TypingInput({ input, handleInputChange, isActive, testComplete, startTest }) {
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);
  
  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        className="w-full p-4 font-mono text-xl rounded-lg shadow-lg bg-white bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder={isActive ? '' : 'Type to start...'}
        disabled={testComplete}
      />
      {!isActive && !testComplete && (
        <button
          onClick={startTest}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded font-mono hover:bg-gray-700 transition"
        >
          Start Test
        </button>
      )}
    </div>
  );
}

export default TypingInput;