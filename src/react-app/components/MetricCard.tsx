import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  color: string;
  icon?: React.ReactNode;
  delay?: number;
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  color, 
  icon, 
  delay = 0 
}: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && (
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
                <div style={{ color }}>{icon}</div>
              </div>
            )}
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
          
          <motion.div
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-1"
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </motion.div>
          
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
          )}
        </div>
        
        <div 
          className="w-3 h-3 rounded-full opacity-75"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  );
}
