import React, { useState } from 'react';
import { Sparkles, Plus, X } from 'lucide-react';

export default function GodsChoice() {
  const [options, setOptions] = useState(['', '']);
  const [result, setResult] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);

  const placeholders = [
    'Go to the gym',
    'Order pizza',
    'Watch a movie',
    'Read a book',
    'Call a friend',
    'Take a nap',
    'Play games',
    'Go for a walk'
  ];

  const getPlaceholder = (index) => {
    return placeholders[index % placeholders.length] || `Option ${index + 1}`;
  };

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
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F0EBE3] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#E4DCCF]/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7D9D9C]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#7D9D9C] to-[#576F72] rounded-2xl mb-6 shadow-lg shadow-[#7D9D9C]/30">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Sun rays - representing divine light */}
              <circle cx="16" cy="16" r="3" stroke="white" strokeWidth="2" fill="none" />
              <line x1="16" y1="4" x2="16" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="24" x2="16" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="4" y1="16" x2="8" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="16" x2="28" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="8" x2="10.5" y2="10.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="21.5" y1="21.5" x2="24" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="8" x2="21.5" y2="10.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="10.5" y1="21.5" x2="8" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-5xl font-extralight text-[#576F72] mb-4 tracking-tight">
            God's Choice
          </h1>
          <p className="text-[#7D9D9C] font-light text-sm leading-relaxed max-w-sm mx-auto">
            Helping you find hints for anything you're unsure about.
            <br />
            <span className="text-[#576F72]">God always knows the right one.</span>
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {options.map((option, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-[#7D9D9C]/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
              <div className="relative">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={getPlaceholder(index)}
                  className="w-full px-6 py-4 bg-white backdrop-blur-xl border-2 border-[#E4DCCF] rounded-3xl text-[#576F72] placeholder-[#7D9D9C]/50 focus:outline-none focus:border-[#7D9D9C] focus:bg-white transition-all font-light shadow-sm hover:shadow-md hover:border-[#7D9D9C]/60"
                />
                {options.length > 2 && (
                  <button
                    onClick={() => removeOption(index)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add button */}
        <button
          onClick={addOption}
          className="w-full mb-6 py-4 border-2 border-dashed border-[#E4DCCF] rounded-3xl text-[#7D9D9C] hover:border-[#7D9D9C] hover:bg-white transition-all text-sm font-light tracking-wide flex items-center justify-center gap-2 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Add Another Path
        </button>

        {/* Reveal button */}
        <button
          onClick={revealChoice}
          disabled={isRevealing}
          className="w-full py-6 bg-[#576F72] text-white rounded-3xl hover:bg-[#7D9D9C] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-light tracking-widest text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transform duration-200 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
          <span className="relative flex items-center justify-center gap-2">
            <Sparkles size={18} className={isRevealing ? 'animate-spin' : ''} />
            {isRevealing ? 'REVEALING...' : 'REVEAL THE CHOICE'}
          </span>
        </button>

        {/* Result */}
        {(result || isRevealing) && (
          <div className="mt-12 text-center p-10 bg-white rounded-3xl border-2 border-[#E4DCCF] shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#7D9D9C]"></div>
            {isRevealing ? (
              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-[#7D9D9C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-[#7D9D9C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-[#576F72] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <div className="text-[#576F72] font-light italic">
                  Seeking divine guidance...
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="text-[#7D9D9C] text-xs font-medium tracking-widest uppercase">
                  ✦ The Chosen Path ✦
                </div>
                <div className="text-4xl text-[#576F72] font-light tracking-wide leading-relaxed">
                  {result}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}