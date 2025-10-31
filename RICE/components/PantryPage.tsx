import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ArrowLeft, Plus, Scan, Package, AlertCircle, Calendar, Trash2, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

interface PantryPageProps {
  onBack: () => void;
}

export const PantryPage: React.FC<PantryPageProps> = ({ onBack }) => {
  const { pantryItems, addPantryItem, removePantryItem, updatePantryItem } = useApp();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    expirationDate: '',
    category: 'Other',
  });

  const categories = ['Dairy', 'Vegetables', 'Fruits', 'Meat', 'Grains', 'Pantry Staples', 'Other'];

  const getDaysUntilExpiration = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpirationStatus = (daysLeft: number) => {
    if (daysLeft < 0) return { color: 'bg-red-500', text: 'Expired', textColor: 'text-red-600' };
    if (daysLeft <= 3) return { color: 'bg-orange-500', text: `${daysLeft}d left`, textColor: 'text-orange-600' };
    if (daysLeft <= 7) return { color: 'bg-yellow-500', text: `${daysLeft}d left`, textColor: 'text-yellow-600' };
    return { color: 'bg-green-500', text: `${daysLeft}d left`, textColor: 'text-green-600' };
  };

  const sortedPantryItems = [...pantryItems].sort((a, b) => {
    const daysA = getDaysUntilExpiration(a.expirationDate);
    const daysB = getDaysUntilExpiration(b.expirationDate);
    return daysA - daysB;
  });

  const expiringCount = pantryItems.filter(item => getDaysUntilExpiration(item.expirationDate) <= 7).length;

  const handleAddItem = () => {
    if (newItem.name.trim() && newItem.quantity.trim() && newItem.expirationDate) {
      addPantryItem(newItem);
      toast.success('Item added to pantry!');
      setNewItem({ name: '', quantity: '', expirationDate: '', category: 'Other' });
      setAddDialogOpen(false);
    }
  };

  const handleScan = () => {
    setScanDialogOpen(false);
    // Mock scan result
    const mockScannedItems = [
      { name: 'Canned Beans', quantity: '2 cans', category: 'Pantry Staples' },
      { name: 'Rice', quantity: '1 kg', category: 'Grains' },
    ];
    
    mockScannedItems.forEach(item => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      addPantryItem({
        ...item,
        expirationDate: expirationDate.toISOString().split('T')[0],
      });
    });
    
    toast.success('Scanned and added 2 items to pantry!');
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
  };

  const saveEditedItem = () => {
    if (editingItem) {
      updatePantryItem(editingItem.id, {
        name: editingItem.name,
        quantity: editingItem.quantity,
        expirationDate: editingItem.expirationDate,
        category: editingItem.category,
      });
      toast.success('Item updated!');
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id: string, name: string) => {
    removePantryItem(id);
    toast.success(`${name} removed from pantry!`);
  };

  const groupedItems = sortedPantryItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof sortedPantryItems>);

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
            <h1 className="text-3xl">My Pantry</h1>
            <p className="text-sm opacity-90 mt-1">
              {pantryItems.length} items stored
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => setAddDialogOpen(true)}
            className="flex-1 bg-white/20 hover:bg-white/30 border-white/30 backdrop-blur-sm"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
          <Button
            onClick={() => setScanDialogOpen(true)}
            className="flex-1 bg-white/20 hover:bg-white/30 border-white/30 backdrop-blur-sm"
            variant="outline"
          >
            <Scan className="w-4 h-4 mr-2" />
            Scan
          </Button>
        </div>

        {/* Alert */}
        {expiringCount > 0 && (
          <div className="mt-4 bg-orange-100/20 border border-white/30 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">
                {expiringCount} item{expiringCount > 1 ? 's' : ''} expiring within 7 days
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pantry Items */}
      <div className="px-4 space-y-6">
        {sortedPantryItems.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center">
                <Package className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-lg mb-2">Your pantry is empty</h3>
              <p className="text-sm text-gray-500 mb-4">
                Add items manually or scan barcodes to get started
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => setAddDialogOpen(true)}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
                <Button
                  onClick={() => setScanDialogOpen(true)}
                  variant="outline"
                  className="border-2 border-orange-300 text-orange-600"
                >
                  <Scan className="w-4 h-4 mr-2" />
                  Scan
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-lg mb-3 px-1">{category}</h2>
              <div className="space-y-3">
                {items.map((item) => {
                  const daysLeft = getDaysUntilExpiration(item.expirationDate);
                  const status = getExpirationStatus(daysLeft);
                  
                  return (
                    <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl">
                            <Package className="w-5 h-5 text-orange-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base mb-1">{item.name}</h3>
                            <div className="flex items-center gap-2 flex-wrap text-sm text-gray-600">
                              <Badge variant="outline">{item.quantity}</Badge>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span className="text-xs">{item.expirationDate}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <Badge className={`${status.color} text-white border-0`}>
                                {status.text}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEditItem(item)}
                              className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4 text-orange-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id, item.name)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Item Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Item to Pantry</DialogTitle>
            <DialogDescription>
              Add a new item to your pantry inventory
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="e.g., Milk"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                placeholder="e.g., 1 gallon"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiration">Expiration Date</Label>
              <Input
                id="expiration"
                type="date"
                value={newItem.expirationDate}
                onChange={(e) => setNewItem({ ...newItem, expirationDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleAddItem}
              disabled={!newItem.name.trim() || !newItem.quantity.trim() || !newItem.expirationDate}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Pantry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scan Dialog */}
      <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan Barcode</DialogTitle>
            <DialogDescription>
              Point your camera at the barcode to scan items
            </DialogDescription>
          </DialogHeader>
          <div className="py-8">
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Scan className="w-16 h-16 text-gray-400 mx-auto mb-3 animate-pulse" />
                <p className="text-sm text-gray-500">Camera view placeholder</p>
                <p className="text-xs text-gray-400 mt-1">This is a demo - real scanning would appear here</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleScan}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              Simulate Scan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={editingItem !== null} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Update item details
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Item Name</Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-quantity">Quantity</Label>
                <Input
                  id="edit-quantity"
                  value={editingItem.quantity}
                  onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select value={editingItem.category} onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}>
                  <SelectTrigger id="edit-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-expiration">Expiration Date</Label>
                <Input
                  id="edit-expiration"
                  type="date"
                  value={editingItem.expirationDate}
                  onChange={(e) => setEditingItem({ ...editingItem, expirationDate: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={saveEditedItem}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
