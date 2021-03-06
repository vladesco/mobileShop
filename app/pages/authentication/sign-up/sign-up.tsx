import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomButton, Header, InputGroup } from '../../../components/shared';
import { useAuthentication, useTheme } from '../../../helpers/hooks';
import { authenticationService } from '../../../services';
import { Theme } from '../../../theme';
import { NavigationPages, WithStackNavigation } from '../../../types';
import { DEFAULT_CREDENTIALS } from './consts';
import { Credentials } from './types';

export const SignUp: WithStackNavigation<FC, NavigationPages.SIGN_UP> = ({ navigation }) => {
    const styles = useTheme(styleGenerator);
    const [_, setAuthentication] = useAuthentication();
    const [credentials, setCredentials] = useState<Credentials>(DEFAULT_CREDENTIALS);

    const createAccount = useCallback(async () => {
        const { firstName, lastName, email, password, confirmPassword } = credentials;

        const { access_token, refresh_token } = await authenticationService.createAccount({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
        });

        setAuthentication({
            accessToken: access_token,
            refreshToken: refresh_token,
            userName: email,
            isLogged: true,
        });

        navigation.navigate(NavigationPages.PRODUCT_GALLERY);
    }, [credentials]);

    return (
        <>
            <Header />
            <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
                <Text style={styles.header}>Ecommerce Store</Text>
                <View style={styles.inputContainer}>
                    <InputGroup group={credentials} onGroupChange={setCredentials} />
                </View>

                <CustomButton text="Sign up" onPress={createAccount} />

                <Text style={styles.link} onPress={() => navigation.navigate(NavigationPages.LOGIN)}>
                    Already have account? Sign In
                </Text>
            </ScrollView>
        </>
    );
};

const styleGenerator = (theme: Theme) =>
    StyleSheet.create({
        container: {
            paddingTop: 48,
            paddingHorizontal: 16,
            backgroundColor: theme.primaryColor,
        },
        containerContent: {
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
        link: {
            marginTop: 16,
            color: theme.secondaryLightColor,
        },
    });
