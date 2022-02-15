import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationInfo } from '../types';

const AUTHENTICATION_KEY = 'authentication';

const EMPTY_AUTHENTICATION_INFO: AuthenticationInfo = {
    accessToken: '',
    refreshToken: '',
    userName: '',
    isLogged: false,
};

export const getAuthentication = async (): Promise<AuthenticationInfo> => {
    const storedAuthenticationInfo = await AsyncStorage.getItem(AUTHENTICATION_KEY);

    if (storedAuthenticationInfo !== null) {
        return JSON.parse(storedAuthenticationInfo);
    }

    return EMPTY_AUTHENTICATION_INFO;
};

export const saveAuthentication = async (authenticationInfo?: AuthenticationInfo): Promise<void> => {
    return AsyncStorage.setItem(AUTHENTICATION_KEY, JSON.stringify(authenticationInfo || EMPTY_AUTHENTICATION_INFO));
};
