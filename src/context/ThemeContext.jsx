import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);
    const toggleTheme = function () {
        setIsDark(prev => !prev);
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            <div style={{
                background: isDark ? '#1a1a1a' : '#f9f9f9',
                color: isDark ? '#fff' : '#111',
                minHeight: '100vh',
                padding: '24px',
                fontFamily: 'sans-serif'
            }}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);