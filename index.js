/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import axios from 'axios';
import App from './app/App';
import { name as appName } from './app.json';
import { getAuthentication, saveAuthentication } from './app/helpers/functions';
import { endpointApiUrl } from './app/consts';

axios.interceptors.request.use(
    async (request) => {
        const authenticationInfo = await getAuthentication();

        if (authenticationInfo?.isLogged) {
            request.headers['Authorization'] = `Bearer ${authenticationInfo?.accessToken}`;
        }

        return request;
    },
    async (error) => {
        throw error;
    }
);

axios.interceptors.response.use(
    async (response) => response,
    async (error) => {
        const authenticationInfo = await getAuthentication();

        if (error.response.status === 401 && authenticationInfo?.isLogged) {
            const response = await axios.post(`${endpointApiUrl}spree_oauth/token`, {
                grant_type: 'refresh_token',
                refresh_token: authenticationInfo.refreshToken,
            });

            const { access_token, refresh_token } = response.data;

            await saveAuthentication({ ...authenticationInfo, accessToken: access_token, refreshToken: refresh_token });

            return axios(error.config)
        } else {
            throw error;
        }
    }
);

AppRegistry.registerComponent(appName, () => App);
