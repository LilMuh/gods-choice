import React, { useState } from 'react';

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

  const handleDelete = (index) => {
    if (options.length <= 2) {
      // 只剩2个或更少时，清空内容
      updateOption(index, '');
    } else {
      // 超过2个时，删除整行
      removeOption(index);
    }
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
      setIsRevealing(false);
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
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
                  className="w-full px-6 py-4 pr-14 bg-white backdrop-blur-xl border-2 border-[#E4DCCF] rounded-3xl text-[#576F72] placeholder-[#7D9D9C]/50 focus:outline-none focus:border-[#7D9D9C] focus:bg-white transition-all font-light shadow-sm hover:shadow-md hover:border-[#7D9D9C]/60"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(index);
                    }}
                    className="w-8 h-8 flex items-center justify-center text-[#7D9D9C] hover:text-red-500 hover:bg-red-50 rounded-full transition-all text-xl font-bold"
                    title={options.length <= 2 ? "Clear input" : "Remove option"}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add button */}
        <button
          onClick={addOption}
          className="w-full mb-6 py-4 border-2 border-dashed border-[#E4DCCF] rounded-3xl text-[#7D9D9C] hover:border-[#7D9D9C] hover:bg-white transition-all text-sm font-light tracking-wide flex items-center justify-center gap-2 group"
        >
          <span className="text-xl group-hover:rotate-90 transition-transform duration-300">+</span>
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
            <svg className={`w-5 h-5 ${isRevealing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
            </svg>
            {isRevealing ? 'REVEALING...' : 'REVEAL THE CHOICE'}
          </span>
        </button>

        {/* Result */}
        {result && !isRevealing && (
          <div className={`mt-12 text-center p-10 rounded-3xl border-2 shadow-lg relative overflow-hidden ${
            options.filter(opt => opt.trim() !== '').length < 2
              ? 'bg-red-50 border-red-200'
              : 'bg-white border-[#E4DCCF]'
          }`}>
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 ${
              options.filter(opt => opt.trim() !== '').length < 2
                ? 'bg-red-400'
                : 'bg-[#7D9D9C]'
            }`}></div>
            <div className="space-y-4 animate-fade-in">
              <div className={`text-xs font-medium tracking-widest uppercase ${
                options.filter(opt => opt.trim() !== '').length < 2
                  ? 'text-red-500'
                  : 'text-[#7D9D9C]'
              }`}>
                {options.filter(opt => opt.trim() !== '').length < 2 
                  ? '⚠ Warning ⚠' 
                  : '✦ The Chosen Path ✦'}
              </div>
              <div className={`text-4xl font-light tracking-wide leading-relaxed ${
                options.filter(opt => opt.trim() !== '').length < 2
                  ? 'text-red-600'
                  : 'text-[#576F72]'
              }`}>
                {result}
              </div>
            </div>
          </div>
        )}
        
        {isRevealing && (
          <div className="mt-12 text-center p-10 bg-white rounded-3xl border-2 border-[#E4DCCF] shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#7D9D9C]"></div>
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
          </div>
        )}
      </div>

      {/* Contact buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3 z-20">
        <a
          href="https://github.com/LilMuh"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 bg-white border-2 border-[#E4DCCF] rounded-full flex items-center justify-center hover:border-[#7D9D9C] hover:bg-[#F0EBE3] transition-all shadow-lg hover:shadow-xl group"
          title="GitHub"
        >
          <svg className="w-5 h-5 text-[#576F72] group-hover:text-[#7D9D9C] transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/likun-huang-003413286/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 bg-white border-2 border-[#E4DCCF] rounded-full flex items-center justify-center hover:border-[#7D9D9C] hover:bg-[#F0EBE3] transition-all shadow-lg hover:shadow-xl group"
          title="LinkedIn"
        >
          <svg className="w-5 h-5 text-[#576F72] group-hover:text-[#7D9D9C] transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
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