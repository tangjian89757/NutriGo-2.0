
import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { MenuItem } from '../types';

const MENU_ITEMS: MenuItem[] = [
  { 
    id: 1, 
    name: "Quinoa Chicken Bowl", 
    category: "High Protein", 
    price: 58, 
    calories: 450, 
    tags: ["GF", "High Protein"], 
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 2, 
    name: "Salmon Avocado Salad", 
    category: "Low Carb", 
    price: 68, 
    calories: 380, 
    tags: ["Keto", "Omega-3"], 
    image: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 3, 
    name: "Tofu Vegetable Stir-fry", 
    category: "Vegan", 
    price: 45, 
    calories: 320, 
    tags: ["Vegan", "Light"], 
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 4, 
    name: "Beef & Broccoli Rice", 
    category: "Balanced", 
    price: 62, 
    calories: 550, 
    tags: ["Iron", "Filling"], 
    image: "https://images.unsplash.com/photo-1534939561126-855f86654015?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 5, 
    name: "Greek Yogurt Parfait", 
    category: "Breakfast", 
    price: 35, 
    calories: 250, 
    tags: ["Probiotic", "Sweet"], 
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80" 
  },
];

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedItems, setAddedItems] = useState<number[]>([]);

  const filteredItems = selectedCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === selectedCategory || item.tags.includes(selectedCategory));

  const handleAdd = (id: number) => {
    setAddedItems(prev => [...prev, id]);
    // Reset after animation
    setTimeout(() => {
        setAddedItems(prev => prev.filter(item => item !== id));
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 relative overflow-hidden bg-slate-50">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=2070&q=80" 
          alt="Fresh healthy ingredients flatlay" 
          className="w-full h-full object-cover"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-slate-50/95 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <h2 className="text-3xl font-bold text-slate-900">Explore Menu</h2>
            <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
            {['All', 'High Protein', 'Low Carb', 'Vegan', 'Breakfast'].map((cat, idx) => (
                <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm active:scale-95 ${
                        selectedCategory === cat 
                        ? 'bg-green-600 text-white shadow-green-200' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                {cat}
                </button>
            ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <div 
                key={item.id} 
                className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
                style={{ animationDelay: `${index * 50}ms` }}
            >
              <img 
                src={item.image}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover bg-slate-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";
                }}
              />
              <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                <div>
                  <div className="flex gap-2 mb-1 flex-wrap">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-tight truncate pr-2" title={item.name}>{item.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.calories} kcal</p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-bold text-slate-900">HK${item.price}</span>
                  <button 
                    onClick={() => handleAdd(item.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90 ${
                        addedItems.includes(item.id) 
                        ? 'bg-green-500 text-white' 
                        : 'bg-slate-900 text-white hover:bg-green-600'
                    }`}
                  >
                    {addedItems.includes(item.id) ? <Check size={18} /> : <Plus size={18} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
