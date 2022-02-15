import React, { FC } from 'react';
import { Image, ScaledSize, StyleSheet, Text, View } from 'react-native';
import { imageHubUrl } from '../../../consts';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { PriceViewer } from '../../shared';
import { ProductPreviewProps } from './types';

export const ProductPreview: FC<ProductPreviewProps> = ({ product }) => {
    const styles = useTheme(styleGenerator);

    const { price, compare_at_price } = product.attributes;

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `${imageHubUrl}/id/${product.id}/200/200` }}></Image>
            <Text style={styles.header} numberOfLines={1}>
                {product.attributes.name}
            </Text>
            <PriceViewer price={Number(price)} priceWithDiscount={Number(compare_at_price)} />
        </View>
    );
};

const styleGenerator = (theme: Theme, { width, height }: ScaledSize) =>
    StyleSheet.create({
        container: {
            alignItems: 'center',
            width: width / 2.5,
            height: height / 4,
            margin: 4,
            paddingTop: 16,
            secondaryTextColor: theme.secondaryTextColor,
        },
        image: {
            marginHorizontal: 30,
            width: width / 2.5 - 30,
            height: height / 6,
        },
        header: {
            width: '100%',
            fontSize: 15,
            marginTop: 8,
            color: theme.primaryTextColor,
        },
    });
