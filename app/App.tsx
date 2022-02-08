import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './navigators';
import { useAuthentication } from './helpers/hooks';
import { SplashScreen } from './components/shared';
import { AppThemeProvider, AuthenticationProvider } from './providers';

const AppContent: FC = () => {
    const [authenticationInfo] = useAuthentication();

    return authenticationInfo ? (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    ) : (
        <SplashScreen />
    );
};

const App: FC = () => (
    <AppThemeProvider>
        <AuthenticationProvider>
            <AppContent />
        </AuthenticationProvider>
    </AppThemeProvider>
);

export default App;
