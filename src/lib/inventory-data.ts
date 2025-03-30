
import { InventoryItem, DashboardStats, ItemCategory, FreshnessStatus, ItemStatus } from '../types/inventory';

// Sample inventory data
export const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    category: 'vegetable',
    quantity: 10,
    unit: 'kg',
    expiryDate: '2025-04-01',
    freshness: 'fresh',
    status: 'good',
    spoilageScore: 0.1,
    threshold: 5,
    notes: 'Fresh stock',
    image: 'https://images.unsplash.com/photo-1546104710-d33c9c516094?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: '2',
    name: 'Lettuce',
    category: 'vegetable',
    quantity: 2,
    unit: 'kg',
    expiryDate: '2025-03-31',
    freshness: 'warning',
    status: 'low',
    spoilageScore: 0.6,
    threshold: 3,
    notes: 'Check for spoilage',
    image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: '3',
    name: 'Milk',
    category: 'dairy',
    quantity: 15,
    unit: 'l',
    expiryDate: '2025-03-29',
    freshness: 'fresh',
    status: 'good',
    spoilageScore: 0.05,
    threshold: 10,
    notes: 'Refrigerate properly',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: '4',
    name: 'Chicken',
    category: 'meat',
    quantity: 5,
    unit: 'kg',
    expiryDate: '2025-03-30',
    freshness: 'fresh',
    status: 'good',
    spoilageScore: 0.2,
    threshold: 3,
    notes: 'Keep frozen',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: '5',
    name: 'Cumin',
    category: 'spice',
    quantity: 1,
    unit: 'kg',
    expiryDate: '2025-08-15',
    freshness: 'fresh',
    status: 'good',
    spoilageScore: 0.0,
    threshold: 0.3,
    notes: 'Store in cool, dry place',
    image: 'https://images.unsplash.com/photo-1590301157993-351806cdeeee?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: '6',
    name: 'Rice',
    category: 'grain',
    quantity: 25,
    unit: 'kg',
    expiryDate: '2025-12-31',
    freshness: 'fresh',
    status: 'good',
    spoilageScore: 0.0,
    threshold: 10,
    notes: 'Keep in airtight container',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: '7',
    name: 'Paneer',
    category: 'dairy',
    quantity: 1,
    unit: 'kg',
    expiryDate: '2025-03-28',
    freshness: 'warning',
    status: 'low',
    spoilageScore: 0.4,
    threshold: 2,
    notes: 'Fresh batch',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: '8',
    name: 'Onions',
    category: 'vegetable',
    quantity: 0.5,
    unit: 'kg',
    expiryDate: '2025-04-15',
    freshness: 'spoiled',
    status: 'critical',
    spoilageScore: 0.9,
    threshold: 3,
    notes: 'Needs replacement',
    image: 'https://images.unsplash.com/photo-1583849215097-b62d50912294?auto=format&fit=crop&q=80&w=100&h=100'
  }
];

// Get dashboard statistics
export const getDashboardStats = (): DashboardStats => {
  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => item.status === 'low').length;
  const expiringItems = inventoryItems.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  }).length;
  const inStockItems = inventoryItems.filter(item => item.quantity > 0).length;

  return {
    totalItems,
    lowStockItems,
    expiringItems,
    inStockItems
  };
};

// Get expiring items (expiring in the next 3 days)
export const getExpiringItems = (): InventoryItem[] => {
  return inventoryItems.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  });
};

// Filter items by category
export const filterItemsByCategory = (category: ItemCategory | 'all'): InventoryItem[] => {
  if (category === 'all') {
    return [...inventoryItems];
  }
  return inventoryItems.filter(item => item.category === category);
};

// Search items by name
export const searchItems = (query: string): InventoryItem[] => {
  if (!query) return [...inventoryItems];
  const lowerCaseQuery = query.toLowerCase();
  return inventoryItems.filter(item => 
    item.name.toLowerCase().includes(lowerCaseQuery)
  );
};

// Get item by ID
export const getItemById = (id: string): InventoryItem | undefined => {
  return inventoryItems.find(item => item.id === id);
};
