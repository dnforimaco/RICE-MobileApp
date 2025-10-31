import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Clock, Users, ChefHat, Heart, Star, Filter, Calendar, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Separator } from './ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';

interface Recipe {
  id: number;
  name: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  category: string;
  matchPercentage: number;
  isFavorite: boolean;
  isPremium: boolean;
}

export const RecipeSuggestionsPage: React.FC = () => {
  const { addToMealPlan, addToGroceryList } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 4]));
  const [mealPlanDialogOpen, setMealPlanDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const recipes: Recipe[] = [
    {
      id: 1,
      name: 'Mediterranean Bowl',
      image: 'https://images.unsplash.com/photo-1574665619640-df774e5f01bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGJvd2x8ZW58MXx8fHwxNzYxNTM1MDgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 450,
      protein: 25,
      carbs: 48,
      fat: 18,
      cookTime: 25,
      servings: 2,
      difficulty: 'Easy',
      category: 'Healthy',
      matchPercentage: 95,
      isFavorite: true,
      isPremium: false,
    },
    {
      id: 2,
      name: 'Creamy Pasta Primavera',
      image: 'https://images.unsplash.com/photo-1722938687754-d77c159da3c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjBmb29kfGVufDF8fHx8MTc2MTYwNjE0NHww&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 580,
      protein: 22,
      carbs: 68,
      fat: 24,
      cookTime: 30,
      servings: 4,
      difficulty: 'Medium',
      category: 'Comfort Food',
      matchPercentage: 88,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 3,
      name: 'Fresh Garden Salad',
      image: 'https://images.unsplash.com/photo-1758721218560-aec50748d450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBtZWFsfGVufDF8fHx8MTc2MTYyOTQ3NXww&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 280,
      protein: 12,
      carbs: 32,
      fat: 14,
      cookTime: 15,
      servings: 2,
      difficulty: 'Easy',
      category: 'Healthy',
      matchPercentage: 92,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 4,
      name: 'Grilled Chicken Breast',
      image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZGlubmVyJTIwcGxhdGV8ZW58MXx8fHwxNzYxNjI5NDc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 520,
      protein: 48,
      carbs: 35,
      fat: 18,
      cookTime: 35,
      servings: 3,
      difficulty: 'Medium',
      category: 'High Protein',
      matchPercentage: 85,
      isFavorite: true,
      isPremium: false,
    },
    {
      id: 5,
      name: 'Acai Smoothie Bowl',
      image: 'https://images.unsplash.com/photo-1610450622351-340b283813b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBzbW9vdGhpZSUyMGJvd2x8ZW58MXx8fHwxNzYxNjI5NDc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 320,
      protein: 8,
      carbs: 58,
      fat: 12,
      cookTime: 10,
      servings: 1,
      difficulty: 'Easy',
      category: 'Breakfast',
      matchPercentage: 78,
      isFavorite: false,
      isPremium: true,
    },
    {
      id: 6,
      name: 'Chicken Adobo',
      image: 'https://images.unsplash.com/photo-1606525575548-2d62ed40291d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG9ibyUyMGZpbGlwaW5vJTIwZm9vZHxlbnwxfHx8fDE3NjE2MzQ2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 480,
      protein: 42,
      carbs: 28,
      fat: 22,
      cookTime: 45,
      servings: 4,
      difficulty: 'Medium',
      category: 'Filipino',
      matchPercentage: 90,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 7,
      name: 'Sinigang na Baboy',
      image: 'https://images.unsplash.com/photo-1665594051407-7385d281ad76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5pZ2FuZyUyMGZpbGlwaW5vJTIwc291cHxlbnwxfHx8fDE3NjE2MzQ2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 350,
      protein: 32,
      carbs: 18,
      fat: 16,
      cookTime: 60,
      servings: 6,
      difficulty: 'Medium',
      category: 'Filipino',
      matchPercentage: 87,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 8,
      name: 'Lechon Kawali',
      image: 'https://images.unsplash.com/photo-1624900043496-eefdb73dadf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWNob24lMjBrYXdhbGklMjBjcmlzcHklMjBwb3JrfGVufDF8fHx8MTc2MTYzNDY3OHww&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 620,
      protein: 38,
      carbs: 12,
      fat: 48,
      cookTime: 90,
      servings: 4,
      difficulty: 'Hard',
      category: 'Filipino',
      matchPercentage: 82,
      isFavorite: false,
      isPremium: true,
    },
    {
      id: 9,
      name: 'Pancit Canton',
      image: 'https://images.unsplash.com/photo-1679279726940-be5ce80c632c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5jaXQlMjBub29kbGVzJTIwYXNpYW58ZW58MXx8fHwxNzYxNjM0Njc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 420,
      protein: 18,
      carbs: 52,
      fat: 16,
      cookTime: 30,
      servings: 4,
      difficulty: 'Easy',
      category: 'Filipino',
      matchPercentage: 93,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 10,
      name: 'Lumpia Shanghai',
      image: 'https://images.unsplash.com/photo-1739978833946-9480acfa6c04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW1waWElMjBzcHJpbmclMjByb2xsc3xlbnwxfHx8fDE3NjE2MzQ2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 380,
      protein: 22,
      carbs: 32,
      fat: 18,
      cookTime: 40,
      servings: 6,
      difficulty: 'Medium',
      category: 'Filipino',
      matchPercentage: 88,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 11,
      name: 'Kare-Kare',
      image: 'https://images.unsplash.com/photo-1707339019918-65008139984d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJlJTIwa2FyZSUyMHBlYW51dCUyMHN0ZXd8ZW58MXx8fHwxNzYxNjM0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 540,
      protein: 35,
      carbs: 38,
      fat: 28,
      cookTime: 120,
      servings: 6,
      difficulty: 'Hard',
      category: 'Filipino',
      matchPercentage: 85,
      isFavorite: false,
      isPremium: true,
    },
    {
      id: 12,
      name: 'Avocado Toast',
      image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3QlMjBicmVha2Zhc3R8ZW58MXx8fHwxNzYxNjM0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 280,
      protein: 10,
      carbs: 32,
      fat: 14,
      cookTime: 10,
      servings: 1,
      difficulty: 'Easy',
      category: 'Breakfast',
      matchPercentage: 88,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 13,
      name: 'Quinoa Buddha Bowl',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBib3dsfGVufDF8fHx8MTc2MTYzNDY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 380,
      protein: 16,
      carbs: 52,
      fat: 12,
      cookTime: 20,
      servings: 2,
      difficulty: 'Easy',
      category: 'Healthy',
      matchPercentage: 90,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 14,
      name: 'Stir-Fry Vegetables',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGlyJTIwZnJ5JTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjE2MzQ2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 220,
      protein: 8,
      carbs: 28,
      fat: 10,
      cookTime: 15,
      servings: 2,
      difficulty: 'Easy',
      category: 'Healthy',
      matchPercentage: 94,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 15,
      name: 'Protein Pancakes',
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwcGFuY2FrZXN8ZW58MXx8fHwxNzYxNjM0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 340,
      protein: 28,
      carbs: 38,
      fat: 8,
      cookTime: 15,
      servings: 2,
      difficulty: 'Easy',
      category: 'High Protein',
      matchPercentage: 86,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 16,
      name: 'Beef Bulgogi',
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwYnVsZ29naXxlbnwxfHx8fDE3NjE2MzQ2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 480,
      protein: 42,
      carbs: 32,
      fat: 20,
      cookTime: 25,
      servings: 4,
      difficulty: 'Medium',
      category: 'High Protein',
      matchPercentage: 87,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 17,
      name: 'Mac and Cheese',
      image: 'https://images.unsplash.com/photo-1543339318-4e1f2f5d0c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWMlMjBhbmQlMjBjaGVlc2V8ZW58MXx8fHwxNzYxNjM0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 620,
      protein: 24,
      carbs: 68,
      fat: 28,
      cookTime: 30,
      servings: 4,
      difficulty: 'Easy',
      category: 'Comfort Food',
      matchPercentage: 82,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 18,
      name: 'Fish Tacos',
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwdGFjb3N8ZW58MXx8fHwxNzYxNjM0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 380,
      protein: 32,
      carbs: 38,
      fat: 12,
      cookTime: 20,
      servings: 3,
      difficulty: 'Easy',
      category: 'Healthy',
      matchPercentage: 89,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 19,
      name: 'Chicken Tikka Masala',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwdGlra2ElMjBtYXNhbGF8ZW58MXx8fHwxNzYxNjM0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 520,
      protein: 38,
      carbs: 42,
      fat: 22,
      cookTime: 45,
      servings: 4,
      difficulty: 'Medium',
      category: 'Comfort Food',
      matchPercentage: 84,
      isFavorite: false,
      isPremium: true,
    },
    {
      id: 20,
      name: 'Oatmeal Bowl',
      image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYXRtZWFsJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc2MTYzNDY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 280,
      protein: 12,
      carbs: 48,
      fat: 6,
      cookTime: 10,
      servings: 1,
      difficulty: 'Easy',
      category: 'Breakfast',
      matchPercentage: 91,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 21,
      name: 'Salmon Teriyaki',
      image: 'https://images.unsplash.com/photo-1580959375944-1ab5b8588c2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjB0ZXJpeWFraXxlbnwxfHx8fDE3NjE2MzQ2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 420,
      protein: 42,
      carbs: 28,
      fat: 16,
      cookTime: 25,
      servings: 2,
      difficulty: 'Medium',
      category: 'High Protein',
      matchPercentage: 92,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 22,
      name: 'Veggie Wrap',
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdnaWUlMjB3cmFwfGVufDF8fHx8MTc2MTYzNDY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 320,
      protein: 14,
      carbs: 42,
      fat: 10,
      cookTime: 10,
      servings: 1,
      difficulty: 'Easy',
      category: 'Healthy',
      matchPercentage: 93,
      isFavorite: false,
      isPremium: false,
    },
    {
      id: 23,
      name: 'Beef Stroganoff',
      image: 'https://images.unsplash.com/photo-1595587637401-f6ccce5370c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwc3Ryb2dhbm9mZnxlbnwxfHx8fDE3NjE2MzQ2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 580,
      protein: 36,
      carbs: 48,
      fat: 26,
      cookTime: 50,
      servings: 4,
      difficulty: 'Medium',
      category: 'Comfort Food',
      matchPercentage: 80,
      isFavorite: false,
      isPremium: true,
    },
    {
      id: 24,
      name: 'Greek Yogurt Parfait',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnQlMjBwYXJmYWl0fGVufDF8fHx8MTc2MTYzNDY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 240,
      protein: 20,
      carbs: 32,
      fat: 4,
      cookTime: 5,
      servings: 1,
      difficulty: 'Easy',
      category: 'Breakfast',
      matchPercentage: 95,
      isFavorite: false,
      isPremium: false,
    },
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'All') {
      return matchesSearch;
    } else if (selectedFilter === 'Healthy') {
      return matchesSearch && recipe.category === 'Healthy';
    } else if (selectedFilter === 'Quick') {
      return matchesSearch && recipe.cookTime <= 20;
    } else if (selectedFilter === 'Premium') {
      return matchesSearch && recipe.isPremium;
    }
    
    return matchesSearch;
  });

  const toggleFavorite = (recipeId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId);
      } else {
        newFavorites.add(recipeId);
      }
      return newFavorites;
    });
  };

  const handleAddToMealPlan = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setMealPlanDialogOpen(true);
  };

  const confirmAddToMealPlan = () => {
    if (selectedRecipe && selectedDay && selectedMealType) {
      addToMealPlan(selectedRecipe.id, selectedRecipe.name, selectedDay, selectedMealType);
      toast.success(`${selectedRecipe.name} added to ${selectedDay}'s ${selectedMealType}!`);
      setMealPlanDialogOpen(false);
      setSelectedDay('');
      setSelectedMealType('');
    }
  };

  const handleGenerateGroceryList = (recipe: Recipe) => {
    const groceryItems = [
      { name: 'Feta cheese', quantity: '1/4 cup', checked: false, recipeId: recipe.id },
      { name: 'Mixed greens', quantity: '2 cups', checked: false, recipeId: recipe.id },
      { name: 'Cherry tomatoes', quantity: '1 cup', checked: false, recipeId: recipe.id },
      { name: 'Cucumber', quantity: '1/2 piece', checked: false, recipeId: recipe.id },
      { name: 'Olive oil', quantity: '2 tbsp', checked: false, recipeId: recipe.id },
    ];
    addToGroceryList(groceryItems);
    toast.success('Ingredients added to grocery list!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-pink-500 text-white p-6 pb-8 rounded-b-[3rem] mb-8 shadow-xl">
        <h1 className="text-3xl mb-5 text-white">Recipe Collection</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-white text-gray-900 placeholder:text-gray-500 rounded-xl border-0 shadow-lg"
          />
        </div>

        {/* Filter Badges */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex-shrink-0 rounded-xl bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 pointer-events-none"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Badge 
            className={`flex-shrink-0 cursor-pointer px-4 py-1.5 transition-all ${
              selectedFilter === 'All' 
                ? 'bg-white text-orange-600 hover:bg-white/90' 
                : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
            } border-0`}
            onClick={() => setSelectedFilter('All')}
          >
            All
          </Badge>
          <Badge 
            className={`flex-shrink-0 cursor-pointer px-4 py-1.5 transition-all ${
              selectedFilter === 'Healthy' 
                ? 'bg-white text-orange-600 hover:bg-white/90' 
                : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
            } border-0`}
            onClick={() => setSelectedFilter('Healthy')}
          >
            Healthy
          </Badge>
          <Badge 
            className={`flex-shrink-0 cursor-pointer px-4 py-1.5 transition-all ${
              selectedFilter === 'Quick' 
                ? 'bg-white text-orange-600 hover:bg-white/90' 
                : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
            } border-0`}
            onClick={() => setSelectedFilter('Quick')}
          >
            Quick (≤20 min)
          </Badge>
          <Badge 
            className={`flex-shrink-0 cursor-pointer px-4 py-1.5 transition-all ${
              selectedFilter === 'Premium' 
                ? 'bg-white text-orange-600 hover:bg-white/90' 
                : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
            } border-0`}
            onClick={() => setSelectedFilter('Premium')}
          >
            Premium
          </Badge>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="px-4 space-y-5">
        {filteredRecipes.map((recipe) => (
          <Sheet key={recipe.id}>
            <SheetTrigger asChild>
              <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer border-0 shadow-lg hover:-translate-y-1 dark:bg-gray-900">
                <div className="relative">
                  <ImageWithFallback
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-52 object-cover bg-gray-200 dark:bg-gray-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {recipe.isPremium && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 border-0 shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        favorites.has(recipe.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 shadow-lg">
                      {recipe.matchPercentage}% match
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-0 shadow-lg">
                      {recipe.calories} cal
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg mb-3 text-gray-900 dark:text-gray-100">{recipe.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <span>{recipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span>{recipe.servings}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <ChefHat className="w-4 h-4 text-white" />
                      </div>
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 border-0">
                    {recipe.category}
                  </Badge>
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] overflow-y-auto dark:bg-gray-900">
              <SheetHeader>
                <SheetTitle className="text-gray-900 dark:text-gray-100">{recipe.name}</SheetTitle>
                <SheetDescription className="text-gray-600 dark:text-gray-400">Complete recipe details and nutrition</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <ImageWithFallback
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cook Time</p>
                    <p className="text-gray-900 dark:text-gray-100">{recipe.cookTime} min</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Users className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Servings</p>
                    <p className="text-gray-900 dark:text-gray-100">{recipe.servings}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <ChefHat className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Difficulty</p>
                    <p className="text-gray-900 dark:text-gray-100">{recipe.difficulty}</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-gray-900 dark:text-gray-100">Nutrition Information</h3>
                  <Card className="dark:bg-gray-800">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-gray-900 dark:text-gray-100">
                        <span>Calories</span>
                        <span>{recipe.calories} kcal</span>
                      </div>
                      <Separator className="dark:bg-gray-700" />
                      <div className="flex items-center justify-between text-gray-900 dark:text-gray-100">
                        <span>Protein</span>
                        <span>{recipe.protein}g</span>
                      </div>
                      <Separator className="dark:bg-gray-700" />
                      <div className="flex items-center justify-between text-gray-900 dark:text-gray-100">
                        <span>Carbohydrates</span>
                        <span>{recipe.carbs}g</span>
                      </div>
                      <Separator className="dark:bg-gray-700" />
                      <div className="flex items-center justify-between text-gray-900 dark:text-gray-100">
                        <span>Fat</span>
                        <span>{recipe.fat}g</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-3 text-gray-900 dark:text-gray-100">Ingredients</h3>
                  <Card className="dark:bg-gray-800">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <p className="text-gray-900 dark:text-gray-100">2 cups mixed greens</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <p className="text-gray-900 dark:text-gray-100">1 cup cherry tomatoes, halved</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <p className="text-gray-900 dark:text-gray-100">1/2 cucumber, sliced</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        <p className="text-gray-900 dark:text-gray-100">1/4 cup feta cheese (missing)</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <p className="text-gray-900 dark:text-gray-100">2 tbsp olive oil</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="mb-3 text-gray-900 dark:text-gray-100">Instructions</h3>
                  <Card className="dark:bg-gray-800">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">
                          1
                        </div>
                        <p className="text-gray-900 dark:text-gray-100">Wash and prepare all vegetables.</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">
                          2
                        </div>
                        <p className="text-gray-900 dark:text-gray-100">Combine all ingredients in a large bowl.</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">
                          3
                        </div>
                        <p className="text-gray-900 dark:text-gray-100">Drizzle with olive oil and toss gently.</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">
                          4
                        </div>
                        <p className="text-gray-900 dark:text-gray-100">Serve immediately and enjoy!</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-3 pb-6">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    onClick={() => handleAddToMealPlan(recipe)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Meal Plan
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
                    onClick={() => handleGenerateGroceryList(recipe)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Grocery List
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>

      {/* Add to Meal Plan Dialog */}
      <Dialog open={mealPlanDialogOpen} onOpenChange={setMealPlanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Meal Plan</DialogTitle>
            <DialogDescription>
              Choose when you'd like to make {selectedRecipe?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger id="day">
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                  <SelectItem value="Saturday">Saturday</SelectItem>
                  <SelectItem value="Sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meal-type">Meal Type</Label>
              <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                <SelectTrigger id="meal-type">
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={confirmAddToMealPlan}
              disabled={!selectedDay || !selectedMealType}
              className="w-full"
            >
              Add to Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
