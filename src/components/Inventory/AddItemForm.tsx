
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Camera, X } from 'lucide-react';
import { ItemCategory, ItemUnit } from '@/types/inventory';
import { useToast } from '@/hooks/use-toast';

interface AddItemFormProps {
  onCancel: () => void;
  onSave: (item: any) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onCancel, onSave }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    expiryDate: '',
    threshold: '',
    notes: ''
  });

  const [showCamera, setShowCamera] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.quantity || !formData.unit) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const newItem = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category as ItemCategory,
      quantity: parseFloat(formData.quantity),
      unit: formData.unit as ItemUnit,
      expiryDate: formData.expiryDate || new Date().toISOString().split('T')[0],
      freshness: 'fresh',
      status: parseFloat(formData.quantity) <= parseFloat(formData.threshold) ? 'low' : 'good',
      spoilageScore: 0,
      threshold: parseFloat(formData.threshold) || 0,
      notes: formData.notes,
      image: 'https://images.unsplash.com/photo-1553787774-755e3f452222?auto=format&fit=crop&q=60&w=100&h=100'
    };
    
    onSave(newItem);
    
    toast({
      title: "Item Added",
      description: `${formData.name} has been added to inventory`,
    });
    
    // Reset form
    setFormData({
      name: '',
      category: '',
      quantity: '',
      unit: '',
      expiryDate: '',
      threshold: '',
      notes: ''
    });
  };

  const startCamera = () => {
    setShowCamera(true);
    toast({
      title: "Camera functionality",
      description: "Camera integration would be implemented with a real device",
    });
  };

  const stopCamera = () => {
    setShowCamera(false);
  };

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>Add New Inventory Item</CardTitle>
        <CardDescription>Fill in the details or use camera to scan the item</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input 
                id="name"
                placeholder="Enter item name" 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('category', value)}
                value={formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetable">Vegetable</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="meat">Meat</SelectItem>
                  <SelectItem value="spice">Spice</SelectItem>
                  <SelectItem value="grain">Grain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity"
                type="number"
                placeholder="Enter quantity" 
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('unit', value)}
                value={formData.unit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="g">Grams (g)</SelectItem>
                  <SelectItem value="l">Liters (L)</SelectItem>
                  <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input 
                id="expiryDate"
                type="date" 
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="threshold">Threshold Alert</Label>
              <Input 
                id="threshold"
                type="number"
                placeholder="Alert when below" 
                value={formData.threshold}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Additional notes" 
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          
          <div className="bg-slate-50 rounded-lg p-5 mb-4">
            <h5 className="font-semibold mb-2">Or Scan Item Using Camera</h5>
            <p className="text-muted-foreground text-sm mb-4">Our AI will recognize the item and fill in the details</p>
            
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-lg h-64 flex items-center justify-center mb-4 relative">
              {!showCamera ? (
                <div className="text-center">
                  <Camera className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Click below to start camera</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-full h-full bg-slate-200 rounded-md">
                    <p className="pt-20 text-slate-500">Camera preview would display here</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 justify-center">
              {!showCamera ? (
                <Button type="button" onClick={startCamera}>
                  <Camera className="mr-2 h-4 w-4" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <Button type="button" onClick={stopCamera} variant="outline">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button type="button">
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Save Item</Button>
      </CardFooter>
    </Card>
  );
};

export default AddItemForm;
