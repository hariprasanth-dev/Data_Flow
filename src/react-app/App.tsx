import { BrowserRouter as Router, Routes, Route } from "react-router";
import { LocalAuthProvider } from '@/react-app/hooks/useLocalAuth';
import ProtectedRoute from '@/react-app/components/ProtectedRoute';
import HomePage from "@/react-app/pages/Home";
import LoginPage from "@/react-app/pages/Login";
import Dashboard from "@/react-app/pages/Dashboard";
import Analytics from "@/react-app/pages/Analytics";
import Reports from "@/react-app/pages/Reports";
import DataSources from "@/react-app/pages/DataSources";
import Settings from "@/react-app/pages/Settings";
import Profile from "@/react-app/pages/Profile";
import { inject } from '@vercel/analytics';

inject(); // enables Vercel analytics

export default function App() {
  return (
    <LocalAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="/data-sources" element={
            <ProtectedRoute>
              <DataSources />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </LocalAuthProvider>
  );
}
