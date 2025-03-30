
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { getExpiringItems } from '@/lib/inventory-data';

const ExpiryWarning = () => {
  const expiringItems = getExpiringItems();
  const count = expiringItems.length;

  if (count === 0) return null;

  return (
    <div className="flex p-4 bg-petpooja-warning/10 border-l-4 border-petpooja-warning rounded-lg mb-5 items-center">
      <AlertTriangle className="text-petpooja-warning mr-4 h-6 w-6" />
      <div>
        <h5 className="font-semibold mb-1">Items Expiring Soon</h5>
        <p className="mb-0 text-sm">
          {count} {count === 1 ? 'item is' : 'items are'} about to expire in the next 3 days. 
          <a href="#" className="text-petpooja-primary ml-1 font-medium hover:underline">View items</a>
        </p>
      </div>
    </div>
  );
};

export default ExpiryWarning;
