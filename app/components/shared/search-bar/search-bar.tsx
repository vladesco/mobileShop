import React, { FC } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { useDebounce, useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { SearchBarProps } from './types';

export const SearchBar: FC<SearchBarProps> = ({ handleSearch }) => {
    const styles = useTheme(styleGenerator);
    const debouncedSearchHandler = useDebounce(handleSearch, 300);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../../../assets/images/magnifier.png')}
            />
            <TextInput placeholder="Search shops" onChangeText={debouncedSearchHandler} />
        </View>
    );
};

const styleGenerator = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: 24,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: theme.borderColor,
        },
        image: {
            marginHorizontal: 8,
        },
    });
