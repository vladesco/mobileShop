import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';

export const Header: FC = ({ children }) => {
    const styles = useTheme(styleGenerator);
    return <View style={styles.container}>{children}</View>;
};

const styleGenerator = (theme: Theme) =>
    StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            height: 60,
            backgroundColor: theme.secondaryColor,
            elevation: 4,
        },
    });
