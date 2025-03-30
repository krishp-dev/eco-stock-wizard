
import React from 'react';
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-petpooja-primary">PETPOOJA</a>
          
          <div className="hidden md:flex items-center space-x-1">
            <a href="/" className="px-3 py-2 text-petpooja-dark font-medium hover:text-petpooja-primary">Dashboard</a>
            <a href="/inventory" className="px-3 py-2 text-petpooja-dark font-medium hover:text-petpooja-primary">Inventory</a>
            <a href="/reports" className="px-3 py-2 text-petpooja-dark font-medium hover:text-petpooja-primary">Reports</a>
            <a href="/settings" className="px-3 py-2 text-petpooja-dark font-medium hover:text-petpooja-primary">Settings</a>
            <a href="/help" className="px-3 py-2 text-petpooja-dark font-medium hover:text-petpooja-primary">Help</a>
            
            <Button variant="outline" className="ml-4 border-petpooja-primary text-petpooja-primary hover:bg-petpooja-primary hover:text-white">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
