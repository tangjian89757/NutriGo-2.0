import React from 'react';
import { Home, Calendar, Utensils, User, Leaf } from 'lucide-react';
import { ViewState } from '../types';
import { Logo } from './Logo';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'onboarding', icon: Leaf, label: 'AI Plan' },
    { id: 'menu', icon: Utensils, label: 'Menu' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Mobile Top Header - Visible ONLY on Mobile */}
      <header className="md:hidden fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 px-6 py-3 flex items-center justify-center">
        <div onClick={() => setView('home')} className="cursor-pointer">
          <Logo className="h-8" />
        </div>
      </header>

      {/* Desktop Header - Visible ONLY on Desktop */}
      <nav className="hidden md:flex fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 px-8 py-4 justify-between items-center">
        <div className="cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setView('home')}>
          <Logo className="h-10" />
        </div>
        <div className="flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                currentView === item.id 
                  ? 'text-green-700 bg-green-50' 
                  : 'text-slate-500 hover:text-green-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === 'onboarding' && currentView === 'plan');
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewState)}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${
                  isActive ? 'text-green-600' : 'text-slate-400'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
