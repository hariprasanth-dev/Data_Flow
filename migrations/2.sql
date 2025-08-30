
-- Seed data for local development
INSERT OR REPLACE INTO sales_data (id, month, revenue, orders, customers) VALUES
(1, 'Jan 2024', 125000, 450, 320),
(2, 'Feb 2024', 138000, 520, 380),
(3, 'Mar 2024', 142000, 580, 420),
(4, 'Apr 2024', 155000, 620, 450),
(5, 'May 2024', 168000, 680, 490),
(6, 'Jun 2024', 175000, 720, 520),
(7, 'Jul 2024', 182000, 780, 560),
(8, 'Aug 2024', 195000, 820, 590),
(9, 'Sep 2024', 205000, 890, 630),
(10, 'Oct 2024', 218000, 950, 680),
(11, 'Nov 2024', 235000, 1020, 720),
(12, 'Dec 2024', 248000, 1100, 780);

INSERT OR REPLACE INTO user_analytics (id, date, active_users, new_users, session_duration, bounce_rate) VALUES
(1, '2024-12-01', 12500, 450, 8.5, 35.2),
(2, '2024-12-02', 13200, 520, 9.1, 32.8),
(3, '2024-12-03', 11800, 380, 7.8, 38.5),
(4, '2024-12-04', 14200, 680, 10.2, 28.9),
(5, '2024-12-05', 15600, 720, 11.5, 25.6),
(6, '2024-12-06', 16800, 820, 12.1, 23.4),
(7, '2024-12-07', 18200, 890, 13.2, 21.8),
(8, '2024-12-08', 17500, 750, 11.8, 26.3),
(9, '2024-12-09', 19800, 980, 14.5, 19.7),
(10, '2024-12-10', 21200, 1050, 15.2, 18.5);

INSERT OR REPLACE INTO performance_metrics (id, metric_name, metric_value, timestamp, category) VALUES
(1, 'Page Load Time', 1.25, '2024-12-10T10:00:00Z', 'Performance'),
(2, 'API Response Time', 0.85, '2024-12-10T10:00:00Z', 'Performance'),
(3, 'Database Query Time', 0.35, '2024-12-10T10:00:00Z', 'Performance'),
(4, 'Error Rate', 0.02, '2024-12-10T10:00:00Z', 'Reliability'),
(5, 'Uptime', 99.98, '2024-12-10T10:00:00Z', 'Reliability'),
(6, 'Memory Usage', 75.5, '2024-12-10T10:00:00Z', 'Resources'),
(7, 'CPU Usage', 45.2, '2024-12-10T10:00:00Z', 'Resources'),
(8, 'Disk Usage', 68.8, '2024-12-10T10:00:00Z', 'Resources'),
(9, 'Network Latency', 28.5, '2024-12-10T10:00:00Z', 'Network'),
(10, 'Bandwidth Usage', 82.3, '2024-12-10T10:00:00Z', 'Network');
