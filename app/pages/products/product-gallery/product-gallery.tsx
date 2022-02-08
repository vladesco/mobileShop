import React, { useCallback, useState } from 'react';
import { FC } from 'react';
import { useRequest, useTheme } from '../../../helpers/hooks';
import { NavigationPages, ProductInfo, WithCombinedNavigation } from '../../../types';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ProductPreviewList } from '../../../components/products';
import { ClickableImage, Header, SearchBar } from '../../../components/shared';
import { Theme } from '../../../theme';

export const ProductGallery: WithCombinedNavigation<FC, NavigationPages.PRODUCT_GALLERY> = ({ navigation }) => {
    const styles = useTheme(styleGenerator);
    const [searchText, setSearchText] = useState('');
    const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
    const refreshProducts = useCallback(() => () => setIsRefreshNeeded(true), []);

    const requestInfo = useRequest<{ data: ProductInfo[] }>('/products', {
        queryParams: {
            'filter[name]': searchText,
        },
        applyCache: !isRefreshNeeded,
    });
    const products = requestInfo?.response?.data;

    if (products && isRefreshNeeded) {
        setIsRefreshNeeded(false);
    }

    return (
        <View style={styles.container}>
            <Header>
                <ClickableImage
                    source={require('../../../../assets/images/hamburger.png')}
                    onPress={navigation.openDrawer}
                />
                <Text style={styles.headerText}>Ecommerce Store</Text>
                <Image source={require('../../../../assets/images/shop.png')} />
            </Header>
            <View style={styles.searchArea}>
                <SearchBar handleSearch={setSearchText} />
            </View>
            {products ? (
                <ProductPreviewList
                    products={products}
                    onRefresh={refreshProducts}
                    onPress={(selectedProduct) =>
                        navigation.navigate(NavigationPages.PRODUCT_DETAILS, { selectedProduct })
                    }
                />
            ) : null}
        </View>
    );
};

const styleGenerator = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.primaryColor,
        },
        headerText: {
            color: theme.primaryColor,
            fontSize: 24,
        },
        searchArea: {
            backgroundColor: theme.primaryColor,
            elevation: 4,
        },
    });
