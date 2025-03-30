
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InventoryItem } from '@/types/inventory';

interface ItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ isOpen, onClose, item }) => {
  if (!item) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Item Details</DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-4">
          {item.image && (
            <img 
              src={item.image} 
              alt={item.name} 
              className="max-h-36 rounded-md mx-auto object-cover"
            />
          )}
        </div>
        
        <h3 className="text-xl font-bold text-center mb-4">{item.name}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2">
              <span className="font-semibold">Category:</span>{' '}
              <span className={`item-category category-${item.category}`}>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Quantity:</span>{' '}
              {`${item.quantity} ${item.unit}`}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Expiry Date:</span>{' '}
              {new Date(item.expiryDate).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Freshness Status:</span>{' '}
              <span className={`freshness-badge freshness-${item.freshness}`}>
                {item.freshness.charAt(0).toUpperCase() + item.freshness.slice(1)}
              </span>
            </p>
          </div>
          <div>
            <p className="mb-2">
              <span className="font-semibold">Status:</span>{' '}
              <span className={`status-badge status-${item.status}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Threshold:</span>{' '}
              {`${item.threshold} ${item.unit}`}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Spoilage Score:</span>{' '}
              {`${(item.spoilageScore * 100).toFixed(1)}%`}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Notes:</span>{' '}
              {item.notes || 'No notes available'}
            </p>
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailsModal;
