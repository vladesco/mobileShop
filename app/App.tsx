import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { Platform, UIManager } from 'react-native';
import { SplashScreen } from './components/shared';
import { useAuthentication } from './helpers/hooks';
import { DrawerNavigator } from './navigators';
import { AppThemeProvider, AuthenticationProvider } from './providers';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
