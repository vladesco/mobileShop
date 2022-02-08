import React, { FC } from 'react';
import { ScaledSize, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';

export const Popup: FC = ({ children }) => {
    const styles = useTheme(styleGenerator);
    return (
        <View style={styles.container}>
            <View style={styles.popup}>{children}</View>
        </View>
    );
};

const styleGenerator = (theme: Theme, { width, height }: ScaledSize) =>
    StyleSheet.create({
        container: {
            flex: 1,
            width,
            height,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.backgroundColor,
        },
        popup: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
            borderRadius: 4,
            backgroundColor: theme.primaryColor,
        },
    });
