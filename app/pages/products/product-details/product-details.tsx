import React, { FC, useCallback, useMemo, useState } from 'react';
import { ScaledSize, ScrollView, StyleSheet, View } from 'react-native';
import { CustomButton, ClickableImage, Header, ImageCarousel } from '../../../components/shared';
import { NavigationPages, WithStackNavigation } from '../../../types';
import { generateImagesForProduct } from './helpers';
import { ProductDescription } from '../../../components/products';
import { useAuthentication, useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { TOTAL_COUNT_OF_IMAGES } from './consts';

export const ProductDetails: WithStackNavigation<FC, NavigationPages.PRODUCT_DETAILS> = ({ navigation, route }) => {
    const styles = useTheme(styleGenerator);
    const [authenticationInfo] = useAuthentication();
    const [selectedProductColor, setSelectedProductColor] = useState<string>();

    const product = route.params.selectedProduct;

    const addProductToCard = useCallback(() => {
        if (!authenticationInfo?.isLogged) {
            navigation.navigate(NavigationPages.LOGIN_TO_CONTINUE_MODAL);
            return;
        }

        if (!selectedProductColor) {
            navigation.navigate(NavigationPages.SELECT_COLOR_MODAL);
            return;
        }
    }, [selectedProductColor]);

    const generatedImages = useMemo(() => generateImagesForProduct(TOTAL_COUNT_OF_IMAGES), []);

    return (
        <>
            <Header>
                <ClickableImage
                    source={require('../../../../assets/images/back_arrow.png')}
                    onPress={navigation.goBack}
                />
                <View style={styles.headerActions}>
                    <ClickableImage source={require('../../../../assets/images/like.png')} />
                    <ClickableImage source={require('../../../../assets/images/shop.png')} />
                </View>
            </Header>
            {product && (
                <>
                    <View style={styles.container}>
                        <ScrollView>
                            <ImageCarousel images={generatedImages} />
                            <ProductDescription product={product} onColorSelect={setSelectedProductColor} />
                        </ScrollView>
                    </View>
                    <CustomButton text="Add to card" styleProp={styles.button} onPress={addProductToCard} />
                </>
            )}
        </>
    );
};

const styleGenerator = (theme: Theme, { width }: ScaledSize) =>
    StyleSheet.create({
        container: {
            marginBottom: 100,
            backgroundColor: theme.primaryColor,
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
            width: width - 24,
            bottom: 12,
            left: 12,
            padding: 12,
        },
    });
