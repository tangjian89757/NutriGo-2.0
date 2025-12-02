
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Sparkles, Brain, Utensils, Wallet, CheckCircle, Activity, Target, User } from 'lucide-react';

interface AIOnboardingProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const AIOnboarding: React.FC<AIOnboardingProps> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    occupation: '',
    goal: 'fat_loss',
    activityLevel: 'moderate',
    dietaryRestrictions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen pt-20 pb-24 relative overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=2070&q=80" 
          alt="Healthy food planning background" 
          className="w-full h-full object-cover"
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-slate-50/95 backdrop-blur-[3px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-4 sm:pt-10">
          
          {/* Left Column: Context & Value Props (Visible on Desktop) */}
          <div className="hidden lg:block lg:col-span-5 space-y-8 sticky top-24 animate-in slide-in-from-left duration-700">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-4 border border-green-200">
                  <Sparkles size={14} /> AI-Powered Personalization
               </div>
              <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Let's Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">Perfect Meal Plan</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                Tell us a bit about yourself. Our AI nutritionist will analyze your profile to calculate your exact macro needs and curate affordable, local meal options.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Brain className="text-green-500" size={20} />
                Why use NutriGo AI?
              </h3>
              
              <div className="space-y-4">
                {[
                    { icon: Utensils, color: "text-blue-600", bg: "bg-blue-50", title: "Tailored to HK Tastes", desc: "We recommend local favorites from Cha Chaan Tengs to healthy bowls." },
                    { icon: Wallet, color: "text-orange-600", bg: "bg-orange-50", title: "Budget Conscious", desc: "Plans designed for student and young professional budgets." },
                    { icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-50", title: "Scientific Macros", desc: "Precise calorie, protein, and carb calculations for your goals." }
                ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 group cursor-default">
                        <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0 ${item.color} border border-white shadow-sm group-hover:scale-110 transition-transform`}>
                            <item.icon size={20} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 md:p-10 animate-in slide-in-from-right duration-700">
              
              <div className="mb-8 lg:hidden">
                 <h2 className="text-2xl font-bold text-slate-900">Build Your Profile</h2>
                 <p className="text-slate-500 text-sm mt-1">AI-powered nutrition planning</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Basic Info Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <User size={16} className="text-green-500" /> Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all bg-slate-50 group-hover:bg-white"
                      placeholder="e.g. 22"
                      value={profile.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Wallet size={16} className="text-green-500" /> Occupation
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all bg-slate-50 group-hover:bg-white"
                      placeholder="e.g. Student"
                      value={profile.occupation}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Health Goal - Card Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Target size={16} className="text-green-500" /> Health Goal
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['fat_loss', 'muscle_gain', 'maintenance', 'recovery'] as const).map((g) => {
                      const isSelected = profile.goal === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setProfile(p => ({ ...p, goal: g }))}
                          className={`relative py-4 px-4 rounded-2xl text-sm font-bold border-2 transition-all duration-200 flex items-center justify-center gap-2 group ${
                            isSelected 
                              ? 'bg-green-50 border-green-500 text-green-700 shadow-md scale-[1.02]' 
                              : 'bg-white border-slate-100 text-slate-500 hover:border-green-200 hover:text-green-600 hover:shadow-sm'
                          }`}
                        >
                          {isSelected && <CheckCircle size={16} className="text-green-600 absolute left-3 top-1/2 -translate-y-1/2" />}
                          {g.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Activity Level - Slider/Select Visual */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Activity size={16} className="text-green-500" /> Activity Level
                  </label>
                  <div className="relative">
                    <select
                      name="activityLevel"
                      className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none bg-slate-50 focus:bg-white appearance-none cursor-pointer font-medium text-slate-700"
                      value={profile.activityLevel}
                      onChange={handleChange}
                    >
                      <option value="sedentary">Sedentary (Office/Study)</option>
                      <option value="light">Light Active (1-2 days/week)</option>
                      <option value="moderate">Moderate (3-5 days/week)</option>
                      <option value="active">Very Active (Daily exercise)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500 bg-transparent">
                      <div className="bg-slate-200 rounded-full p-1">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dietary Restrictions */}
                <div className="space-y-2 group">
                  <label className="text-sm font-bold text-slate-700">Dietary Restrictions (Optional)</label>
                  <input
                    type="text"
                    name="dietaryRestrictions"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all bg-slate-50 group-hover:bg-white"
                    placeholder="e.g. No seafood, Vegan, Nut allergy"
                    value={profile.dietaryRestrictions}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-slate-300/50 transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Generate Meal Plan <Sparkles size={20} className="text-yellow-400" />
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4">
                    By clicking generate, you agree to our Terms of Service.
                  </p>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AIOnboarding;
