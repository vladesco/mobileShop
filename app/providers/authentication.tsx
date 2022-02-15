import React, { createContext, FC, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { noop } from '../helpers/functions';
import { AuthenticationInfo } from '../types';
import { saveAuthentication, getAuthentication } from '../utils';

export const Authentication = createContext<
    [AuthenticationInfo | undefined, (authenticationInfo: AuthenticationInfo) => void]
>([undefined, noop]);

export const AuthenticationProvider: FC = ({ children }) => {
    const currentAuthenticationInfo = useRef<AuthenticationInfo>();
    const [authenticationInfo, setAuthenticationInfo] = useState<AuthenticationInfo>();

    currentAuthenticationInfo.current = authenticationInfo;

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState !== 'active') {
                saveAuthentication(currentAuthenticationInfo.current);
            }
        });

        getAuthentication().then(setAuthenticationInfo);

        return () => subscription.remove();
    }, []);

    return (
        <Authentication.Provider value={[authenticationInfo, setAuthenticationInfo]}>
            {children}
        </Authentication.Provider>
    );
};
