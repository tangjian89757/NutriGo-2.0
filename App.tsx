
import React, { useState } from 'react';
import { ViewState, UserProfile, DailyPlan } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AIOnboarding from './components/AIOnboarding';
import AILoading from './components/AILoading';
import PlanResult from './components/PlanResult';
import Menu from './components/Menu';
import Profile from './components/Profile';
import { generateMealPlan } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<DailyPlan | null>(null);

  const handleAIStart = () => {
    setCurrentView('onboarding');
  };

  const handleProfileSubmit = async (profile: UserProfile) => {
    setIsLoading(true);
    // Wait a minimum time to show the immersive loading screen (UX)
    // even if the API is fast.
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      const [plan] = await Promise.all([
        generateMealPlan(profile),
        minLoadingTime
      ]);
      setGeneratedPlan(plan);
      setCurrentView('plan');
    } catch (error) {
      console.error("Failed to generate plan", error);
      alert("Failed to generate meal plan. Please check console or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrder = () => {
    alert("Order placed successfully! In a real app, this would go to payment.");
    setCurrentView('home');
  };

  const renderView = () => {
    if (isLoading) return <AILoading />;

    switch (currentView) {
      case 'home':
        return <Hero onStart={handleAIStart} />;
      case 'onboarding':
        return <AIOnboarding onSubmit={handleProfileSubmit} isLoading={isLoading} />;
      case 'plan':
        return generatedPlan ? <PlanResult plan={generatedPlan} onOrder={handleOrder} /> : <Hero onStart={handleAIStart} />;
      case 'menu':
        return <Menu />;
      case 'profile':
        return <Profile />;
      default:
        return <Hero onStart={handleAIStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <Navigation currentView={currentView} setView={setCurrentView} />
      <main className="animate-in fade-in duration-500">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
