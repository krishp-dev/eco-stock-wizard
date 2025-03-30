
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Search, Download, Eye, Pencil, Trash2 } from 'lucide-react';
import { InventoryItem, ItemCategory } from '@/types/inventory';
import { useToast } from '@/hooks/use-toast';

interface InventoryTableProps {
  items: InventoryItem[];
  onViewItem: (item: InventoryItem) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items, onViewItem }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ItemCategory | 'all'>('all');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
    return matchesSearch && matchesCategory;
  });
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your inventory data is being exported",
    });
  };
  
  const handleEdit = (item: InventoryItem) => {
    toast({
      title: "Edit Item",
      description: `Editing ${item.name}`,
    });
  };
  
  const handleDelete = (item: InventoryItem) => {
    toast({
      title: "Delete Item",
      description: `${item.name} has been removed from inventory`,
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader className="bg-petpooja-primary text-white py-4 px-6 flex flex-row justify-between items-center">
        <h3 className="font-semibold text-lg">Inventory Items</h3>
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-white text-petpooja-primary hover:bg-slate-100"
          onClick={handleExport}
        >
          <Download className="h-4 w-4 mr-1" /> Export
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search items..." 
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {['all', 'vegetable', 'dairy', 'meat', 'spice', 'grain'].map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category as ItemCategory | 'all')}
            >
              {category === 'all' ? 'All' : 
                category.charAt(0).toUpperCase() + category.slice(1) + 's'}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-petpooja-gray font-semibold py-3 px-4 border-b w-16"></th>
                <th className="text-left text-petpooja-gray font-semibold py-3 px-4 border-b">Item Name</th>
                <th className="text-left text-petpooja-gray font-semibold py-3 px-4 border-b">Category</th>
                <th className="text-left text-petpooja-gray font-semibold py-3 px-4 border-b">Quantity</th>
                <th className="text-left text-petpooja-gray font-semibold py-3 px-4 border-b">Expiry Date</th>
                <th className="text-left text-petpooja-gray font-semibold py-3 px-4 border-b">Freshness</th>
                <th className="text-left text-petpooja-gray font-semibold py-3 px-4 border-b">Status</th>
                <th className="text-left text-petpooja-gray font-semibold py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr 
                  key={item.id} 
                  className="bg-slate-50 hover:bg-white hover:-translate-y-0.5 transition-all duration-200 hover:shadow"
                >
                  <td className="py-4 px-4 rounded-l-lg">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-10 h-10 rounded-md object-cover border border-slate-200"
                      />
                    )}
                  </td>
                  <td className="py-4 px-4 font-semibold">{item.name}</td>
                  <td className="py-4 px-4">
                    <span className={`item-category category-${item.category}`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">{`${item.quantity} ${item.unit}`}</td>
                  <td className="py-4 px-4">{new Date(item.expiryDate).toLocaleDateString()}</td>
                  <td className="py-4 px-4">
                    <span className={`freshness-badge freshness-${item.freshness}`}>
                      {item.freshness.charAt(0).toUpperCase() + item.freshness.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`status-badge status-${item.status}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 rounded-r-lg">
                    <div className="flex">
                      <button 
                        className="btn-action btn-view" 
                        onClick={() => onViewItem(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="btn-action btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button 
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground">
                    No inventory items found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
