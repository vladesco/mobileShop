import React, { FC, useCallback, useState } from 'react';
import { ScaledSize, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuthentication, useTheme } from '../../../helpers/hooks';
import { authenticationService } from '../../../services';
import { Theme } from '../../../theme';
import { NavigationPages, WithStackNavigation } from '../../../types';
import { CustomButton, Header, InputGroup } from '../../../components/shared';
import { DEFAULT_LOGIN_INFO, DEFAULT_USER_NAME } from './consts';
import { LoginInfo } from './types';

export const Login: WithStackNavigation<FC, NavigationPages.LOGIN> = ({ navigation }) => {
    const styles = useTheme(styleGenerator);
    const [_, setAuthenticationInfo] = useAuthentication();
    const [loginInfo, setLoginInfo] = useState<LoginInfo>(DEFAULT_LOGIN_INFO);

    const skipLogin = useCallback(() => {
        setAuthenticationInfo({
            accessToken: '',
            refreshToken: '',
            userName: DEFAULT_USER_NAME,
            isLogged: false,
        });

        navigation.navigate(NavigationPages.PRODUCT_GALLERY);
    }, []);

    const login = useCallback(async () => {
        const { email, password } = loginInfo;

        const { access_token, refresh_token } = await authenticationService.loginToAccount({
            username: email,
            password,
        });

        setAuthenticationInfo({
            accessToken: access_token,
            refreshToken: refresh_token,
            userName: email,
            isLogged: true,
        });
    }, [loginInfo]);

    return (
        <>
            <Header />
            <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
                <Text style={styles.header}>Ecommerce Store</Text>
                <View style={styles.inputContainer}>
                    <InputGroup group={loginInfo} onGroupChange={setLoginInfo} />
                    <Text style={styles.link} onPress={() => navigation.navigate(NavigationPages.FORGOT_PASSWORD)}>
                        Forgot Password?
                    </Text>
                </View>

                <CustomButton text="Sign in" onPress={login} />

                <Text style={styles.link} onPress={() => navigation.navigate(NavigationPages.SIGN_UP)}>
                    New here? Sign Up
                </Text>

                <CustomButton text="Skip login ➜" styleProp={styles.button} onPress={skipLogin} />
            </ScrollView>
        </>
    );
};

const styleGenerator = (theme: Theme, { height }: ScaledSize) =>
    StyleSheet.create({
        container: {
            paddingTop: 48,
            paddingHorizontal: 16,
            backgroundColor: theme.primaryColor,
        },
        containerContent: {
            flex: 1,
            alignItems: 'center',
        },
        header: {
            textAlign: 'center',
            fontSize: 40,
            paddingHorizontal: 36,
            color: theme.secondaryLightColor,
            fontWeight: '700',
        },
        inputContainer: {
            width: '100%',
            marginTop: 24,
        },
        input: {
            marginVertical: 16,
            borderWidth: 2,
            borderRadius: 4,
            borderColor: theme.borderColor,
        },
        link: {
            marginTop: 16,
            color: theme.secondaryLightColor,
        },
        button: {
            position: 'absolute',
            top: height - 300,
            backgroundColor: theme.secondaryTextColor,
        },
    });
