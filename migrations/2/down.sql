
-- Remove seed data
DELETE FROM sales_data WHERE id BETWEEN 1 AND 12;
DELETE FROM user_analytics WHERE id BETWEEN 1 AND 10;
DELETE FROM performance_metrics WHERE id BETWEEN 1 AND 10;
