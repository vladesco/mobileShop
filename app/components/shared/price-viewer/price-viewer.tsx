import React, { FC, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { calculateDiscountPercent, generateRandomPriceWithDiscount } from './helpers';
import { PriceViewerProps } from './types';

export const PriceViewer: FC<PriceViewerProps> = ({ price, priceWithDiscount }) => {
    const styles = useTheme(styleGenerator);
    const priceWithDefaultDiscount = useMemo(() => generateRandomPriceWithDiscount(price), [price]);

    priceWithDiscount = priceWithDiscount || priceWithDefaultDiscount;

    return (
        <View style={styles.container}>
            <Text style={styles.price}>${priceWithDiscount}</Text>
            <Text style={styles.discount}>${price}</Text>
            <Text style={styles.discountPercent}>{calculateDiscountPercent(price, priceWithDiscount)}% Off</Text>
        </View>
    );
};

const styleGenerator = (theme: Theme) =>
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
            color: theme.secondaryTextColor,
            textDecorationLine: 'line-through',
        },
        discountPercent: {
            color: theme.secondaryColor,
        },
    });
