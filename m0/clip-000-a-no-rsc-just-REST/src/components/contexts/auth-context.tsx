'use client'
import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';

interface LocalAuthContext {
  loggedInName: string;
  setLoggedInName: (name: string) => void;
  isLoading: boolean;
}

const LocalAuthContext = createContext<LocalAuthContext | undefined>(undefined);

export default function LocalAuthProvider({ children }: { children: ReactNode }) {
  const [loggedInName, setLoggedInNameState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setLoggedInName = useCallback((name: string) => {
    setLoggedInNameState(name);
    Cookies.set('loggedInName', name, { expires: 7 });
  }, []);

  useEffect(() => {
    const cookieValue = Cookies.get('loggedInName');
    if (cookieValue) {
      setLoggedInNameState(cookieValue);
    }
    setIsLoading(false);
  }, []);

  const value = {
    loggedInName,
    setLoggedInName,
    isLoading,
  };

  return <LocalAuthContext.Provider value={value}>{children}</LocalAuthContext.Provider>;
}

export function useLocalAuthContext() {
  const context = useContext(LocalAuthContext);
  if (!context) {
    throw new Error("useLocalAuthContext must be used within a LocalAuthProvider");
  }
  return context;
}
