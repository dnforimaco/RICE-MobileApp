import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { AppProvider } from '../contexts/AppContext';
import { LoginPage } from '../components/LoginPage';
import { SignUpPage } from '../components/SignUpPage';
import { MobileLayout } from '../components/MobileLayout';
import { HomePage } from '../components/HomePage';
import { IngredientRecognitionPage } from '../components/IngredientRecognitionPage';
import { RecipeSuggestionsPage } from '../components/RecipeSuggestionsPage';
import { CalorieTrackingPage } from '../components/CalorieTrackingPage';
import { SettingsPage } from '../components/SettingsPage';
import { GroceryListPage } from '../components/GroceryListPage';
import { PantryPage } from '../components/PantryPage';
import { MealPlannerPage } from '../components/MealPlannerPage';
import { Toaster } from '../components/ui/sonner';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState('home');

  if (!isAuthenticated) {
    return (
      <>
        {authView === 'login' ? (
          <LoginPage onSwitchToSignup={() => setAuthView('signup')} />
        ) : (
          <SignUpPage onSwitchToLogin={() => setAuthView('login')} />
        )}
      </>
    );
  }

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'recognition':
        return <IngredientRecognitionPage onNavigate={handleNavigate} />;
      case 'recipes':
        return <RecipeSuggestionsPage />;
      case 'calories':
        return <CalorieTrackingPage />;
      case 'settings':
        return <SettingsPage />;
      case 'grocery-list':
        return <GroceryListPage onBack={() => setActiveTab('home')} />;
      case 'pantry':
        return <PantryPage onBack={() => setActiveTab('home')} />;
      case 'meal-planner':
        return <MealPlannerPage onBack={() => setActiveTab('home')} onNavigateToRecipes={() => setActiveTab('recipes')} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderPage()}
    </MobileLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
        <Toaster />
      </AppProvider>
    </AuthProvider>
  );
}
