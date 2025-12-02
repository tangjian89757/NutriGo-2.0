
import React, { useEffect, useState } from 'react';
import { Brain, Search, Database, Sparkles, Loader2 } from 'lucide-react';

const AILoading: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { text: "Analyzing your metabolic profile...", icon: Brain, color: "text-purple-500" },
    { text: "Scanning Hong Kong local food database...", icon: Database, color: "text-blue-500" },
    { text: "Calculating optimal macro split...", icon: Loader2, color: "text-orange-500" },
    { text: "Curating your perfect menu...", icon: Sparkles, color: "text-green-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200); // Change text every 1.2 seconds

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = steps[step].icon;

  return (
    <div className="fixed inset-0 z-50 bg-slate-50/95 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="relative mb-12">
        {/* Pulsing Background Circles */}
        <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-20 animate-pulse scale-150"></div>
        <div className="absolute inset-0 bg-teal-200 rounded-full blur-2xl opacity-20 animate-bounce delay-75 scale-125"></div>
        
        {/* Central Icon Container */}
        <div className="relative w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-slate-100">
          <CurrentIcon size={64} className={`transition-all duration-500 ${steps[step].color} animate-[spin_3s_linear_infinite]`} strokeWidth={1.5} />
          
          {/* Orbiting Particles */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 bg-green-500 rounded-full blur-[1px]"></div>
          </div>
          <div className="absolute inset-0 animate-[spin_6s_linear_infinite_reverse]">
            <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-2 w-2 h-2 bg-blue-500 rounded-full blur-[1px]"></div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center transition-all duration-300 min-h-[32px]">
        {steps[step].text}
      </h2>
      <p className="text-slate-400 text-sm font-medium animate-pulse">
        Powered by Gemini 2.5
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-1.5 bg-slate-200 rounded-full mt-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-teal-500 transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AILoading;
