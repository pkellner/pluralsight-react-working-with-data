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
  loggedInAttendeeId: string | undefined;
  setLoggedInName: (name: string) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
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
      Cookies.set("authToken", authToken, { expires: 7 }); // Set the auth token as a cookie
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

  const value = {
    loggedInName,
    loggedInAttendeeId: loggedInName?.split("/")[2] || undefined,
    setLoggedInName,
    isLoading,
    isLoggedIn: loggedInName.length > 0,
    isAdmin: loggedInName === "admin",
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
