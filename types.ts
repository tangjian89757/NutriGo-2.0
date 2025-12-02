export interface UserProfile {
  age: string;
  occupation: string;
  goal: 'fat_loss' | 'muscle_gain' | 'maintenance' | 'recovery';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  dietaryRestrictions: string;
}

export interface Meal {
  name: string;
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
  description: string;
  price: number;
  imageKeyword: string;
}

export interface DailyPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  totalCalories: number;
  analysis: string;
}

export type ViewState = 'home' | 'onboarding' | 'plan' | 'menu' | 'profile';

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  calories: number;
  image: string;
  tags: string[];
}