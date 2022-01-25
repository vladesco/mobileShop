import React, { FC, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppTheme, Theme } from '../../../theme';
import { ImageCarouselPaginationProps } from './image-carousel.types';

export const ImageCarouselPagination: FC<ImageCarouselPaginationProps> = ({
    selectedSlideNumber,
    totalCountOfSlides,
}) => {
    const theme = useContext(AppTheme);
    const styles = generateStylesForTheme(theme);
    return (
        <View style={styles.container} pointerEvents="none">
            {Array.from({ length: totalCountOfSlides }).map((_, slideIndex) => {
                return (
                    <View
                        key={slideIndex}
                        style={[
                            styles.dot,
                            slideIndex === selectedSlideNumber
                                ? styles.selected
                                : null,
                        ]}
                    />
                );
            })}
        </View>
    );
};

const generateStylesForTheme = (theme: Theme) =>
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
            backgroundColor: theme.lightTextColor,
        },
        selected: {
            backgroundColor: theme.secondaryColor,
        },
    });
