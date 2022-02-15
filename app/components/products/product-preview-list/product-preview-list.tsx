import React, { FC } from 'react';
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Card } from '../../shared';
import { ProductPreview } from '../product-preview';
import { ProductPreviewListProps } from './types';

export const ProductPreviewList: FC<ProductPreviewListProps> = ({ products, onRefresh, onPress }) => {
    const styles = useTheme(styleGenerator);

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPress(item)} style={styles.productCard}>
                        <Card>
                            <ProductPreview product={item} />
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={!Boolean(products)} onRefresh={onRefresh} />}
                columnWrapperStyle={{ justifyContent: 'space-around' }}
                contentContainerStyle={styles.list}
                numColumns={2}
            />
        </View>
    );
};

const styleGenerator = () =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        productCard: {
            margin: 8,
        },
        list: {
            alignItems: 'center',
        },
    });
