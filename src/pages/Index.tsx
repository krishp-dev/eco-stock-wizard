
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/Dashboard/StatCard';
import ExpiryWarning from '@/components/Dashboard/ExpiryWarning';
import InventoryTable from '@/components/Inventory/InventoryTable';
import AddItemForm from '@/components/Inventory/AddItemForm';
import ItemDetailsModal from '@/components/Inventory/ItemDetailsModal';
import { Button } from '@/components/ui/button';
import { Package, AlertTriangle, Clock, CheckCircle, Plus } from 'lucide-react';
import { inventoryItems, getDashboardStats } from '@/lib/inventory-data';
import { InventoryItem } from '@/types/inventory';

const Index = () => {
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<InventoryItem[]>(inventoryItems);
  
  const stats = getDashboardStats();
  
  const handleAddItem = () => {
    setShowAddItemForm(true);
  };
  
  const handleCancelAddItem = () => {
    setShowAddItemForm(false);
  };
  
  const handleSaveItem = (newItem: InventoryItem) => {
    setItems([newItem, ...items]);
    setShowAddItemForm(false);
  };
  
  const handleViewItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Dashboard Header */}
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h4 className="text-xl font-bold mb-1">Inventory Dashboard</h4>
                  <p className="text-muted-foreground">
                    Welcome back! Here's what's happening with your inventory today.
                  </p>
                </div>
                <Button onClick={handleAddItem} className="bg-petpooja-primary hover:bg-petpooja-primary-light">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Item
                </Button>
              </div>
            </div>
            
            {/* Add Item Form */}
            {showAddItemForm && (
              <AddItemForm 
                onCancel={handleCancelAddItem}
                onSave={handleSaveItem}  
              />
            )}
            
            {/* Expiry Warning */}
            <ExpiryWarning />
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatCard 
                icon={Package} 
                value={stats.totalItems} 
                label="Total Items" 
                progressValue={75} 
              />
              <StatCard 
                icon={AlertTriangle} 
                value={stats.lowStockItems} 
                label="Low Stock Items" 
                progressValue={25}
                progressColor="bg-petpooja-warning" 
              />
              <StatCard 
                icon={Clock} 
                value={stats.expiringItems} 
                label="Expiring Items" 
                progressValue={10}
                progressColor="bg-petpooja-danger" 
              />
              <StatCard 
                icon={CheckCircle} 
                value={stats.inStockItems} 
                label="In Stock Items" 
                progressValue={65}
                progressColor="bg-petpooja-success" 
              />
            </div>
            
            {/* Inventory Table */}
            <InventoryTable 
              items={items} 
              onViewItem={handleViewItem} 
            />
            
            {/* Item Details Modal */}
            <ItemDetailsModal 
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              item={selectedItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
