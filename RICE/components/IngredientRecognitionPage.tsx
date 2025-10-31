import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Camera, Upload, X, CheckCircle, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface IngredientRecognitionPageProps {
  onNavigate: (tab: string) => void;
}

interface DetectedIngredient {
  name: string;
  confidence: number;
  category: string;
}

interface ScanResult {
  image: string;
  ingredients: DetectedIngredient[];
  recipes: Array<{
    id: number;
    name: string;
    image: string;
    matchingIngredients: number;
    totalIngredients: number;
  }>;
}

const scanResults: ScanResult[] = [
  {
    image: 'https://images.unsplash.com/photo-1665088127661-83aeff6104c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NjE1MzAzMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ingredients: [
      { name: 'Tomatoes', confidence: 98, category: 'Vegetables' },
      { name: 'Bell Peppers', confidence: 95, category: 'Vegetables' },
      { name: 'Carrots', confidence: 92, category: 'Vegetables' },
      { name: 'Lettuce', confidence: 88, category: 'Vegetables' },
      { name: 'Onions', confidence: 85, category: 'Vegetables' },
    ],
    recipes: [
      {
        id: 1,
        name: 'Fresh Garden Salad',
        image: 'https://images.unsplash.com/photo-1758721218560-aec50748d450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBtZWFsfGVufDF8fHx8MTc2MTYyOTQ3NXww&ixlib=rb-4.1.0&q=80&w=1080',
        matchingIngredients: 5,
        totalIngredients: 6,
      },
      {
        id: 2,
        name: 'Roasted Vegetable Medley',
        image: 'https://images.unsplash.com/photo-1574665619640-df774e5f01bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGJvd2x8ZW58MXx8fHwxNzYxNTM1MDgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        matchingIngredients: 4,
        totalIngredients: 5,
      },
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1464093515883-ec948246accb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMGJhc2tldHxlbnwxfHx8fDE3NjE2MzQ2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ingredients: [
      { name: 'Bananas', confidence: 96, category: 'Fruits' },
      { name: 'Apples', confidence: 94, category: 'Fruits' },
      { name: 'Oranges', confidence: 91, category: 'Fruits' },
      { name: 'Strawberries', confidence: 89, category: 'Fruits' },
      { name: 'Grapes', confidence: 87, category: 'Fruits' },
    ],
    recipes: [
      {
        id: 3,
        name: 'Tropical Fruit Salad',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHNhbGFkfGVufDF8fHx8MTc2MTYzNDY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
        matchingIngredients: 4,
        totalIngredients: 5,
      },
      {
        id: 4,
        name: 'Berry Smoothie Bowl',
        image: 'https://images.unsplash.com/photo-1610450622351-340b283813b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBzbW9vdGhpZSUyMGJvd2x8ZW58MXx8fHwxNzYxNjI5NDc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        matchingIngredients: 3,
        totalIngredients: 4,
      },
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwY2hpY2tlbiUyMGJlZWZ8ZW58MXx8fHwxNzYxNjM0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ingredients: [
      { name: 'Chicken Breast', confidence: 97, category: 'Protein' },
      { name: 'Ground Beef', confidence: 93, category: 'Protein' },
      { name: 'Pork Chops', confidence: 90, category: 'Protein' },
      { name: 'Salmon', confidence: 88, category: 'Protein' },
    ],
    recipes: [
      {
        id: 5,
        name: 'Grilled Chicken Breast',
        image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZGlubmVyJTIwcGxhdGV8ZW58MXx8fHwxNzYxNjI5NDc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        matchingIngredients: 3,
        totalIngredients: 4,
      },
      {
        id: 6,
        name: 'Beef Bulgogi',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwYnVsZ29naXxlbnwxfHx8fDE3NjE2MzQ2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        matchingIngredients: 3,
        totalIngredients: 5,
      },
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZXMlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NjE2MzQ2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ingredients: [
      { name: 'Garlic', confidence: 95, category: 'Aromatics' },
      { name: 'Ginger', confidence: 93, category: 'Aromatics' },
      { name: 'Onions', confidence: 91, category: 'Aromatics' },
      { name: 'Cilantro', confidence: 88, category: 'Herbs' },
      { name: 'Basil', confidence: 86, category: 'Herbs' },
    ],
    recipes: [
      {
        id: 7,
        name: 'Chicken Adobo',
        image: 'https://images.unsplash.com/photo-1606525575548-2d62ed40291d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG9ibyUyMGZpbGlwaW5vJTIwZm9vZHxlbnwxfHx8fDE3NjE2MzQ2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        matchingIngredients: 4,
        totalIngredients: 6,
      },
      {
        id: 8,
        name: 'Thai Basil Stir-Fry',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGlyJTIwZnJ5JTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjE2MzQ2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        matchingIngredients: 5,
        totalIngredients: 6,
      },
    ],
  },
];

export const IngredientRecognitionPage: React.FC<IngredientRecognitionPageProps> = ({ onNavigate }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [detectedIngredients, setDetectedIngredients] = useState<DetectedIngredient[]>([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState<ScanResult['recipes']>([]);

  const mockScan = () => {
    setIsScanning(true);
    
    // Randomize scan result
    const randomResult = scanResults[Math.floor(Math.random() * scanResults.length)];
    setSelectedImage(randomResult.image);
    
    setTimeout(() => {
      setDetectedIngredients(randomResult.ingredients);
      setSuggestedRecipes(randomResult.recipes);
      setIsScanning(false);
      setHasScanned(true);
    }, 2000);
  };

  const handleReset = () => {
    setHasScanned(false);
    setSelectedImage(null);
    setDetectedIngredients([]);
    setSuggestedRecipes([]);
  };

  const handleAddToPantry = () => {
    // Mock adding to pantry
    alert('Ingredients added to your pantry!');
    handleReset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-pink-500 text-white p-6 pb-8 rounded-b-[3rem] mb-8 shadow-xl">
        <h1 className="text-3xl mb-2 text-white">Ingredient Scanner</h1>
        <p className="text-sm opacity-90 text-white">Snap a photo to identify ingredients instantly</p>
      </div>

      <div className="px-4 space-y-6">
        {!hasScanned ? (
          <>
            {/* Camera/Upload Area */}
            <Card className="border-2 border-dashed border-orange-300 dark:border-orange-700 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30 shadow-lg">
              <CardContent className="p-10">
                <div className="text-center space-y-6">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl">
                    <Camera className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-gray-900 dark:text-gray-100">Scan Your Ingredients</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Take a photo or upload an image to identify ingredients
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 pt-4">
                    <Button 
                      onClick={mockScan} 
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl shadow-lg" 
                      disabled={isScanning}
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      {isScanning ? 'Scanning...' : 'Take Photo'}
                    </Button>
                    <Button 
                      onClick={mockScan} 
                      variant="outline" 
                      className="w-full h-12 border-2 border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl" 
                      disabled={isScanning}
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload from Gallery
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 shadow-lg dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  Tips for Best Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">Place ingredients on a clean, flat surface</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">Ensure good lighting for accurate detection</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/40 dark:to-yellow-950/40 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">Keep ingredients separated for clarity</p>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Scanning Results */}
            {isScanning ? (
              <Card className="border-0 shadow-lg dark:bg-gray-900">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                  <p className="text-lg text-gray-900 dark:text-gray-100">Analyzing ingredients...</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This will only take a moment</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Scanned Image */}
                {selectedImage && (
                  <Card className="overflow-hidden border-0 shadow-xl">
                    <div className="relative">
                      <ImageWithFallback
                        src={selectedImage}
                        alt="Scanned ingredients"
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <button
                        onClick={handleReset}
                        className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </Card>
                )}

                {/* Detected Ingredients */}
                <Card className="border-0 shadow-lg dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      Detected Ingredients
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {detectedIngredients.length} ingredients identified with high accuracy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {detectedIngredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                            <div className="w-3 h-3 bg-white rounded-full" />
                          </div>
                          <div>
                            <p className="text-gray-900 dark:text-gray-100">{ingredient.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{ingredient.category}</p>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                          {ingredient.confidence}%
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    onClick={handleAddToPantry} 
                    className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-xl shadow-lg"
                  >
                    Add to Pantry
                  </Button>
                  <Button 
                    onClick={handleReset} 
                    variant="outline" 
                    className="flex-1 h-12 border-2 border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl"
                  >
                    Scan Again
                  </Button>
                </div>

                {/* Suggested Recipes */}
                <Card className="border-0 shadow-lg dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      Suggested Recipes
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Perfect matches based on your ingredients
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {suggestedRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="flex gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 rounded-xl hover:shadow-lg cursor-pointer transition-all hover:-translate-y-1"
                        onClick={() => onNavigate('recipes')}
                      >
                        <div className="relative">
                          <ImageWithFallback
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-20 h-20 rounded-xl object-cover shadow-md"
                          />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-2 text-gray-900 dark:text-gray-100">{recipe.name}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-white/50 dark:bg-gray-800/50 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                style={{ width: `${(recipe.matchingIngredients / recipe.totalIngredients) * 100}%` }}
                              />
                            </div>
                            <p className="text-xs text-purple-600 dark:text-purple-400">
                              {recipe.matchingIngredients}/{recipe.totalIngredients}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
