import { useContext } from 'react';
import { Authentication } from '../../providers';

export const useAuthentication = () => {
    const [authenticationInfo, setAuthenticationInfo] = useContext(Authentication);
    return [authenticationInfo, setAuthenticationInfo] as const;
};
