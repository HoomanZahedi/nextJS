"use client";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { fetchUser } from "../hooks/useAuth";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}
interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}
export const AuthenticationContext = createContext<AuthState>({
  data: null,
  error: null,
  loading: false,
  setAuthState: () => {},
});
function AuthContext({ children }: { children: ReactNode }) {
  const [AuthState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null,
  });
  const handleFetchUser = async () => {
    const res: any = await fetchUser();
    if (res === "token not found") {
      setAuthState({ loading: false, data: null, error: res });
    } else {
      if (res.status === 200) {
        setAuthState({ loading: false, data: res.data.success, error: null });
      }
    }
  };
  useEffect(() => {
    handleFetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        ...AuthState,
        setAuthState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthContext;
