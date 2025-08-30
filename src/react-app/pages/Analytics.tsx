import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  MousePointer,
  TrendingUp,
  Eye,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import MetricCard from '@/react-app/components/MetricCard';
import AnimatedChart from '@/react-app/components/AnimatedChart';
import { useUserAnalytics } from '@/react-app/hooks/useApi';

export default function Analytics() {
  const { data: analyticsData, loading } = useUserAnalytics();

  // Simulate additional analytics data
  const deviceData = [
    { name: 'Desktop', value: 65, color: '#3B82F6' },
    { name: 'Mobile', value: 28, color: '#10B981' },
    { name: 'Tablet', value: 7, color: '#8B5CF6' }
  ];

  const sourceData = [
    { name: 'Organic', value: 45, color: '#3B82F6' },
    { name: 'Direct', value: 30, color: '#10B981' },
    { name: 'Social Media', value: 15, color: '#8B5CF6' },
    { name: 'Referral', value: 10, color: '#EF4444' }
  ];

  const engagementData = analyticsData?.slice(0, 14).reverse().map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    session_duration: Math.round(item.session_duration / 60), // Convert to minutes
    bounce_rate: item.bounce_rate,
    page_views: Math.floor(Math.random() * 50) + 20
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            User Analytics
          </h1>
          <p className="text-gray-600">Deep insights into user behavior and engagement patterns</p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <MetricCard
            title="Total Users"
            value="24.5K"
            change={12.5}
            color="#3B82F6"
            icon={<Users className="w-4 h-4" />}
            delay={0}
          />
          <MetricCard
            title="Avg. Session Duration"
            value="4m 32s"
            change={8.2}
            color="#10B981"
            icon={<Clock className="w-4 h-4" />}
            delay={0.1}
          />
          <MetricCard
            title="Page Views"
            value="89.2K"
            change={-2.1}
            color="#8B5CF6"
            icon={<Eye className="w-4 h-4" />}
            delay={0.2}
          />
          <MetricCard
            title="Click-through Rate"
            value="3.24%"
            change={15.7}
            color="#EF4444"
            icon={<MousePointer className="w-4 h-4" />}
            delay={0.3}
          />
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {engagementData && (
            <AnimatedChart
              data={engagementData}
              type="line"
              dataKey="session_duration"
              xKey="date"
              color="#3B82F6"
              title="Average Session Duration (Minutes)"
              height={350}
            />
          )}

          {engagementData && (
            <AnimatedChart
              data={engagementData}
              type="area"
              dataKey="bounce_rate"
              xKey="date"
              color="#EF4444"
              title="Bounce Rate Trend (%)"
              height={350}
            />
          )}
        </motion.div>

        {/* Device & Traffic Source Analysis */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatedChart
            data={deviceData}
            type="pie"
            dataKey="value"
            xKey="name"
            color="#3B82F6"
            title="Device Usage Distribution"
            height={350}
          />

          <AnimatedChart
            data={sourceData}
            type="pie"
            dataKey="value"
            xKey="name"
            color="#10B981"
            title="Traffic Source Breakdown"
            height={350}
          />
        </motion.div>

        {/* Detailed Engagement Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              User Behavior Insights
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Monitor className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Desktop Users</h4>
                <p className="text-2xl font-bold text-blue-600 mb-1">65%</p>
                <p className="text-sm text-gray-600">Highest engagement rate</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Mobile Users</h4>
                <p className="text-2xl font-bold text-green-600 mb-1">28%</p>
                <p className="text-sm text-gray-600">Growing segment</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Global Reach</h4>
                <p className="text-2xl font-bold text-purple-600 mb-1">47</p>
                <p className="text-sm text-gray-600">Countries reached</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
