
import React, { useState } from 'react';
import { CreditCard, Settings, ChevronRight, Crown, Check, Shield, Zap, Star } from 'lucide-react';

const MEMBERSHIP_PLANS = [
  {
    id: 'monthly',
    title: 'Monthly Pass',
    price: '50',
    period: '/mo',
    discount: '10%',
    features: ['10% Off All Meals', 'Free Delivery', 'Standard Support'],
    color: 'from-slate-700 to-slate-900',
    accent: 'bg-slate-500',
    recommended: false
  },
  {
    id: 'quarterly',
    title: 'Quarterly Pass',
    price: '150',
    period: '/qtr',
    discount: '20%',
    features: ['20% Off All Meals', 'Free Delivery', 'Priority Support', 'Weekly Adjustments'],
    color: 'from-emerald-600 to-teal-800',
    accent: 'bg-emerald-500',
    recommended: true
  },
  {
    id: 'annual',
    title: 'Annual Pass',
    price: '600',
    period: '/yr',
    discount: '30%',
    features: ['30% Off All Meals', 'Free Delivery', '1-on-1 Nutritionist', 'Exclusive Menu Access'],
    color: 'from-violet-600 to-indigo-900',
    accent: 'bg-violet-500',
    recommended: false
  }
];

const Profile: React.FC = () => {
  const [activePlanId, setActivePlanId] = useState('quarterly');

  // Find index for logic
  const activeIndex = MEMBERSHIP_PLANS.findIndex(p => p.id === activePlanId);

  return (
    <div className="min-h-screen pt-20 pb-24 relative overflow-hidden bg-slate-50">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2070&q=80" 
          alt="Active lifestyle fitness background" 
          className="w-full h-full object-cover"
        />
        {/* Stronger Overlay for content contrast */}
        <div className="absolute inset-0 bg-slate-50/90 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        {/* User Header */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/50 mb-8 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl border-4 border-white shadow-sm flex-shrink-0">
            👱🏻‍♂️
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Alex Chen</h2>
            <p className="text-sm text-slate-500 font-medium flex items-center gap-1">
              Goal: Muscle Gain <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
            </p>
          </div>
        </div>

        <div className="mb-12">
            <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-900">Membership Plans</h3>
                <p className="text-slate-500 text-sm">Choose the plan that fits your lifestyle</p>
            </div>
            
            {/* 3D Card Stack Stage */}
            <div className="relative h-[440px] w-full max-w-[340px] mx-auto perspective-[1000px] mb-8">
                {MEMBERSHIP_PLANS.map((plan, index) => {
                    const offset = index - activeIndex; 
                    const isActive = index === activeIndex;
                    
                    // Determine styles based on position relative to active card
                    let style: React.CSSProperties = {};
                    
                    if (isActive) {
                        // Center Active Card
                        style = {
                            transform: 'translateX(0) scale(1) translateZ(0)',
                            zIndex: 30,
                            opacity: 1,
                            filter: 'drop-shadow(0 20px 25px rgba(0,0,0,0.15))'
                        };
                    } else if (offset < 0) {
                        // Card is "Before" (Left/Back) - simulating a deck fan
                         style = {
                            transform: `translateX(${offset * 35 - 25}px) scale(${1 - Math.abs(offset) * 0.08}) translateZ(${-40 * Math.abs(offset)}px) rotateY(4deg)`,
                            zIndex: 20 + offset, 
                            opacity: 1, // No transparency
                            filter: 'brightness(0.9)' // Just slight dimming for depth
                        };
                    } else {
                        // Card is "After" (Right/Back)
                         style = {
                            transform: `translateX(${offset * 35 + 25}px) scale(${1 - Math.abs(offset) * 0.08}) translateZ(${-40 * Math.abs(offset)}px) rotateY(-4deg)`,
                            zIndex: 20 - offset,
                            opacity: 1, // No transparency
                            filter: 'brightness(0.9)'
                        };
                    }

                    return (
                        <div 
                            key={plan.id}
                            onClick={() => setActivePlanId(plan.id)}
                            className="absolute top-0 left-0 w-full h-full transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) cursor-pointer origin-bottom"
                            style={style}
                        >
                            <div className={`w-full h-full bg-gradient-to-br ${plan.color} text-white rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col border border-white/20 ring-1 ring-black/5`}>
                                
                                {/* Recommended Badge */}
                                {plan.recommended && (
                                    <div className="absolute top-0 right-0 z-20">
                                        <div className="bg-yellow-400 text-slate-900 text-[10px] font-extrabold px-3 py-1.5 rounded-bl-xl shadow-lg flex items-center gap-1">
                                            <Star size={10} className="fill-slate-900" /> POPULAR
                                        </div>
                                    </div>
                                )}

                                {/* Background Decor */}
                                <div className="absolute -top-10 -left-10 text-white/5 transform -rotate-12 pointer-events-none">
                                    <Crown size={200} />
                                </div>
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                                
                                {/* Card Content */}
                                <div className="p-7 flex flex-col h-full relative z-10">
                                    
                                    <div className="mb-2">
                                        <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-1">NutriGo Pass</p>
                                        <h3 className="text-3xl font-bold tracking-tight text-white">{plan.title}</h3>
                                    </div>

                                    <div className="mb-6 flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold tracking-tighter">HK${plan.price}</span>
                                        <span className="text-white/60 font-medium">{plan.period}</span>
                                    </div>

                                    <div className="w-full h-px bg-white/20 mb-6"></div>

                                    <ul className="space-y-4 flex-grow">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm font-medium text-white/90">
                                                <div className="bg-white/20 p-1 rounded-full flex-shrink-0 mt-0.5 shadow-sm">
                                                    <Check size={10} strokeWidth={4} />
                                                </div> 
                                                <span className="leading-snug">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto pt-6">
                                        <button className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors active:scale-95 transform">
                                            Subscribe Now <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Control Tabs Below Cards */}
            <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl flex relative z-40 max-w-sm mx-auto shadow-sm border border-white/50">
                {MEMBERSHIP_PLANS.map((plan) => {
                    const isSelected = activePlanId === plan.id;
                    return (
                        <button
                            key={plan.id}
                            onClick={() => setActivePlanId(plan.id)}
                            className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 relative z-10 ${
                                isSelected 
                                ? 'text-slate-900' 
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {isSelected && (
                                <div className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10 animate-in fade-in zoom-in duration-200 border border-slate-100" />
                            )}
                            {plan.title.split(' ')[0]}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Settings List */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 overflow-hidden shadow-sm">
            {[
                { icon: CreditCard, label: "Payment Methods", desc: "Visa ending in 4242" },
                { icon: Shield, label: "Privacy & Security", desc: "Password, 2FA" },
                { icon: Settings, label: "App Settings", desc: "Notifications, Language" },
                { icon: Zap, label: "Help & Support", desc: "FAQ, Contact Us" },
            ].map((item, idx) => (
                <button key={idx} className="w-full p-5 flex items-center justify-between hover:bg-white/50 border-b border-slate-100 last:border-0 transition-colors group text-left">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-green-50 group-hover:text-green-600 transition-colors border border-slate-100 group-hover:border-green-100">
                            <item.icon size={20} />
                        </div>
                        <div>
                            <span className="font-bold text-slate-900 block">{item.label}</span>
                            <span className="text-xs text-slate-400 font-medium">{item.desc}</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:shadow-sm group-hover:text-green-600 transition-all">
                        <ChevronRight size={18} />
                    </div>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
