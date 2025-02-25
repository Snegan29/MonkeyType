import React from 'react';
import { themes } from '../utils/themes';

function Header({ time, handleTimeChange, theme, handleThemeChange, isActive }) {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-mono font-bold">MonkeyType Clone</h1>
      
      <div className="flex gap-4">
        <div className="flex gap-2">
          {[15, 30, 60].map((t) => (
            <button
              key={t}
              onClick={() => handleTimeChange(t)}
              className={`px-3 py-1 rounded font-mono text-sm ${time === t ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
              disabled={isActive}
            >
              {t}s
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {Object.keys(themes).map((t) => (
            <button
              key={t}
              onClick={() => handleThemeChange(t)}
              className={`w-6 h-6 rounded-full border ${theme === t ? 'border-2 border-gray-800' : 'border-gray-400'}`}
              style={{ backgroundColor: themes[t].color }}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;