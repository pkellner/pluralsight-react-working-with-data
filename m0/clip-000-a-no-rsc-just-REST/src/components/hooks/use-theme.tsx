import {useState} from "react";

export default function useTheme() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const toggleTheme = () => setDarkTheme(!darkTheme);

  return {
    darkTheme,
    toggleTheme,
  };
}
