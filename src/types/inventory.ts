
export type ItemCategory = 'vegetable' | 'dairy' | 'meat' | 'spice' | 'grain';
export type ItemStatus = 'good' | 'low' | 'critical';
export type FreshnessStatus = 'fresh' | 'warning' | 'spoiled';
export type ItemUnit = 'kg' | 'g' | 'l' | 'pcs';

export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  quantity: number;
  unit: ItemUnit;
  expiryDate: string;
  freshness: FreshnessStatus;
  status: ItemStatus;
  spoilageScore: number;
  threshold: number;
  notes?: string;
  image?: string;
}

export interface DashboardStats {
  totalItems: number;
  lowStockItems: number;
  expiringItems: number;
  inStockItems: number;
}
