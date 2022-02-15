import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';

export const SplashScreen: FC = () => {
    const styles = useTheme(styleGenerator);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
};

const styleGenerator = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 40,
            color: theme.secondaryColor,
        },
    });
