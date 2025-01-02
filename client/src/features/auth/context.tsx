import { ResponseError } from "@/api";
import { apiClient } from "@/api/client";
import { UnauthenticatedError } from "@/lib/errors";
import { createContext, useContext, useEffect, useState } from "react";
type User = {
  name: string
  email: string
}
export type AuthContext = {
  isAuthenticated: boolean
  user: User | null
  setUser: (user: User) => void
}
const AuthContext = createContext<AuthContext | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await apiClient.usersApi.apiUsersMeGet();
        setUser({ name: user.name, email: user.email })
      } catch (e: Error | ResponseError | unknown) {
        if (e instanceof ResponseError) {
          return;
        }
        console.error(e);
      }
    }
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
