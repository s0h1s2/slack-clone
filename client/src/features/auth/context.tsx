import { MeResponse, ResponseError } from "@/api";
import { apiClient } from "@/api/client";
import PageLoading from "@/components/PageLoading";
import { createContext, useContext, useEffect, useState } from "react";
export type AuthContext = {
  isAuthenticated: boolean;
  user: MeResponse | null;
  setUser: (user: MeResponse) => void;
};
const AuthContext = createContext<AuthContext | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MeResponse | null>(null);
  const isAuthenticated = !!user;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await apiClient.usersApi.apiUsersMeGet();
        setUser({ id: user.id, name: user.name, email: user.email });
      } catch (e: Error | ResponseError | unknown) {
        if (e instanceof ResponseError) {
          return;
        }
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);
  if (isLoading) return <PageLoading />;
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
