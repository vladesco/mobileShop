import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { PriceViewer } from '../../shared';
import { DEFAULT_PRODUCT_COLORS } from './consts';
import { ProductDescriptionsProps } from './types';

export const ProductDescription: FC<ProductDescriptionsProps> = ({ product, onColorSelect }) => {
    const styles = useTheme(styleGenerator);
    const [selectedProductColor, setSelectedProductColor] = useState<string>();

    const selectColor = (selectedColor: string) => {
        setSelectedProductColor(selectedColor);
        onColorSelect(selectedColor);
    };

    const { name, price, compare_at_price, description } = product.attributes;

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.text}>{name}</Text>
                <PriceViewer price={Number(price)} priceWithDiscount={Number(compare_at_price)} />
            </View>
            <View style={styles.section}>
                <Text style={[styles.text, styles.header]}>Select Color</Text>
                <View style={styles.buttonContainer}>
                    {DEFAULT_PRODUCT_COLORS.map((color) => (
                        <TouchableOpacity
                            key={color}
                            onPress={() => {
                                selectColor(color);
                            }}
                            style={[styles.button, selectedProductColor === color && styles.pressedButton]}
                        >
                            <Text>{color}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.section}>
                <Text style={[styles.text, styles.header]}>Description</Text>
                <Text style={styles.text}>{description}</Text>
            </View>
        </View>
    );
};

const styleGenerator = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 24,
        },
        section: {
            flexDirection: 'column',
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
        buttonContainer: {
            flexDirection: 'row',
        },
        button: {
            borderRadius: 4,
            marginRight: 8,
            padding: 8,
            alignSelf: 'flex-start',
            backgroundColor: theme.borderColor,
        },
        pressedButton: {
            backgroundColor: theme.secondaryColor,
        },
    });
