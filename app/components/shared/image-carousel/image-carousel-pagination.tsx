import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { ImageCarouselPaginationProps } from './types';

export const ImageCarouselPagination: FC<ImageCarouselPaginationProps> = ({
    selectedSlideNumber,
    totalCountOfSlides,
}) => {
    const styles = useTheme(styleGenerator);

    return (
        <View style={styles.container} pointerEvents="none">
            {Array.from({ length: totalCountOfSlides }).map((_, slideIndex) => {
                return (
                    <View
                        key={slideIndex}
                        style={[styles.dot, slideIndex === selectedSlideNumber ? styles.selected : null]}
                    />
                );
            })}
        </View>
    );
};

const styleGenerator = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        dot: {
            width: 8,
            height: 8,
            borderRadius: 3,
            marginHorizontal: 2,
            backgroundColor: theme.secondaryTextColor,
        },
        selected: {
            backgroundColor: theme.secondaryColor,
        },
    });
