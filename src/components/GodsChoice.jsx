import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function GodsChoice() {
  const [options, setOptions] = useState(['', '']);
  const [result, setResult] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const revealChoice = () => {
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) {
      setResult('At least two paths must be presented.');
      return;
    }

    setIsRevealing(true);
    setResult('');

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * validOptions.length);
      setResult(validOptions[randomIndex]);
      setIsRevealing(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 text-indigo-400">
            <Sparkles size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-light text-slate-700 mb-3 tracking-wide">
            God's Choice
          </h1>
          <p className="text-slate-500 font-light text-sm leading-relaxed max-w-md mx-auto">
            Helping you to find out hints for anything you are unsure about.<br />
            God always knows the right one.
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {options.map((option, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Path ${index + 1}`}
                className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-300 focus:bg-white transition-all font-light shadow-sm"
              />
              {options.length > 2 && (
                <button
                  onClick={() => removeOption(index)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xl"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addOption}
          className="w-full mb-6 py-3 border border-slate-200 rounded-2xl text-slate-600 hover:border-indigo-200 hover:bg-white/50 transition-colors text-sm font-light tracking-wide"
        >
          + Add Another Path
        </button>

        <button
          onClick={revealChoice}
          disabled={isRevealing}
          className="w-full py-5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-2xl hover:from-indigo-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-light tracking-widest text-sm shadow-lg shadow-indigo-200/50"
        >
          {isRevealing ? 'REVEALING...' : 'REVEAL THE CHOICE'}
        </button>

        {(result || isRevealing) && (
          <div className="mt-12 text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-indigo-100 shadow-lg">
            {isRevealing ? (
              <div className="text-slate-500 font-light italic animate-pulse">
                Seeking divine guidance...
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-indigo-400 text-sm font-light tracking-wider">
                  THE CHOSEN PATH
                </div>
                <div className="text-3xl text-slate-700 font-light tracking-wide">
                  {result}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}