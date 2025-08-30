import z from "zod";

export const SalesDataSchema = z.object({
  id: z.number(),
  month: z.string(),
  revenue: z.number(),
  orders: z.number(),
  customers: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UserAnalyticsSchema = z.object({
  id: z.number(),
  date: z.string(),
  active_users: z.number(),
  new_users: z.number(),
  session_duration: z.number(),
  bounce_rate: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const PerformanceMetricSchema = z.object({
  id: z.number(),
  metric_name: z.string(),
  metric_value: z.number(),
  timestamp: z.string(),
  category: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const RealtimeMetricSchema = z.object({
  name: z.string(),
  value: z.number(),
  change: z.number(),
  color: z.string(),
});

export type SalesData = z.infer<typeof SalesDataSchema>;
export type UserAnalytics = z.infer<typeof UserAnalyticsSchema>;
export type PerformanceMetric = z.infer<typeof PerformanceMetricSchema>;
export type RealtimeMetric = z.infer<typeof RealtimeMetricSchema>;
