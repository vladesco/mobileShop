import React, { FC, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppTheme, Theme } from '../../../theme';
import { PriceViewer } from '../../shared';
import { ProductDescriptionsProps } from './types';

export const ProductDescription: FC<ProductDescriptionsProps> = ({
    product,
}) => {
    const theme = useContext(AppTheme);
    const styles = generateStylesForTheme(theme);

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.text}>{product.attributes.name}</Text>
                <PriceViewer
                    price={Number(product.attributes.price)}
                    priceWithDiscount={Number(
                        product.attributes.compare_at_price
                    )}
                />
            </View>
            <View style={styles.section}>
                <Text style={[styles.text, styles.header]}>Select Color</Text>
                <TouchableOpacity style={styles.button}>
                    <Text>Blue</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={[styles.text, styles.header]}>Description</Text>
                <Text style={styles.text}>
                    {product.attributes.description}
                </Text>
            </View>
        </View>
    );
};

const generateStylesForTheme = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingLeft: 24,
        },
        section: {
            paddingBottom: 8,
            borderBottomWidth: 1,
            borderColor: theme.borderColor,
        },
        header: {
            fontWeight: '700',
            fontSize: 25,
        },
        text: {
            marginVertical: 8,
            color: theme.primaryTextColor,
        },
        button: {
            borderRadius: 4,
            padding: 8,
            alignSelf: 'flex-start',
            backgroundColor: theme.borderColor,
        },
    });
