import React, { FC, useContext } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { AppTheme, Theme } from '../../../theme';
import { ProductPreview } from '../product-preview';
import { ProductPreviewListProps } from './types';

export const ProductPreviewList: FC<ProductPreviewListProps> = ({
    products,
    refresh,
}) => {
    const theme = useContext(AppTheme);
    const styles = generateStylesForTheme(theme);

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductPreview product={item} />}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={!Boolean(products)}
                        onRefresh={refresh}
                    />
                }
                contentContainerStyle={styles.list}
                numColumns={2}
            />
        </View>
    );
};

const generateStylesForTheme = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        list: {
            alignItems: 'center',
        },
    });
