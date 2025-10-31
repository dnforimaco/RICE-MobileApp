import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Plus, Flame, Apple, Utensils, Moon, TrendingUp, PieChart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';

interface MealEntry {
  id: number;
  name: string;
  mealType: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

export const CalorieTrackingPage: React.FC = () => {
  const { user } = useAuth();
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([
    {
      id: 1,
      name: 'Oatmeal with Berries',
      mealType: 'breakfast',
      calories: 320,
      protein: 12,
      carbs: 54,
      fat: 8,
      time: '8:30 AM',
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      mealType: 'lunch',
      calories: 450,
      protein: 38,
      carbs: 32,
      fat: 18,
      time: '12:45 PM',
    },
    {
      id: 3,
      name: 'Apple with Almond Butter',
      mealType: 'snack',
      calories: 200,
      protein: 6,
      carbs: 24,
      fat: 10,
      time: '3:30 PM',
    },
    {
      id: 4,
      name: 'Salmon with Quinoa',
      mealType: 'dinner',
      calories: 480,
      protein: 42,
      carbs: 38,
      fat: 16,
      time: '7:00 PM',
    },
  ]);

  const [addMealDialogOpen, setAddMealDialogOpen] = useState(false);
  const [newMealName, setNewMealName] = useState('');
  const [newMealType, setNewMealType] = useState('');
  const [newMealCalories, setNewMealCalories] = useState('');
  const [newMealProtein, setNewMealProtein] = useState('');
  const [newMealCarbs, setNewMealCarbs] = useState('');
  const [newMealFat, setNewMealFat] = useState('');

  const handleAddMeal = () => {
    if (!newMealName || !newMealType || !newMealCalories) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newMeal: MealEntry = {
      id: Date.now(),
      name: newMealName,
      mealType: newMealType,
      calories: parseInt(newMealCalories),
      protein: parseInt(newMealProtein) || 0,
      carbs: parseInt(newMealCarbs) || 0,
      fat: parseInt(newMealFat) || 0,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    setMealEntries([...mealEntries, newMeal]);
    toast.success('Meal added successfully!');
    
    // Reset form
    setNewMealName('');
    setNewMealType('');
    setNewMealCalories('');
    setNewMealProtein('');
    setNewMealCarbs('');
    setNewMealFat('');
    setAddMealDialogOpen(false);
  };

  const totalCalories = mealEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const totalProtein = mealEntries.reduce((sum, entry) => sum + entry.protein, 0);
  const totalCarbs = mealEntries.reduce((sum, entry) => sum + entry.carbs, 0);
  const totalFat = mealEntries.reduce((sum, entry) => sum + entry.fat, 0);

  const calorieGoal = user?.calorieGoal || 2000;
  const proteinGoal = user?.proteinGoal || 150;
  const carbsGoal = user?.carbsGoal || 200;
  const fatGoal = user?.fatGoal || 65;

  const calorieProgress = (totalCalories / calorieGoal) * 100;
  const proteinProgress = (totalProtein / proteinGoal) * 100;
  const carbsProgress = (totalCarbs / carbsGoal) * 100;
  const fatProgress = (totalFat / fatGoal) * 100;

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return <Apple className="w-5 h-5 text-orange-500" />;
      case 'lunch':
        return <Utensils className="w-5 h-5 text-blue-500" />;
      case 'snack':
        return <Flame className="w-5 h-5 text-yellow-500" />;
      case 'dinner':
        return <Moon className="w-5 h-5 text-purple-500" />;
      default:
        return <Utensils className="w-5 h-5 text-gray-500" />;
    }
  };

  const weeklyData = [
    { day: 'Mon', calories: 1950 },
    { day: 'Tue', calories: 2100 },
    { day: 'Wed', calories: 1880 },
    { day: 'Thu', calories: 2050 },
    { day: 'Fri', calories: 1920 },
    { day: 'Sat', calories: 2200 },
    { day: 'Today', calories: totalCalories },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-pink-500 text-white p-6 pb-8 rounded-b-[3rem] mb-8 shadow-xl">
        <h1 className="text-3xl mb-2">Nutrition Tracker</h1>
        <p className="text-sm opacity-90">Monitor your daily nutrition and reach your goals</p>
      </div>

      <div className="px-4 space-y-5">
        {/* Daily Summary */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-pink-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Today's Progress</CardTitle>
                <CardDescription className="mt-1">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
                  <p className="text-2xl">{totalCalories}</p>
                  <p className="text-xs opacity-90">cal</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Daily Goal: {calorieGoal} cal</span>
                <span className="text-sm">{Math.round(calorieProgress)}%</span>
              </div>
              <Progress value={calorieProgress} className="h-3" />
            </div>
            <div className="p-3 bg-white rounded-xl">
              <p className="text-sm text-center">
                {calorieGoal - totalCalories > 0 
                  ? `🎯 ${calorieGoal - totalCalories} calories remaining today`
                  : `⚠️ ${totalCalories - calorieGoal} calories over your goal`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Macronutrients */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              Macronutrients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white">P</span>
                  </div>
                  <span>Protein</span>
                </div>
                <span>{totalProtein}g / {proteinGoal}g</span>
              </div>
              <Progress value={proteinProgress} className="h-2.5" />
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white">C</span>
                  </div>
                  <span>Carbs</span>
                </div>
                <span>{totalCarbs}g / {carbsGoal}g</span>
              </div>
              <Progress value={carbsProgress} className="h-2.5" />
            </div>
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white">F</span>
                  </div>
                  <span>Fat</span>
                </div>
                <span>{totalFat}g / {fatGoal}g</span>
              </div>
              <Progress value={fatProgress} className="h-2.5" />
            </div>
          </CardContent>
        </Card>

        {/* Weekly Overview */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                Weekly Overview
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-40 gap-2 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
              {weeklyData.map((day, index) => {
                const height = (day.calories / 2500) * 100;
                const isToday = day.day === 'Today';
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-3">
                    <div className="w-full bg-white rounded-t-2xl overflow-hidden flex items-end shadow-sm" style={{ height: '120px' }}>
                      <div
                        className={`w-full rounded-t-2xl transition-all ${
                          isToday 
                            ? 'bg-gradient-to-t from-orange-500 to-pink-500' 
                            : 'bg-gradient-to-t from-orange-300 to-orange-200'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className={`text-xs ${isToday ? 'text-orange-600' : 'text-gray-500'}`}>
                      {day.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Meal Entries */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl">Today's Meals</h2>
          <Dialog open={addMealDialogOpen} onOpenChange={setAddMealDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-xl shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Meal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Meal</DialogTitle>
                <DialogDescription>
                  Log your meal to track calories and nutrients
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="meal-name">Meal Name *</Label>
                  <Input 
                    id="meal-name" 
                    placeholder="e.g., Chicken Salad" 
                    value={newMealName}
                    onChange={(e) => setNewMealName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meal-type">Meal Type *</Label>
                  <Select value={newMealType} onValueChange={setNewMealType}>
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
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories *</Label>
                  <Input 
                    id="calories" 
                    type="number" 
                    placeholder="450" 
                    value={newMealCalories}
                    onChange={(e) => setNewMealCalories(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="protein">Protein (g)</Label>
                    <Input 
                      id="protein" 
                      type="number" 
                      placeholder="30" 
                      value={newMealProtein}
                      onChange={(e) => setNewMealProtein(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carbs">Carbs (g)</Label>
                    <Input 
                      id="carbs" 
                      type="number" 
                      placeholder="40" 
                      value={newMealCarbs}
                      onChange={(e) => setNewMealCarbs(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fat">Fat (g)</Label>
                    <Input 
                      id="fat" 
                      type="number" 
                      placeholder="15" 
                      value={newMealFat}
                      onChange={(e) => setNewMealFat(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleAddMeal}
                  className="w-full"
                >
                  Add Meal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full bg-white shadow-md rounded-xl p-1.5">
            <TabsTrigger value="all" className="flex-1 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="breakfast" className="flex-1 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch" className="flex-1 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">Lunch</TabsTrigger>
            <TabsTrigger value="dinner" className="flex-1 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">Dinner</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-5 space-y-4">
            {mealEntries.map((entry) => (
              <Card key={entry.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl shadow-md ${
                        entry.mealType === 'breakfast' ? 'bg-gradient-to-br from-orange-400 to-orange-500' :
                        entry.mealType === 'lunch' ? 'bg-gradient-to-br from-blue-400 to-blue-500' :
                        entry.mealType === 'snack' ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                        'bg-gradient-to-br from-purple-400 to-purple-500'
                      }`}>
                        {getMealIcon(entry.mealType)}
                      </div>
                      <div>
                        <h4 className="mb-0.5">{entry.name}</h4>
                        <p className="text-sm text-gray-500">{entry.time}</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-md">
                      {entry.calories} cal
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                      <p className="text-gray-500 mb-1">Protein</p>
                      <p>{entry.protein}g</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
                      <p className="text-gray-500 mb-1">Carbs</p>
                      <p>{entry.carbs}g</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                      <p className="text-gray-500 mb-1">Fat</p>
                      <p>{entry.fat}g</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="breakfast" className="mt-4 space-y-3">
            {mealEntries
              .filter((entry) => entry.mealType === 'breakfast')
              .map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getMealIcon(entry.mealType)}
                        <div>
                          <h4>{entry.name}</h4>
                          <p className="text-sm text-gray-500">{entry.time}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{entry.calories} cal</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <p className="text-gray-500">Protein</p>
                        <p>{entry.protein}g</p>
                      </div>
                      <div className="text-center p-2 bg-orange-50 rounded">
                        <p className="text-gray-500">Carbs</p>
                        <p>{entry.carbs}g</p>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <p className="text-gray-500">Fat</p>
                        <p>{entry.fat}g</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="lunch" className="mt-4 space-y-3">
            {mealEntries
              .filter((entry) => entry.mealType === 'lunch')
              .map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getMealIcon(entry.mealType)}
                        <div>
                          <h4>{entry.name}</h4>
                          <p className="text-sm text-gray-500">{entry.time}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{entry.calories} cal</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <p className="text-gray-500">Protein</p>
                        <p>{entry.protein}g</p>
                      </div>
                      <div className="text-center p-2 bg-orange-50 rounded">
                        <p className="text-gray-500">Carbs</p>
                        <p>{entry.carbs}g</p>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <p className="text-gray-500">Fat</p>
                        <p>{entry.fat}g</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="dinner" className="mt-4 space-y-3">
            {mealEntries
              .filter((entry) => entry.mealType === 'dinner')
              .map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getMealIcon(entry.mealType)}
                        <div>
                          <h4>{entry.name}</h4>
                          <p className="text-sm text-gray-500">{entry.time}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{entry.calories} cal</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <p className="text-gray-500">Protein</p>
                        <p>{entry.protein}g</p>
                      </div>
                      <div className="text-center p-2 bg-orange-50 rounded">
                        <p className="text-gray-500">Carbs</p>
                        <p>{entry.carbs}g</p>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <p className="text-gray-500">Fat</p>
                        <p>{entry.fat}g</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
