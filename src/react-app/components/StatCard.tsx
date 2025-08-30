import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color, 
  trend, 
  delay = 0 
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          
          <motion.div
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </motion.div>
          
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className={`inline-block w-0 h-0 border-l-[3px] border-r-[3px] border-l-transparent border-r-transparent ${
                trend.isPositive 
                  ? 'border-b-[4px] border-b-green-600' 
                  : 'border-t-[4px] border-t-red-600'
              }`}></span>
              <span>{Math.abs(trend.value).toFixed(1)}%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        
        <div 
          className="w-2 h-2 rounded-full opacity-50"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  );
}
