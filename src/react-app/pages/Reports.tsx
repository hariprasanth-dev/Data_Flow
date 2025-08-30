import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  Share2,
  TrendingUp,
  BarChart,
  PieChart,
  Activity
} from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import AnimatedChart from '@/react-app/components/AnimatedChart';
import { useSalesData, useUserAnalytics, usePerformanceMetrics } from '@/react-app/hooks/useApi';
import { useState } from 'react';

type ReportType = 'sales' | 'analytics' | 'performance' | 'custom';

export default function Reports() {
  const [activeReport, setActiveReport] = useState<ReportType>('sales');
  const [dateRange, setDateRange] = useState('30d');
  
  const { data: salesData } = useSalesData();
  const { data: analyticsData } = useUserAnalytics();
  const { data: metricsData } = usePerformanceMetrics();

  const reportTypes = [
    { id: 'sales', label: 'Sales Report', icon: TrendingUp, color: 'blue' },
    { id: 'analytics', label: 'Analytics Report', icon: BarChart, color: 'green' },
    { id: 'performance', label: 'Performance Report', icon: Activity, color: 'purple' },
    { id: 'custom', label: 'Custom Report', icon: PieChart, color: 'orange' },
  ];

  const dateRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];

  // Transform data based on active report
  const getReportData = () => {
    switch (activeReport) {
      case 'sales':
        return salesData?.map(item => ({
          period: item.month,
          revenue: item.revenue / 1000,
          orders: item.orders,
          customers: item.customers,
          avgOrderValue: Math.round(item.revenue / item.orders)
        }));
      
      case 'analytics':
        return analyticsData?.slice(0, 12).reverse().map(item => ({
          period: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          activeUsers: item.active_users,
          newUsers: item.new_users,
          sessionDuration: Math.round(item.session_duration / 60),
          bounceRate: item.bounce_rate
        }));
      
      case 'performance':
        const groupedMetrics = metricsData?.reduce((acc, metric) => {
          const existing = acc.find(item => item.category === metric.category);
          if (existing) {
            existing.count += 1;
            existing.avgValue = (existing.avgValue + metric.metric_value) / 2;
          } else {
            acc.push({
              category: metric.category,
              count: 1,
              avgValue: metric.metric_value
            });
          }
          return acc;
        }, [] as any[]);
        return groupedMetrics;
      
      default:
        return [];
    }
  };

  const reportData = getReportData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Reports & Analytics
              </h1>
              <p className="text-gray-600">Generate comprehensive reports and export insights</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </motion.div>

        {/* Report Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Report Type Selector */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {reportTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setActiveReport(type.id as ReportType)}
                      className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeReport === type.id
                          ? `bg-${type.color}-100 text-${type.color}-700 border-2 border-${type.color}-200`
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date Range & Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {dateRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    <Filter className="w-3 h-3" />
                    Filter
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    <Calendar className="w-3 h-3" />
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Report Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeReport}
        >
          {activeReport === 'sales' && reportData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatedChart
                data={reportData}
                type="bar"
                dataKey="revenue"
                xKey="period"
                color="#3B82F6"
                title="Revenue Trend (K$)"
                height={400}
              />
              <AnimatedChart
                data={reportData}
                type="line"
                dataKey="orders"
                xKey="period"
                color="#10B981"
                title="Orders Volume"
                height={400}
              />
            </div>
          )}

          {activeReport === 'analytics' && reportData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatedChart
                data={reportData}
                type="area"
                dataKey="activeUsers"
                xKey="period"
                color="#8B5CF6"
                title="Active Users Trend"
                height={400}
              />
              <AnimatedChart
                data={reportData}
                type="line"
                dataKey="sessionDuration"
                xKey="period"
                color="#EF4444"
                title="Session Duration (Minutes)"
                height={400}
              />
            </div>
          )}

          {activeReport === 'performance' && reportData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatedChart
                data={reportData}
                type="bar"
                dataKey="count"
                xKey="category"
                color="#F59E0B"
                title="Metrics by Category"
                height={400}
              />
              <AnimatedChart
                data={reportData}
                type="pie"
                dataKey="avgValue"
                xKey="category"
                color="#06B6D4"
                title="Performance Distribution"
                height={400}
              />
            </div>
          )}

          {activeReport === 'custom' && (
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Report Builder</h3>
              <p className="text-gray-600 mb-6">Create custom reports with your preferred metrics and visualizations</p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Build Custom Report
              </button>
            </div>
          )}
        </motion.div>

        {/* Report Summary */}
        {reportData && reportData.length > 0 && activeReport !== 'custom' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{reportData.length}</p>
                <p className="text-sm text-gray-600">Data Points</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {new Date().toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Generated On</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{dateRange.toUpperCase()}</p>
                <p className="text-sm text-gray-600">Time Range</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
