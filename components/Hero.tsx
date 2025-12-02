
import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, MapPin } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [showNotification, setShowNotification] = useState(false);

  // Simulate a delayed entry for the "Live Activity" notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative pt-20 pb-0 md:pt-32 md:pb-24 overflow-hidden min-h-screen flex items-center bg-slate-50">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1753727470818-078cff2ea353?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGVhdCUyMGZvb2R8ZW58MHx8MHx8fDI%3D" 
          alt="Office professionals enjoying healthy food together" 
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay: Stronger on left for text readability, transparent on right for faces */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent backdrop-blur-[1px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl animate-in slide-in-from-left duration-700 fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100/90 backdrop-blur-sm text-green-700 text-xs font-semibold mb-6 border border-green-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                No.1 AI Nutrition App in HK
                </div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-12 md:mb-6 drop-shadow-sm">
                Smart Eating for <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
                    Busy Lives
                </span>
                </h1>
                
                {/* Optimized Text Block: Hidden on Mobile, Justified on Desktop with Equal Lines */}
                <p className="hidden md:block text-base text-slate-600 mb-8 font-normal max-w-[580px] text-justify [text-align-last:justify] leading-relaxed tracking-wide">
                  NutriGo combines AI-powered meal planning with direct delivery. Designed for Hong Kong's students and professionals who want to eat healthy without the hassle.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={onStart}
                    className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg shadow-green-200/50 transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5 active:translate-y-0"
                >
                    Get My Plan
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-white transition-all shadow-sm">
                    View Menu
                </button>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-700 font-semibold">
                <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/50">
                    <CheckCircle size={14} className="text-green-600" />
                    <span>AI Personalized</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/50">
                    <CheckCircle size={14} className="text-green-600" />
                    <span>Verified Nutrition</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/50">
                    <CheckCircle size={14} className="text-green-600" />
                    <span>Flexible Subs</span>
                </div>
                </div>
            </div>

            {/* Right Side: Clean to show background images, plus a subtle notification */}
            <div className="hidden lg:block h-full relative pointer-events-none">
               {/* Live Activity Notification - Bottom Right, Non-intrusive */}
               <div 
                 className={`absolute bottom-10 right-0 max-w-xs transition-all duration-700 transform ${showNotification ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
               >
                 <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                       <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80" alt="Food" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-900">Just Ordered in NutriGo</p>
                       <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <MapPin size={10} className="text-green-600" /> 
                          <span>Jason · Quinoa Chicken Bowl</span>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
