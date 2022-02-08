import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationPages } from '../types';
import { useAuthentication } from '../helpers/hooks';
import {
    ProductGallery,
    ProductDetails,
    Login,
    SignUp,
    ForgotPassword,
    SelectColor,
    ProductAdded,
    LoginToContinue,
} from '../pages';

const Stack = createNativeStackNavigator();

export const StackNavigator: FC = () => {
    const [authenticationInfo] = useAuthentication();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={authenticationInfo?.userName ? NavigationPages.PRODUCT_GALLERY : NavigationPages.LOGIN}
        >
            <Stack.Group>
                <Stack.Screen name={NavigationPages.PRODUCT_GALLERY} component={ProductGallery} />
                <Stack.Screen name={NavigationPages.PRODUCT_DETAILS} component={ProductDetails} />
            </Stack.Group>

            <Stack.Group screenOptions={{ animation: 'slide_from_left' }}>
                <Stack.Screen name={NavigationPages.LOGIN} component={Login} />
                <Stack.Screen name={NavigationPages.SIGN_UP} component={SignUp} />
                <Stack.Screen name={NavigationPages.FORGOT_PASSWORD} component={ForgotPassword} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'modal', animation: 'flip' }}>
                <Stack.Screen name={NavigationPages.SELECT_COLOR_MODAL} component={SelectColor} />
                <Stack.Screen name={NavigationPages.PRODUCT_ADDED_MODAL} component={ProductAdded} />
                <Stack.Screen name={NavigationPages.LOGIN_TO_CONTINUE_MODAL} component={LoginToContinue} />
            </Stack.Group>
        </Stack.Navigator>
    );
};
