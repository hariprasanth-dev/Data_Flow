import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  Activity,
  TrendingUp,
  ShoppingCart,
  Target,
  Database,
  BarChart3
} from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import MetricCard from '@/react-app/components/MetricCard';
import AnimatedChart from '@/react-app/components/AnimatedChart';
import { 
  useSalesData, 
  useUserAnalytics, 
  usePerformanceMetrics,
  useRealtimeMetrics 
} from '@/react-app/hooks/useApi';
import { useLocalAuth } from '@/react-app/hooks/useLocalAuth';

export default function Dashboard() {
  const { user } = useLocalAuth();
  const { data: salesData, loading: salesLoading } = useSalesData();
  const { data: analyticsData, loading: analyticsLoading } = useUserAnalytics();
  const { data: metricsData, loading: metricsLoading } = usePerformanceMetrics();
  const { data: realtimeData, loading: realtimeLoading } = useRealtimeMetrics();

  // Transform data for charts
  const salesChartData = salesData?.map(item => ({
    month: item.month,
    revenue: item.revenue / 1000, // Convert to thousands
    orders: item.orders,
    customers: item.customers
  }));

  const analyticsChartData = analyticsData?.slice(0, 10).reverse().map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    active_users: item.active_users,
    new_users: item.new_users,
    session_duration: item.session_duration
  }));

  const performanceChartData = metricsData?.reduce((acc, metric) => {
    const existing = acc.find(item => item.category === metric.category);
    if (existing) {
      existing[metric.metric_name] = metric.metric_value;
    } else {
      acc.push({
        category: metric.category,
        [metric.metric_name]: metric.metric_value
      });
    }
    return acc;
  }, [] as any[]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (salesLoading || analyticsLoading || metricsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-600">Here's what's happening with your data today</p>
            </div>
            <div className="hidden md:block bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-right">
                <div className="text-sm text-gray-500">Last login</div>
                <div className="text-sm font-medium text-gray-900">
                  {user?.loginTime ? new Date(user.loginTime).toLocaleString() : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Sales Records</p>
                <p className="text-2xl font-bold">{salesData?.length || 0}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Analytics Data Points</p>
                <p className="text-2xl font-bold">{analyticsData?.length || 0}</p>
              </div>
              <Activity className="w-8 h-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Performance Metrics</p>
                <p className="text-2xl font-bold">{metricsData?.length || 0}</p>
              </div>
              <Target className="w-8 h-8 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Database Tables</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Database className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </motion.div>

        {/* Data Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Sales Summary</h3>
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Records:</span>
                <span className="font-semibold">{salesData?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Revenue:</span>
                <span className="font-semibold text-green-600">
                  ${salesData ? salesData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString() : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Orders:</span>
                <span className="font-semibold text-blue-600">
                  {salesData ? salesData.reduce((sum, item) => sum + item.orders, 0).toLocaleString() : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Customers:</span>
                <span className="font-semibold text-purple-600">
                  {salesData ? salesData.reduce((sum, item) => sum + item.customers, 0).toLocaleString() : 0}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">User Analytics</h3>
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Data Points:</span>
                <span className="font-semibold">{analyticsData?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Peak Users:</span>
                <span className="font-semibold text-green-600">
                  {analyticsData ? Math.max(...analyticsData.map(item => item.active_users)).toLocaleString() : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Session:</span>
                <span className="font-semibold text-blue-600">
                  {analyticsData ? (analyticsData.reduce((sum, item) => sum + item.session_duration, 0) / analyticsData.length).toFixed(1) : 0}m
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Best Bounce Rate:</span>
                <span className="font-semibold text-purple-600">
                  {analyticsData ? Math.min(...analyticsData.map(item => item.bounce_rate)).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">System Metrics</h3>
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Metrics:</span>
                <span className="font-semibold">{metricsData?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Categories:</span>
                <span className="font-semibold text-green-600">
                  {metricsData ? new Set(metricsData.map(item => item.category)).size : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Performance:</span>
                <span className="font-semibold text-blue-600">
                  {metricsData ? 
                    metricsData.filter(m => m.category === 'Performance')
                      .reduce((sum, item) => sum + item.metric_value, 0)
                      .toFixed(1) 
                    : 0}ms
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">System Health:</span>
                <span className="font-semibold text-green-600">98.5%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Realtime Metrics */}
        {!realtimeLoading && realtimeData && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {realtimeData.metrics.map((metric, index) => (
              <MetricCard
                key={metric.name}
                title={metric.name}
                value={metric.name === 'Revenue' 
                  ? `$${(metric.value / 1000).toFixed(0)}k` 
                  : metric.name.includes('Rate') 
                    ? `${metric.value.toFixed(1)}%`
                    : metric.value.toLocaleString()
                }
                change={metric.change}
                color={metric.color}
                icon={
                  metric.name === 'Active Users' ? <Users className="w-4 h-4" /> :
                  metric.name === 'Revenue' ? <DollarSign className="w-4 h-4" /> :
                  metric.name === 'Conversion Rate' ? <TrendingUp className="w-4 h-4" /> :
                  <Activity className="w-4 h-4" />
                }
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        )}

        {/* Charts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {salesChartData && (
            <AnimatedChart
              data={salesChartData}
              type="area"
              dataKey="revenue"
              xKey="month"
              color="#3B82F6"
              title="Monthly Revenue (K$)"
              height={350}
            />
          )}

          {salesChartData && (
            <AnimatedChart
              data={salesChartData}
              type="bar"
              dataKey="orders"
              xKey="month"
              color="#10B981"
              title="Monthly Orders"
              height={350}
            />
          )}
        </motion.div>

        {/* Additional Charts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {analyticsChartData && (
            <AnimatedChart
              data={analyticsChartData}
              type="line"
              dataKey="active_users"
              xKey="date"
              color="#8B5CF6"
              title="Active Users Trend"
              height={350}
            />
          )}

          {performanceChartData && (
            <AnimatedChart
              data={performanceChartData.map(item => ({
                name: item.category,
                value: Object.keys(item).filter(key => key !== 'category').length
              }))}
              type="pie"
              dataKey="value"
              xKey="name"
              color="#EF4444"
              title="Performance Categories"
              height={350}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
