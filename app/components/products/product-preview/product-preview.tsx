import React, { FC, useContext } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { imageHubUrl } from '../../../consts';
import { AppTheme, Theme } from '../../../theme';
import { PriceViewer } from '../../shared';
import { ProductPreviewProps } from './types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ProductPreview: FC<ProductPreviewProps> = ({ product }) => {
    const theme = useContext(AppTheme);
    const styles = generateStylesForTheme(theme);

    return (
        <TouchableOpacity style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: `${imageHubUrl}/id/${product.id}/200/200` }}
            ></Image>
            <Text style={styles.header} numberOfLines={1}>
                {product.attributes.name}
            </Text>
            <PriceViewer
                price={Number(product.attributes.price)}
                priceWithDiscount={Number(product.attributes.compare_at_price)}
            />
        </TouchableOpacity>
    );
};

const generateStylesForTheme = (theme: Theme) =>
    StyleSheet.create({
        container: {
            alignItems: 'center',
            width: screenWidth / 2.5,
            height: screenHeight / 4,
            marginHorizontal: 16,
            marginVertical: 8,
            paddingTop: 16,
            paddingHorizontal: 8,
            borderRadius: 8,
            backgroundColor: theme.primaryColor,
            shadowColor: theme.shadowColor,
            shadowOpacity: 1,
            elevation: 4,
        },
        image: {
            marginHorizontal: 30,
            width: screenWidth / 2.5 - 30,
            height: screenHeight / 6,
        },
        header: {
            width: '100%',
            fontSize: 15,
            paddingTop: 8,
            color: theme.primaryTextColor,
        },
    });
