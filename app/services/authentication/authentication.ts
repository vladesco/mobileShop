import axios from 'axios';
import { endpointApiUrl } from '../../consts';
import { AccountCredentials, AccountInfo, AccountSession } from './types';

export class AuthenticationService {
    public async createAccount(accountInfo: AccountInfo): Promise<AccountSession> {
        await axios.post(
            `${endpointApiUrl}api/v2/storefront/account`,
            { user: accountInfo },
            {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                },
            }
        );

        return this.loginToAccount({ username: accountInfo.email, password: accountInfo.password });
    }

    public async loginToAccount(accountCredentials: AccountCredentials): Promise<AccountSession> {
        const response = await axios.post<AccountSession>(`${endpointApiUrl}spree_oauth/token`, {
            ...accountCredentials,
            grant_type: 'password',
        });

        return response.data;
    }
}

export const authenticationService = new AuthenticationService();
