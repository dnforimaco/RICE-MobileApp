import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface MealPlannerPageProps {
  onBack: () => void;
  onNavigateToRecipes: () => void;
}

export const MealPlannerPage: React.FC<MealPlannerPageProps> = ({ onBack, onNavigateToRecipes }) => {
  const { mealPlan, removeFromMealPlan } = useApp();
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'breakfast':
        return 'from-yellow-400 to-orange-500';
      case 'lunch':
        return 'from-blue-400 to-cyan-500';
      case 'dinner':
        return 'from-purple-400 to-pink-500';
      case 'snack':
        return 'from-green-400 to-emerald-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '☀️';
      case 'dinner':
        return '🌙';
      case 'snack':
        return '🍎';
      default:
        return '🍽️';
    }
  };

  const getMealsForDay = (day: string) => {
    return mealPlan.filter((meal) => meal.day === day);
  };

  const handleRemoveMeal = (id: string, recipeName: string) => {
    removeFromMealPlan(id);
    toast.success(`${recipeName} removed from meal plan!`);
  };

  const formatWeekRange = () => {
    const start = new Date(currentWeekStart);
    const end = new Date(currentWeekStart);
    end.setDate(end.getDate() + 6);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const totalMeals = mealPlan.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-pink-500 text-white p-6 pb-8 rounded-b-[3rem] mb-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl">Meal Planner</h1>
            <p className="text-sm opacity-90 mt-1">
              {totalMeals} meal{totalMeals !== 1 ? 's' : ''} planned this week
            </p>
          </div>
          <button
            onClick={onNavigateToRecipes}
            className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Week Navigator */}
        <div className="bg-white/15 rounded-xl p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousWeek}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <p className="text-sm opacity-90">Week of</p>
              <p className="text-base">{formatWeekRange()}</p>
            </div>
            <button
              onClick={goToNextWeek}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="px-4 space-y-4">
        {totalMeals === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center">
                <Calendar className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-lg mb-2">No meals planned yet</h3>
              <p className="text-sm text-gray-500 mb-4">
                Start planning your week by adding recipes from your collection
              </p>
              <Button
                onClick={onNavigateToRecipes}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Browse Recipes
              </Button>
            </CardContent>
          </Card>
        ) : (
          daysOfWeek.map((day) => {
            const dayMeals = getMealsForDay(day);
            const hasMeals = dayMeals.length > 0;

            return (
              <Card key={day} className="border-0 shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-orange-100 to-pink-100 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg text-orange-900">{day}</h3>
                    <Badge className="bg-white text-orange-600 border-0">
                      {dayMeals.length} meal{dayMeals.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  {!hasMeals ? (
                    <div className="text-center py-6 text-gray-400">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No meals planned</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {mealTypes.map((mealType) => {
                        const mealsOfType = dayMeals.filter((m) => m.mealType === mealType);
                        
                        return mealsOfType.map((meal) => (
                          <div
                            key={meal.id}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className={`p-2 bg-gradient-to-br ${getMealTypeColor(meal.mealType)} rounded-lg flex-shrink-0`}>
                              <span className="text-lg">{getMealTypeIcon(meal.mealType)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <Badge
                                variant="outline"
                                className="mb-1 text-xs capitalize"
                              >
                                {meal.mealType}
                              </Badge>
                              <p className="text-sm">{meal.recipeName}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveMeal(meal.id, meal.recipeName)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        ));
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Quick Stats */}
      {totalMeals > 0 && (
        <div className="px-4 mt-6">
          <h2 className="text-lg mb-3">This Week's Summary</h2>
          <div className="grid grid-cols-2 gap-3">
            {mealTypes.map((type) => {
              const count = mealPlan.filter((m) => m.mealType === type).length;
              return (
                <Card key={type} className="border-0 shadow-md">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-2 bg-gradient-to-br ${getMealTypeColor(type)} rounded-xl flex items-center justify-center shadow-md`}>
                      <span className="text-2xl">{getMealTypeIcon(type)}</span>
                    </div>
                    <p className="text-2xl mb-1">{count}</p>
                    <p className="text-xs text-gray-500 capitalize">{type}{count !== 1 ? 's' : ''}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
