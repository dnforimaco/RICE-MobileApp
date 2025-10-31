import React, { ReactNode } from 'react';
import { Home, Camera, BookOpen, PieChart } from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'recognition', label: 'Scan', icon: Camera },
    { id: 'recipes', label: 'Recipes', icon: BookOpen },
    { id: 'calories', label: 'Track', icon: PieChart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col max-w-md mx-auto">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {children}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 max-w-md mx-auto shadow-lg">
        <div className="flex items-center justify-around h-20 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all relative ${
                  isActive ? 'text-orange-600' : 'text-gray-500'
                }`}
              >
                {isActive && (
                  <div className="absolute -top-1 w-12 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" />
                )}
                <div className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-orange-50' : ''}`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
                </div>
                <span className={`text-xs mt-1 ${isActive ? '' : ''}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
