import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'expiration' | 'goal' | 'recipe' | 'system';
}

interface MealPlanItem {
  id: string;
  recipeId: number;
  recipeName: string;
  day: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  recipeId: number;
}

interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  expirationDate: string;
  category: string;
  addedDate: string;
}

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  mealPlan: MealPlanItem[];
  addToMealPlan: (recipeId: number, recipeName: string, day: string, mealType: string) => void;
  removeFromMealPlan: (id: string) => void;
  groceryList: GroceryItem[];
  addToGroceryList: (items: Omit<GroceryItem, 'id'>[]) => void;
  toggleGroceryItem: (id: string) => void;
  removeGroceryItem: (id: string) => void;
  updateGroceryItemQuantity: (id: string, quantity: string) => void;
  clearGroceryList: () => void;
  pantryItems: PantryItem[];
  addPantryItem: (item: Omit<PantryItem, 'id' | 'addedDate'>) => void;
  removePantryItem: (id: string) => void;
  updatePantryItem: (id: string, updates: Partial<PantryItem>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Milk expiring soon',
      message: 'Your milk will expire in 2 days',
      time: '2 hours ago',
      read: false,
      type: 'expiration',
    },
    {
      id: '2',
      title: 'Daily goal achieved!',
      message: 'Congratulations! You reached your calorie goal for yesterday',
      time: '1 day ago',
      read: false,
      type: 'goal',
    },
    {
      id: '3',
      title: 'New recipe suggestion',
      message: 'Based on your ingredients, try making Mediterranean Bowl',
      time: '2 days ago',
      read: true,
      type: 'recipe',
    },
  ]);
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>([]);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    {
      id: '1',
      name: 'Milk',
      quantity: '1 gallon',
      expirationDate: '2025-10-30',
      category: 'Dairy',
      addedDate: '2025-10-26',
    },
    {
      id: '2',
      name: 'Lettuce',
      quantity: '1 head',
      expirationDate: '2025-10-31',
      category: 'Vegetables',
      addedDate: '2025-10-25',
    },
    {
      id: '3',
      name: 'Chicken Breast',
      quantity: '500g',
      expirationDate: '2025-11-01',
      category: 'Meat',
      addedDate: '2025-10-24',
    },
    {
      id: '4',
      name: 'Eggs',
      quantity: '12 pieces',
      expirationDate: '2025-11-05',
      category: 'Dairy',
      addedDate: '2025-10-20',
    },
    {
      id: '5',
      name: 'Tomatoes',
      quantity: '500g',
      expirationDate: '2025-11-02',
      category: 'Vegetables',
      addedDate: '2025-10-27',
    },
  ]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addToMealPlan = (recipeId: number, recipeName: string, day: string, mealType: string) => {
    const newItem: MealPlanItem = {
      id: Date.now().toString(),
      recipeId,
      recipeName,
      day,
      mealType: mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
    };
    setMealPlan((prev) => [...prev, newItem]);
  };

  const removeFromMealPlan = (id: string) => {
    setMealPlan((prev) => prev.filter((item) => item.id !== id));
  };

  const addToGroceryList = (items: Omit<GroceryItem, 'id'>[]) => {
    const newItems = items.map((item) => ({
      ...item,
      id: Date.now().toString() + Math.random(),
    }));
    setGroceryList((prev) => [...prev, ...newItems]);
  };

  const toggleGroceryItem = (id: string) => {
    setGroceryList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const removeGroceryItem = (id: string) => {
    setGroceryList((prev) => prev.filter((item) => item.id !== id));
  };

  const updateGroceryItemQuantity = (id: string, quantity: string) => {
    setGroceryList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearGroceryList = () => {
    setGroceryList([]);
  };

  const addPantryItem = (item: Omit<PantryItem, 'id' | 'addedDate'>) => {
    const newItem: PantryItem = {
      ...item,
      id: Date.now().toString(),
      addedDate: new Date().toISOString().split('T')[0],
    };
    setPantryItems((prev) => [...prev, newItem]);
  };

  const removePantryItem = (id: string) => {
    setPantryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updatePantryItem = (id: string, updates: Partial<PantryItem>) => {
    setPantryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        mealPlan,
        addToMealPlan,
        removeFromMealPlan,
        groceryList,
        addToGroceryList,
        toggleGroceryItem,
        removeGroceryItem,
        updateGroceryItemQuantity,
        clearGroceryList,
        pantryItems,
        addPantryItem,
        removePantryItem,
        updatePantryItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
