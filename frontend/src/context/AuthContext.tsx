import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import type { ReactNode } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";

type User = {
   _id: string;
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;
  loading:boolean
};

const AuthContext =
  createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {

  const [user, setUser] =
    useState<User | null>(null);
    const [loading, setLoading] =
  useState(true);

  useEffect(() => {

    const getCurrentUser = async () => {

      try {
        const res = await fetchWithAuth(`/me`,{
          credentials:"include"
        });
        const data = await res.json();
        setUser(data.user);

      } catch {

        setUser(null);
      }finally{
        setLoading(false)
      }
    };

    getCurrentUser();

  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser,loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};