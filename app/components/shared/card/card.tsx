import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';

export const Card: FC = ({ children }) => {
    const styles = useTheme(styleGenerator);

    return <View style={styles.container}>{children}</View>;
};

const styleGenerator = (theme: Theme) =>
    StyleSheet.create({
        container: {
            padding: 8,
            borderRadius: 8,
            shadowOpacity: 1,
            elevation: 4,
            backgroundColor: theme.primaryColor,
        },
    });
