import React, { FC } from 'react';
import { Image, ScaledSize, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { NavigationPages, WithStackNavigation } from '../../../types';
import { CustomButton, Popup } from '../../../components/shared';

export const ProductAdded: WithStackNavigation<FC, NavigationPages.PRODUCT_ADDED_MODAL> = ({ navigation }) => {
    const styles = useTheme(styleGenerator);

    return (
        <Popup>
            <View style={styles.container}>
                <Image source={require('../../../../assets/images/success.png')} />
                <Text style={styles.header}>Product added to your cart</Text>
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
        button: {
            width: width / 3,
        },
    });
