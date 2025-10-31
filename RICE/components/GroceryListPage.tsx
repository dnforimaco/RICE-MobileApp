import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { ShoppingCart, Trash2, Download, Share2, Plus, ArrowLeft, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface GroceryListPageProps {
  onBack: () => void;
}

export const GroceryListPage: React.FC<GroceryListPageProps> = ({ onBack }) => {
  const { groceryList, toggleGroceryItem, removeGroceryItem, updateGroceryItemQuantity, clearGroceryList, addToGroceryList } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');

  const checkedCount = groceryList.filter(item => item.checked).length;
  const totalCount = groceryList.length;

  const handleEditQuantity = (id: string, currentQuantity: string) => {
    setEditingId(id);
    setEditQuantity(currentQuantity);
  };

  const saveQuantity = (id: string) => {
    if (editQuantity.trim()) {
      updateGroceryItemQuantity(id, editQuantity);
      toast.success('Quantity updated!');
    }
    setEditingId(null);
    setEditQuantity('');
  };

  const handleExportList = () => {
    const textList = groceryList
      .map((item, i) => `${i + 1}. ${item.checked ? '✓' : '○'} ${item.name} - ${item.quantity}`)
      .join('\n');
    
    // Create a mock download
    const blob = new Blob([textList], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grocery-list.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Grocery list exported!');
  };

  const handleShareList = () => {
    const textList = groceryList
      .map((item) => `${item.checked ? '✓' : '○'} ${item.name} - ${item.quantity}`)
      .join('\n');
    
    if (navigator.share) {
      navigator.share({
        title: 'My Grocery List',
        text: textList,
      }).catch(() => {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(textList);
        toast.success('List copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(textList);
      toast.success('List copied to clipboard!');
    }
  };

  const handleAddItem = () => {
    if (newItemName.trim() && newItemQuantity.trim()) {
      addToGroceryList([{
        name: newItemName,
        quantity: newItemQuantity,
        checked: false,
        recipeId: 0,
      }]);
      toast.success('Item added to list!');
      setNewItemName('');
      setNewItemQuantity('');
      setAddItemOpen(false);
    }
  };

  const handleClearCompleted = () => {
    const unchecked = groceryList.filter(item => !item.checked);
    const checkedItems = groceryList.filter(item => item.checked);
    checkedItems.forEach(item => removeGroceryItem(item.id));
    toast.success(`Removed ${checkedItems.length} completed items!`);
  };

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
            <h1 className="text-3xl">Grocery List</h1>
            <p className="text-sm opacity-90 mt-1">
              {checkedCount} of {totalCount} items purchased
            </p>
          </div>
          <button
            onClick={() => setAddItemOpen(true)}
            className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="bg-white/15 rounded-xl p-4 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Shopping Progress</span>
            <span className="text-sm">{totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-white h-2.5 rounded-full transition-all"
              style={{ width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mb-6 flex gap-3">
        <Button
          onClick={handleExportList}
          variant="outline"
          className="flex-1 border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
          disabled={totalCount === 0}
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button
          onClick={handleShareList}
          variant="outline"
          className="flex-1 border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
          disabled={totalCount === 0}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button
          onClick={handleClearCompleted}
          variant="outline"
          className="flex-1 border-2 border-red-300 text-red-600 hover:bg-red-50"
          disabled={checkedCount === 0}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      {/* Grocery Items */}
      <div className="px-4 space-y-3">
        {groceryList.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-lg mb-2">No items yet</h3>
              <p className="text-sm text-gray-500 mb-4">
                Add items from recipes or create your own list
              </p>
              <Button
                onClick={() => setAddItemOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Item
              </Button>
            </CardContent>
          </Card>
        ) : (
          groceryList.map((item) => (
            <Card
              key={item.id}
              className={`border-0 shadow-md hover:shadow-lg transition-all ${
                item.checked ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={() => toggleGroceryItem(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-base mb-1 ${
                        item.checked ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {item.name}
                    </h3>
                    {editingId === item.id ? (
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                          className="h-8 text-sm"
                          placeholder="Quantity"
                          autoFocus
                        />
                        <Button
                          size="sm"
                          onClick={() => saveQuantity(item.id)}
                          className="h-8 bg-gradient-to-r from-green-500 to-emerald-500"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                          className="h-8"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleEditQuantity(item.id, item.quantity)}
                          className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                        >
                          <Badge variant="outline" className="cursor-pointer hover:bg-orange-50">
                            {item.quantity}
                          </Badge>
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      removeGroceryItem(item.id);
                      toast.success('Item removed!');
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Item Dialog */}
      <Dialog open={addItemOpen} onOpenChange={setAddItemOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Item to List</DialogTitle>
            <DialogDescription>
              Add a custom item to your grocery list
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="item-name">Item Name</Label>
              <Input
                id="item-name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="e.g., Tomatoes"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-quantity">Quantity</Label>
              <Input
                id="item-quantity"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                placeholder="e.g., 500g, 2 pieces"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleAddItem}
              disabled={!newItemName.trim() || !newItemQuantity.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
