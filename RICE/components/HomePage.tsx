import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent } from './ui/card';
import { Settings, Bell, TrendingUp, AlertCircle, Calendar, Star, ShoppingCart, Package, CalendarDays } from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { notifications, markNotificationAsRead, clearAllNotifications } = useApp();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showAllExpiring, setShowAllExpiring] = useState(false);

  const todayCalories = 1450;
  const calorieGoal = user?.calorieGoal || 2000;
  const calorieProgress = (todayCalories / calorieGoal) * 100;

  const allExpiringItems = [
    { name: 'Milk', daysLeft: 2 },
    { name: 'Lettuce', daysLeft: 3 },
    { name: 'Chicken Breast', daysLeft: 4 },
    { name: 'Yogurt', daysLeft: 5 },
    { name: 'Bell Peppers', daysLeft: 5 },
    { name: 'Ground Beef', daysLeft: 6 },
    { name: 'Spinach', daysLeft: 7 },
  ];

  const expiringItems = showAllExpiring ? allExpiringItems : allExpiringItems.slice(0, 3);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'expiration':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'goal':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'recipe':
        return <Star className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const suggestedRecipes = [
    {
      id: 1,
      name: 'Mediterranean Bowl',
      calories: 450,
      image: 'https://images.unsplash.com/photo-1574665619640-df774e5f01bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGJvd2x8ZW58MXx8fHwxNzYxNTM1MDgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      matchPercentage: 95,
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      calories: 380,
      image: 'https://images.unsplash.com/photo-1758721218560-aec50748d450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBtZWFsfGVufDF8fHx8MTc2MTYyOTQ3NXww&ixlib=rb-4.1.0&q=80&w=1080',
      matchPercentage: 88,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-pink-500 text-white p-6 pb-8 rounded-b-[3rem] shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm opacity-90 mb-1 text-white">Welcome back,</p>
            <h1 className="text-3xl text-white">{user?.name}</h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setNotificationsOpen(true)}
              className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-all backdrop-blur-sm shadow-lg relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-all backdrop-blur-sm shadow-lg"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Daily Calorie Progress */}
        <Card className="bg-white/15 border-white/30 backdrop-blur-md shadow-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm opacity-90">Daily Calories</p>
                <p className="text-2xl">{todayCalories}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Goal</p>
                <p className="text-2xl">{calorieGoal}</p>
              </div>
            </div>
            <Progress value={calorieProgress} className="h-3 bg-white/20" />
            <p className="text-xs mt-2 opacity-75">{calorieGoal - todayCalories} cal remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="px-4 -mt-6 mb-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Card 
            className="hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 border-0 shadow-lg dark:bg-gray-900"
            onClick={() => onNavigate('grocery-list')}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-md">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Grocery List</p>
            </CardContent>
          </Card>
          <Card 
            className="hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 border-0 shadow-lg dark:bg-gray-900"
            onClick={() => onNavigate('pantry')}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-md">
                <Package className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">My Pantry</p>
            </CardContent>
          </Card>
          <Card 
            className="hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 border-0 shadow-lg dark:bg-gray-900"
            onClick={() => onNavigate('meal-planner')}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-md">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Meal Planner</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Expiring Soon */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-900 dark:text-gray-100">Expiring Soon</h2>
          <button 
            onClick={() => setShowAllExpiring(!showAllExpiring)}
            className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-500 transition-colors"
          >
            {showAllExpiring ? 'Show Less' : 'View All'}
          </button>
        </div>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30">
          <CardContent className="p-5 space-y-3">
            {expiringItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-md">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-gray-100">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Expiring soon</p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                  {item.daysLeft} days
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Suggested Recipes */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-900 dark:text-gray-100">Suggested for You</h2>
          <button
            onClick={() => onNavigate('recipes')}
            className="text-sm text-orange-600 dark:text-orange-400"
          >
            See All
          </button>
        </div>
        <div className="space-y-4">
          {suggestedRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-xl transition-all cursor-pointer border-0 shadow-lg hover:-translate-y-1 dark:bg-gray-900">
              <div className="flex gap-0">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <ImageWithFallback
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover bg-gray-200 dark:bg-gray-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge className="absolute bottom-2 right-2 bg-gradient-to-r from-orange-500 to-pink-500 border-0 text-white shadow-md">
                    {recipe.matchPercentage}%
                  </Badge>
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900 dark:text-gray-100">{recipe.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-orange-500 rounded-full"></span>
                      {recipe.calories} calories
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all"
                        style={{ width: `${recipe.matchPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-orange-600 dark:text-orange-400">match</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Notifications Sheet */}
      <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Notifications</span>
              {notifications.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearAllNotifications}
                  className="text-xs text-orange-600 hover:text-orange-700"
                >
                  Clear All
                </Button>
              )}
            </SheetTitle>
            <SheetDescription>
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-120px)] mt-6">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Bell className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500">No notifications yet</p>
                <p className="text-sm text-gray-400 mt-1">We'll notify you when something important happens</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card 
                    key={notification.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      !notification.read ? 'bg-orange-50 border-orange-200' : 'bg-white'
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl ${
                          notification.type === 'expiration' ? 'bg-orange-100' :
                          notification.type === 'goal' ? 'bg-green-100' :
                          notification.type === 'recipe' ? 'bg-purple-100' :
                          'bg-blue-100'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm truncate">{notification.title}</h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};
