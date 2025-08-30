import { useState, useEffect } from 'react';
import type { SalesData, UserAnalytics, PerformanceMetric, RealtimeMetric } from '@/shared/types';

export function useApi<T>(endpoint: string, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, dependencies);

  return { data, loading, error };
}

export function useSalesData() {
  return useApi<SalesData[]>('/api/sales');
}

export function useUserAnalytics() {
  return useApi<UserAnalytics[]>('/api/analytics');
}

export function usePerformanceMetrics() {
  return useApi<PerformanceMetric[]>('/api/metrics');
}

export function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState<{ timestamp: string; metrics: RealtimeMetric[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch('/api/realtime');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMetrics(data);
      } catch (err) {
        console.error('Error fetching realtime metrics:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { data: metrics, loading };
}
