import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebaseLogout } from "./firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await firebaseLogout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    logout,
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600 text-lg">Checking authentication...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
