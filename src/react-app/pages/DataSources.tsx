import { motion } from 'framer-motion';
import { 
  Database, 
  Plus, 
  Settings,
  Wifi,
  WifiOff,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import { useState } from 'react';

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync: string;
  records: number;
  icon: string;
  description: string;
}

export default function DataSources() {
  const [dataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Sales Database',
      type: 'PostgreSQL',
      status: 'connected',
      lastSync: '2 minutes ago',
      records: 15420,
      icon: 'database',
      description: 'Primary sales and transaction data'
    },
    {
      id: '2',
      name: 'Google Analytics',
      type: 'Analytics API',
      status: 'connected',
      lastSync: '5 minutes ago',
      records: 89320,
      icon: 'analytics',
      description: 'Website traffic and user behavior data'
    },
    {
      id: '3',
      name: 'Customer Support',
      type: 'REST API',
      status: 'syncing',
      lastSync: 'Syncing now',
      records: 3240,
      icon: 'support',
      description: 'Support tickets and customer feedback'
    },
    {
      id: '4',
      name: 'Social Media',
      type: 'Facebook API',
      status: 'error',
      lastSync: '2 hours ago',
      records: 0,
      icon: 'social',
      description: 'Social media engagement metrics'
    },
    {
      id: '5',
      name: 'Email Campaigns',
      type: 'Mailchimp',
      status: 'disconnected',
      lastSync: '1 day ago',
      records: 12500,
      icon: 'email',
      description: 'Email marketing campaign performance'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'disconnected':
        return <WifiOff className="w-5 h-5 text-gray-400" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'syncing':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <Database className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'connected':
        return `${baseClasses} bg-green-100 text-green-700`;
      case 'disconnected':
        return `${baseClasses} bg-gray-100 text-gray-700`;
      case 'error':
        return `${baseClasses} bg-red-100 text-red-700`;
      case 'syncing':
        return `${baseClasses} bg-blue-100 text-blue-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Data Sources
              </h1>
              <p className="text-gray-600">Manage your data connections and integrations</p>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Plus className="w-4 h-4" />
              Add Data Source
            </button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {dataSources.filter(ds => ds.status === 'connected').length}
                </p>
                <p className="text-sm text-gray-600">Connected</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {dataSources.filter(ds => ds.status === 'syncing').length}
                </p>
                <p className="text-sm text-gray-600">Syncing</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {dataSources.filter(ds => ds.status === 'error').length}
                </p>
                <p className="text-sm text-gray-600">Errors</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {dataSources.reduce((sum, ds) => sum + ds.records, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Records</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Sources Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dataSources.map((source) => (
            <motion.div
              key={source.id}
              variants={cardVariants}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{source.name}</h3>
                    <p className="text-sm text-gray-500">{source.type}</p>
                  </div>
                </div>
                {getStatusIcon(source.status)}
              </div>

              <p className="text-sm text-gray-600 mb-4">{source.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={getStatusBadge(source.status)}>
                    {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Records</span>
                  <span className="text-sm font-medium text-gray-900">
                    {source.records.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last Sync</span>
                  <span className="text-sm text-gray-900 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {source.lastSync}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                  <Settings className="w-4 h-4" />
                  Configure
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Add New Source Card */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-300 flex flex-col items-center justify-center text-center cursor-pointer group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-200">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Add New Source</h3>
            <p className="text-sm text-gray-600">Connect a new data source to expand your analytics</p>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Sync All Sources</p>
                <p className="text-sm text-gray-600">Update data from all connected sources</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <Settings className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Manage Connections</p>
                <p className="text-sm text-gray-600">Configure and test data connections</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <Database className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Data Health Check</p>
                <p className="text-sm text-gray-600">Verify data quality and integrity</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
