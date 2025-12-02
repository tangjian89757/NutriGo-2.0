import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", showText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto flex-shrink-0"
        aria-label="NutriGo Logo"
      >
        {/* Leaf Shape - Solid Green Fill (#22c55e is tailwind green-500) */}
        <path
          d="M50 5 C 15 35 5 65 50 95 C 95 65 85 35 50 5 Z"
          fill="#22c55e" 
          stroke="#16a34a"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Stem */}
        <path 
          d="M50 95 L50 98" 
          stroke="#16a34a" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />

        {/* Lightning Bolt - White */}
        <path
          d="M56 28 L38 55 H52 L44 78 L64 48 H52 L56 28 Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.15))' }}
        />
      </svg>
      {showText && (
        <div className="flex flex-col justify-center">
          <span className="text-xl font-extrabold tracking-tight leading-none text-slate-800 whitespace-nowrap">
            Nutri<span className="text-green-600">Go</span>
          </span>
        </div>
      )}
    </div>
  );
};