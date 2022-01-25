import React, { FC, useContext, useMemo } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Header, ImageCarousel } from '../../shared';
import { useRequest } from '../../../helpers/hooks';
import { AppTheme, Theme } from '../../../theme';
import { ProductInfo } from '../../../types';
import { generateImagesForProduct } from './helpers';
import { ProductDescription } from '../../products';

const { width: screenWidth } = Dimensions.get('window');

export const ProductDetails: FC = () => {
    const theme = useContext(AppTheme);
    const styles = generateStylesForTheme(theme);
    const totalCountOfImages = 4;

    const generatedImages = useMemo(
        () => generateImagesForProduct(totalCountOfImages),
        [totalCountOfImages]
    );
    const requestInfo = useRequest<{ data: ProductInfo }>('/products/1');
    const product = requestInfo?.response?.data;

    return (
        <>
            <Header>
                <Image
                    source={require('../../../../assets/images/back_arrow.png')}
                />
                <View style={styles.headerActions}>
                    <Image
                        source={require('../../../../assets/images/like.png')}
                    />
                    <Image
                        source={require('../../../../assets/images/shop.png')}
                    />
                </View>
            </Header>
            {product ? (
                <>
                    <View style={styles.container}>
                        <ScrollView>
                            <ImageCarousel images={generatedImages} />
                            <ProductDescription product={product} />
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Add to card</Text>
                    </TouchableOpacity>
                </>
            ) : null}
        </>
    );
};

const generateStylesForTheme = (theme: Theme) =>
    StyleSheet.create({
        container: {
            marginBottom: 100,
        },
        headerActions: {
            width: 60,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        section: {
            borderBottomWidth: 1,
            borderColor: theme.borderColor,
        },
        button: {
            position: 'absolute',
            height: 40,
            width: screenWidth - 24,
            bottom: 12,
            left: 12,
            padding: 12,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            backgroundColor: theme.secondaryColor,
        },
        text: {
            color: theme.primaryColor,
            textTransform: 'uppercase',
        },
    });
