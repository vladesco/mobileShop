import React, { FC } from 'react';
import { View, Text, Image, StyleSheet, ScaledSize, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { NavigationPages, WithStackNavigation } from '../../../types';
import { CustomButton, Popup } from '../../../components/shared';

export const SelectColor: WithStackNavigation<FC, NavigationPages.SELECT_COLOR_MODAL> = ({ navigation }) => {
    const styles = useTheme(styleGenerator);

    return (
        <Popup>
            <View style={styles.container}>
                <Image source={require('../../../../assets/images/error.png')} />
                <Text style={styles.header}>Select color</Text>
                <Text style={styles.text}>Please select your color to add this item in your cart</Text>
                <CustomButton text="Ok" styleProp={styles.button} onPress={navigation.goBack} />
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
        button: {
            width: width / 3,
        },
    });
