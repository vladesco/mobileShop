import React, { FC, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppTheme, Theme } from '../../../theme';

export const Header: FC = ({ children }) => {
    const theme = useContext(AppTheme);
    const styles = generateStylesForTheme(theme);

    return <View style={styles.container}>{children}</View>;
};

const generateStylesForTheme = (theme: Theme) =>
    StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            height: 60,
            backgroundColor: theme.secondaryColor,
        },
    });
