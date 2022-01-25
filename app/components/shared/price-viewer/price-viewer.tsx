import React, { FC, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppTheme, Theme } from '../../../theme';
import {
    calculateDiscountPercent,
    generateRandomPriceWithDiscount,
} from './helpers';
import { PriceViewerProps } from './types';

export const PriceViewer: FC<PriceViewerProps> = ({
    price,
    priceWithDiscount,
}) => {
    const theme = useContext(AppTheme);
    const styles = generateStylesForTheme(theme);

    if (!priceWithDiscount) {
        priceWithDiscount = generateRandomPriceWithDiscount(price);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.price}>${priceWithDiscount}</Text>
            <Text style={styles.discount}>${price}</Text>
            <Text style={styles.discountPercent}>
                {calculateDiscountPercent(price, priceWithDiscount)}% Off
            </Text>
        </View>
    );
};

const generateStylesForTheme = (theme: Theme) =>
    StyleSheet.create({
        container: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        price: {
            paddingRight: 8,
            color: theme.primaryTextColor,
            fontWeight: '700',
        },
        discount: {
            paddingRight: 8,
            color: theme.lightTextColor,
            textDecorationLine: 'line-through',
        },
        discountPercent: {
            color: theme.secondaryColor,
        },
    });
