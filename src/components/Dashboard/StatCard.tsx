
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  progressValue: number;
  progressColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  value, 
  label, 
  progressValue,
  progressColor = 'bg-petpooja-primary'
}) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon className="h-5 w-5" />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
        <div 
          className={`h-full ${progressColor} rounded-full`}
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatCard;
