import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import {
  User,
  Bell,
  Lock,
  Trash2,
  LogOut,
  ChevronRight,
  Target,
  Moon,
  Smartphone,
  Edit,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

export const SettingsPage: React.FC = () => {
  const { user, logout, updateUserGoals } = useAuth();
  const { darkMode, toggleDarkMode } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [expirationAlerts, setExpirationAlerts] = useState(true);

  const [calorieGoal, setCalorieGoal] = useState(user?.calorieGoal || 2000);
  const [proteinGoal, setProteinGoal] = useState(user?.proteinGoal || 150);
  const [carbsGoal, setCarbsGoal] = useState(user?.carbsGoal || 200);
  const [fatGoal, setFatGoal] = useState(user?.fatGoal || 65);

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');

  const handleSaveGoals = () => {
    updateUserGoals({
      calorieGoal,
      proteinGoal,
      carbsGoal,
      fatGoal,
    });
    toast.success('Goals updated successfully!');
  };

  const handleSaveProfile = () => {
    updateUserGoals({ name: editName, email: editEmail });
    setEditProfileOpen(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-pink-500 text-white p-6 pb-8 rounded-b-[3rem] mb-8 shadow-xl">
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-sm opacity-90">Manage your account and preferences</p>
      </div>

      <div className="px-4 space-y-5">
        {/* Profile Section */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-lg">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
            <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between h-12 rounded-xl border-2 border-orange-200 text-orange-600 hover:bg-orange-50">
                  <span className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your personal information
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSaveProfile} className="w-full">
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Nutrition Goals */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  Nutrition Goals
                </CardTitle>
                <CardDescription className="mt-2">Set your daily macronutrient targets</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between h-12 rounded-xl border-2 border-orange-200 text-orange-600 hover:bg-orange-50">
                  <span>Manage Goals</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Nutrition Goals</DialogTitle>
                  <DialogDescription>
                    Customize your daily calorie and macronutrient goals
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="calorie-goal">Daily Calorie Goal</Label>
                    <Input
                      id="calorie-goal"
                      type="number"
                      value={calorieGoal}
                      onChange={(e) => setCalorieGoal(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="protein-goal">Protein Goal (g)</Label>
                    <Input
                      id="protein-goal"
                      type="number"
                      value={proteinGoal}
                      onChange={(e) => setProteinGoal(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carbs-goal">Carbohydrates Goal (g)</Label>
                    <Input
                      id="carbs-goal"
                      type="number"
                      value={carbsGoal}
                      onChange={(e) => setCarbsGoal(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fat-goal">Fat Goal (g)</Label>
                    <Input
                      id="fat-goal"
                      type="number"
                      value={fatGoal}
                      onChange={(e) => setFatGoal(Number(e.target.value))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSaveGoals} className="w-full">
                    Save Goals
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  Notifications
                </CardTitle>
                <CardDescription className="mt-2">Manage your notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <div>
                <p>Push Notifications</p>
                <p className="text-sm text-gray-500">Receive app notifications</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
              <div>
                <p>Expiration Alerts</p>
                <p className="text-sm text-gray-500">Get notified about expiring items</p>
              </div>
              <Switch checked={expirationAlerts} onCheckedChange={setExpirationAlerts} />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Moon className="w-5 h-5 text-white" />
                  </div>
                  Appearance
                </CardTitle>
                <CardDescription className="mt-2">Customize your app experience</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
              <div>
                <p>Dark Mode</p>
                <p className="text-sm text-gray-500">Use dark theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <span>Version</span>
              </div>
              <span className="text-gray-500">1.0.0</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <span>Privacy Policy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-2 border-red-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-red-600 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start h-12 text-red-600 border-2 border-red-300 hover:bg-red-50 rounded-xl">
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={logout}
          variant="outline"
          className="w-full justify-start h-12 border-2 border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl shadow-lg"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 py-6">
          <p>R.I.C.E. - Recipe, Ingredient, Calorie & Expiration Manager</p>
          <p className="mt-1">© 2025 R.I.C.E. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
