import React, { createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationContextType {
    currentPath: string;
    navigateTo: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        if (location.pathname !== path) navigate(path);
    };

    return (
        <NavigationContext.Provider value={{ currentPath: location.pathname, navigateTo }}>
            {children}
        </NavigationContext.Provider>
    );
};

export function useNavigation() {
    const ctx = useContext(NavigationContext);
    if (!ctx) throw new Error('useNavigation must be used within a NavigationProvider');
    return ctx;
} 