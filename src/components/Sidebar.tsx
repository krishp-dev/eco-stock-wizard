
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  Truck, 
  ArrowLeftRight, 
  PieChart, 
  LineChart, 
  Bell, 
  Settings, 
  Users 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-white rounded-lg shadow-md h-full overflow-y-auto">
      <div className="bg-petpooja-primary text-white p-5 font-semibold">
        Smart Inventory
      </div>
      <div className="p-5">
        <ul className="space-y-1">
          <li>
            <a 
              href="#" 
              className="flex items-center p-3 text-petpooja-dark font-medium rounded-lg hover:bg-petpooja-primary/10 hover:text-petpooja-primary bg-petpooja-primary/10 text-petpooja-primary"
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-3 text-petpooja-dark font-medium rounded-lg hover:bg-petpooja-primary/10 hover:text-petpooja-primary"
            >
              <Package className="mr-3 h-5 w-5" />
              Inventory Items
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-3 text-petpooja-dark font-medium rounded-lg hover:bg-petpooja-primary/10 hover:text-petpooja-primary"
            >
              <Boxes className="mr-3 h-5 w-5" />
              Categories
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-3 text-petpooja-dark font-medium rounded-lg hover:bg-petpooja-primary/10 hover:text-petpooja-primary"
            >
              <Truck className="mr-3 h-5 w-5" />
              Suppliers
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-3 text-petpooja-dark font-medium rounded-lg hover:bg-petpooja-primary/10 hover:text-petpooja-primary"
            >
              <ArrowLeftRight className="mr-3 h-5 w-5" />
              Transactions
            </a>
          </li>
          
          <li className="text-petpooja-gray text-xs font-semibold uppercase mt-6 mb-2 px-3">
            Analytics
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-3 text-petpooja-dark font-medium rounded-lg hover:bg-petpooja-primary/10 hover:text-petpooja-primary"
            >
              <PieChart className="mr-3 h-5 w-5" />
              Reports
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-3 text-petpooja-dark font-medium rounded-lg hover:bg-petpooja-primary/10 hover:text-petpooja-primary"
            >
              <LineChart className="mr-3 h-5 w-5" />
              Trends
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-3 text-petpooja-dark font-medium rounded-lg hover:bg-petpooja-primary/10 hover:text-petpooja-primary"
            >
              <Bell className="mr-3 h-5 w-5" />
              Alerts
            </a>
          </li>
          
          <li className="text-petpooja-gray text-xs font-semibold uppercase mt-6 mb-2 px-3">
            Settings
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-3 text-petpooja-dark font-medium rounded-lg hover:bg-petpooja-primary/10 hover:text-petpooja-primary"
            >
              <Settings className="mr-3 h-5 w-5" />
              Preferences
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center p-3 text-petpooja-dark font-medium rounded-lg hover:bg-petpooja-primary/10 hover:text-petpooja-primary"
            >
              <Users className="mr-3 h-5 w-5" />
              Users
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
