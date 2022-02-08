import React, { useCallback, useContext, useState } from 'react';
import { FC } from 'react';
import { useRequest } from '../../../helpers/hooks';
import { ProductInfo } from '../../../types';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppTheme, Theme } from '../../../theme';
import { ProductPreviewList } from '../../products';
import { Header, SearchBar } from '../../shared';

export const MainPage: FC = () => {
    const [searchText, setSearchText] = useState('');
    const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
    const theme = useContext(AppTheme);
    const styles = generateStylesForTheme(theme);

    const requestInfo = useRequest<{ data: ProductInfo[] }>('/products', {
        queryParams: {
            'filter[name]': searchText,
        },
        applyCache: !isRefreshNeeded,
    });

    const product = requestInfo?.response?.data;

    if (product && isRefreshNeeded) {
        setIsRefreshNeeded(false);
    }

    return (
        <>
            <Header>
                <Image
                    source={require('../../../../assets/images/hamburger.png')}
                />
                <Text style={styles.headerText}>Ecommerce Store</Text>
                <Image source={require('../../../../assets/images/shop.png')} />
            </Header>
            <View style={styles.searchArea}>
                <SearchBar handleSearch={setSearchText} />
            </View>
            {product ? (
                <ProductPreviewList
                    products={product}
                    refresh={() => setIsRefreshNeeded(true)}
                />
            ) : null}
        </>
    );
};

const generateStylesForTheme = (theme: Theme) =>
    StyleSheet.create({
        headerText: {
            color: theme.primaryColor,
            fontSize: 24,
        },
        searchArea: {
            backgroundColor: theme.primaryColor,
            elevation: 4,
        },
    });
