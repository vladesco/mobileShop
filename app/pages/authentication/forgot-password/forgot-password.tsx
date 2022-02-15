import React, { FC, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { NavigationPages, WithStackNavigation } from '../../../types';
import { CustomButton, Header, InputGroup } from '../../../components/shared';
import { noop } from '../../../helpers/functions';
import { PasswordInfo } from './types';
import { DEFAULT_PASSWORD_INFO } from './consts';

export const ForgotPassword: WithStackNavigation<FC, NavigationPages.SIGN_UP> = () => {
    const styles = useTheme(styleGenerator);
    const [passwordInfo, setPasswordInfo] = useState<PasswordInfo>(DEFAULT_PASSWORD_INFO);

    return (
        <>
            <Header />
            <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
                <Text style={styles.header}>Ecommerce Store</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>
                        Enter your email id and we will send you an email to change the password
                    </Text>
                    <InputGroup group={passwordInfo} onGroupChange={setPasswordInfo} />
                </View>

                <CustomButton text="Submit" onPress={noop} />
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
        text: {
            padding: 32,
            textAlign: 'center',
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
    });
