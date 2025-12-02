import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, DailyPlan } from "../types";

const mealSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Name of the dish" },
    calories: { type: Type.NUMBER, description: "Calorie count" },
    protein: { type: Type.STRING, description: "Protein content in grams (e.g., '25g')" },
    carbs: { type: Type.STRING, description: "Carb content in grams" },
    fats: { type: Type.STRING, description: "Fat content in grams" },
    description: { type: Type.STRING, description: "Short appetizing description" },
    price: { type: Type.NUMBER, description: "Price in HKD (30-90 range)" },
    imageKeyword: { type: Type.STRING, description: "Single keyword for image search. Choose strictly from: 'chicken', 'fish', 'beef', 'pork', 'salad', 'vegetable', 'rice', 'pasta', 'noodle', 'fruit', 'oatmeal', 'yogurt', 'soup', 'sandwich', 'wrap', 'tofu'" }
  },
  required: ["name", "calories", "protein", "carbs", "fats", "description", "price", "imageKeyword"]
};

const planSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    breakfast: mealSchema,
    lunch: mealSchema,
    dinner: mealSchema,
    totalCalories: { type: Type.NUMBER },
    analysis: { type: Type.STRING, description: "Brief analysis of why this plan fits the user profile (max 50 words)" }
  },
  required: ["breakfast", "lunch", "dinner", "totalCalories", "analysis"]
};

export const generateMealPlan = async (user: UserProfile): Promise<DailyPlan> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const prompt = `
      Generate a 1-day healthy meal plan for a user in Hong Kong with the following profile:
      Age: ${user.age}
      Occupation: ${user.occupation}
      Goal: ${user.goal}
      Activity Level: ${user.activityLevel}
      Dietary Restrictions: ${user.dietaryRestrictions || 'None'}

      The meals should be available in Hong Kong, affordable (student/young worker friendly), and scientifically balanced.
      Prices should be in HKD.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: planSchema,
        systemInstruction: "You are NutriGo, an expert AI nutritionist for busy Hong Kong residents. You prioritize balanced macros, local taste preferences, and convenience."
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DailyPlan;
    }
    throw new Error("No response generated");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback mock data if API fails or key is missing
    return {
      breakfast: { name: "Oatmeal with Berries", calories: 350, protein: "12g", carbs: "60g", fats: "6g", description: "High fiber start.", price: 35, imageKeyword: "oatmeal" },
      lunch: { name: "Grilled Chicken Salad", calories: 450, protein: "40g", carbs: "20g", fats: "15g", description: "Lean protein boost.", price: 55, imageKeyword: "chicken" },
      dinner: { name: "Steamed Fish & Brown Rice", calories: 500, protein: "35g", carbs: "45g", fats: "10g", description: "Classic HK healthy dinner.", price: 65, imageKeyword: "fish" },
      totalCalories: 1300,
      analysis: "This is a fallback plan. Please configure your API Key to get personalized AI results."
    };
  }
};