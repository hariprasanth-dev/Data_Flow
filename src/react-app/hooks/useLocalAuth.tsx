import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  role: string;
  loginTime: string;
}

interface LocalAuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const LocalAuthContext = createContext<LocalAuthContextType | null>(null);

export function LocalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Demo users for local authentication
  const demoUsers = [
    { email: 'admin@dataflow.com', password: 'admin123', name: 'Admin User', role: 'Administrator' },
    { email: 'demo@dataflow.com', password: 'password123', name: 'Demo User', role: 'Analyst' },
    { email: 'manager@dataflow.com', password: 'manager123', name: 'Manager User', role: 'Manager' },
    { email: 'user@dataflow.com', password: 'user123', name: 'Standard User', role: 'User' }
  ];

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('dataflow_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('dataflow_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const matchedUser = demoUsers.find(u => u.email === email && u.password === password);
    
    if (matchedUser) {
      const userData: User = {
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role,
        loginTime: new Date().toISOString()
      };
      
      setUser(userData);
      localStorage.setItem('dataflow_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dataflow_user');
  };

  return (
    <LocalAuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </LocalAuthContext.Provider>
  );
}

export function useLocalAuth() {
  const context = useContext(LocalAuthContext);
  if (!context) {
    throw new Error('useLocalAuth must be used within a LocalAuthProvider');
  }
  return context;
}
