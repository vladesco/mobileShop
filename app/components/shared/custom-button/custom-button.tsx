import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { CustomButtonProps } from './types';

export const CustomButton: FC<CustomButtonProps> = ({ text, onPress, styleProp }) => {
    const styles = useTheme(styleGenerator);

    return (
        <TouchableOpacity style={[styles.button, styleProp]} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styleGenerator = (theme: Theme) =>
    StyleSheet.create({
        button: {
            width: '100%',
            height: 40,
            marginTop: 24,
            padding: 12,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            backgroundColor: theme.secondaryColor,
            elevation: 4,
        },
        buttonText: {
            fontWeight: '500',
            color: theme.primaryColor,
            textTransform: 'uppercase',
        },
    });
