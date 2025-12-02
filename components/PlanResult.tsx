import React from 'react';
import { DailyPlan, Meal } from '../types';
import { Clock, Flame, ShoppingBag, ArrowRight } from 'lucide-react';

interface PlanResultProps {
  plan: DailyPlan;
  onOrder: () => void;
}

// Map keywords to high-quality Unsplash images
// Using verified IDs to prevent broken links
const IMAGE_MAP: Record<string, string> = {
  chicken: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
  fish: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
  beef: "https://images.unsplash.com/photo-1534939561126-855f86654015?auto=format&fit=crop&w=800&q=80",
  pork: "https://images.unsplash.com/photo-1624726175512-19b9baf00ca9?auto=format&fit=crop&w=800&q=80",
  salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  vegetable: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  rice: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
  pasta: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
  noodle: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
  fruit: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=800&q=80",
  oatmeal: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80",
  yogurt: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
  sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
  wrap: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
  tofu: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  default: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80"
};

const getFoodImage = (keyword: string) => {
  if (!keyword) return IMAGE_MAP['default'];
  
  const lowerKeyword = keyword.toLowerCase();
  
  // Direct match
  if (IMAGE_MAP[lowerKeyword]) return IMAGE_MAP[lowerKeyword];
  
  // Partial match search
  const foundKey = Object.keys(IMAGE_MAP).find(key => lowerKeyword.includes(key));
  if (foundKey) return IMAGE_MAP[foundKey];
  
  return IMAGE_MAP['default'];
}

const MealCard: React.FC<{ title: string; meal: Meal; color: string }> = ({ title, meal, color }) => (
  <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-100 flex gap-3 sm:gap-4 mb-4 hover:shadow-md transition-all group items-start">
    <div className="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
        <img 
        src={getFoodImage(meal.imageKeyword)} 
        alt={meal.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
            (e.target as HTMLImageElement).src = IMAGE_MAP['default'];
        }}
        />
    </div>
    
    <div className="flex-1 flex flex-col justify-between min-w-0 h-full">
      <div>
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wide ${color}`}>{title}</span>
            <h3 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight mt-0.5 truncate pr-1">
                {meal.name}
            </h3>
          </div>
          <span className="font-semibold text-slate-900 text-sm sm:text-lg whitespace-nowrap flex-shrink-0">
            HK${meal.price}
          </span>
        </div>
        
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {meal.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-4 mt-2">
        <div className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-slate-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
          <Flame size={10} className="text-orange-500" />
          {meal.calories} kcal
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
           <span>P: <span className="text-slate-600 font-medium">{meal.protein}</span></span>
           <span>C: <span className="text-slate-600 font-medium">{meal.carbs}</span></span>
        </div>
        <div className="sm:hidden text-[10px] text-slate-400">
           P:{meal.protein} • C:{meal.carbs}
        </div>
      </div>
    </div>
  </div>
);

const OrderSummaryCard: React.FC<{ plan: DailyPlan, onOrder: () => void, className?: string }> = ({ plan, onOrder, className = "" }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 ${className}`}>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h3>
        <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm text-slate-600">
                <span>Breakfast</span>
                <span>HK${plan.breakfast.price}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
                <span>Lunch</span>
                <span>HK${plan.lunch.price}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
                <span>Dinner</span>
                <span>HK${plan.dinner.price}</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-green-600">
                    HK${plan.breakfast.price + plan.lunch.price + plan.dinner.price}
                </span>
            </div>
        </div>
        <button 
            onClick={onOrder}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
        >
            Order All Meals <ArrowRight size={20} />
        </button>
        <p className="text-center text-xs text-slate-400 mt-3">
            Free delivery included with NutriGo Pass
        </p>
    </div>
);

const PlanResult: React.FC<PlanResultProps> = ({ plan, onOrder }) => {
  return (
    <div className="min-h-screen pt-20 pb-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 px-2">Your Daily Plan</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Analysis & Desktop Summary */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                <div className="bg-green-600 text-white p-6 rounded-3xl shadow-xl shadow-green-200 mb-0 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-white/20 p-1.5 rounded-lg"><Flame size={18} /></span>
                            <span className="font-medium text-green-50">AI Analysis</span>
                        </div>
                        <p className="opacity-95 text-sm sm:text-base leading-relaxed font-medium">{plan.analysis}</p>
                        <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold">
                            Total: {plan.totalCalories} kcal
                        </div>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                        <ShoppingBag size={150} />
                    </div>
                </div>

                {/* Show Order Card here only on Desktop */}
                <OrderSummaryCard plan={plan} onOrder={onOrder} className="hidden lg:block" />
            </div>

            {/* Right Column: Meal List */}
            <div className="lg:col-span-8">
                <div className="space-y-2">
                    <MealCard title="Breakfast" meal={plan.breakfast} color="text-orange-500" />
                    <MealCard title="Lunch" meal={plan.lunch} color="text-green-600" />
                    <MealCard title="Dinner" meal={plan.dinner} color="text-blue-600" />
                </div>

                {/* Show Order Card here only on Mobile */}
                <OrderSummaryCard plan={plan} onOrder={onOrder} className="lg:hidden mt-6" />
            </div>
        </div>

      </div>
    </div>
  );
};

export default PlanResult;