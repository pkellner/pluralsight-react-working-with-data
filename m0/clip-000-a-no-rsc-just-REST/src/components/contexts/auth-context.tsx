"use client";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

interface LocalAuthContext {
  loggedInName: string;
  setLoggedInName: (name: string) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
  loggedInAttendeeId: string | undefined;
  loggedInFirstLast: string | undefined;
  isAdmin: boolean;
}

const LocalAuthContext = createContext<LocalAuthContext | undefined>(undefined);

export default function LocalAuthProvider({
  children,
  loginNameInit,
}: {
  children: ReactNode;
  loginNameInit: string | undefined;
}) {
  const [loggedInName, setLoggedInNameState] = useState<string>(
    loginNameInit ?? "",
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setLoggedInName = useCallback((name: string) => {
    setLoggedInNameState(name);

    const setAuthToken = (authToken: string) => {
      return authToken && authToken.length > 0
        ? Cookies.set("authToken", authToken, { expires: 7 })
        : Cookies.remove("authToken");
    };
    setAuthToken(name);
  }, []);

  useEffect(() => {
    const cookieValue = Cookies.get("authToken");
    if (cookieValue) {
      setLoggedInNameState(cookieValue);
    }
    setIsLoading(false);
  }, []);

  const parts = loggedInName.split("/");

  const value = {
    loggedInName,
    loggedInAttendeeId: parts.length > 2 ? parts[2] : undefined,
    loggedInFirstLast: parts.length > 1 ? `${parts[0]} ${parts[1]}` : undefined,
    setLoggedInName,
    isLoading,
    isLoggedIn: loggedInName.length > 0,
    isAdmin: loggedInName.startsWith("admin"), // not secure! just for demonstration
  };

  return (
    <LocalAuthContext.Provider value={value}>
      {children}
    </LocalAuthContext.Provider>
  );
}

export function useLocalAuthContext() {
  const context = useContext(LocalAuthContext);
  if (!context) {
    throw new Error(
      "useLocalAuthContext must be used within a LocalAuthProvider",
    );
  }
  return context;
}
