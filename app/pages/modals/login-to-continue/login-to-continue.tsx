import React, { FC } from 'react';
import { View, Text, Image, StyleSheet, ScaledSize, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { NavigationPages, WithStackNavigation } from '../../../types';
import { CustomButton, Popup } from '../../../components/shared';

export const LoginToContinue: WithStackNavigation<FC, NavigationPages.SELECT_COLOR_MODAL> = ({ navigation }) => {
    const styles = useTheme(styleGenerator);

    return (
        <Popup>
            <View style={styles.container}>
                <Image source={require('../../../../assets/images/warning.png')} />
                <Text style={styles.header}>Login To Continue</Text>
                <Text style={styles.text}>Please login to add product in your cart</Text>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        text="Login"
                        styleProp={styles.button}
                        onPress={() => navigation.navigate(NavigationPages.LOGIN)}
                    />
                    <CustomButton
                        text="Sign up"
                        styleProp={styles.button}
                        onPress={() => navigation.navigate(NavigationPages.SIGN_UP)}
                    />
                </View>
            </View>
        </Popup>
    );
};

const styleGenerator = (theme: Theme, { width }: ScaledSize) =>
    StyleSheet.create({
        container: {
            width: width - 180,
            alignItems: 'center',
            justifyContent: 'center',
        },
        header: {
            marginTop: 16,
            fontSize: 20,
            fontWeight: '700',
            textAlign: 'center',
            color: theme.secondaryTextColor,
        },
        text: {
            marginTop: 16,
            textAlign: 'center',
        },
        buttonContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        button: {
            width: width / 3 - 30,
        },
    });
