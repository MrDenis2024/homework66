export interface Meal {
  id: string;
  meal: string;
  description: string;
  calories: number;
}

export type ApiMeal = Omit<Meal, "id">;

export interface MealMutation {
  meal: string;
  description: string;
  calories: string;
}

export interface ApiMeals {
  [id: string]: ApiMeal;
}

