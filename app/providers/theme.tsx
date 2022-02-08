import React, { createContext, FC } from 'react';
import { lightTheme } from '../theme';

export const AppTheme = createContext(lightTheme);

export const AppThemeProvider: FC = ({ children }) => (
    <AppTheme.Provider value={lightTheme}>{children}</AppTheme.Provider>
);
