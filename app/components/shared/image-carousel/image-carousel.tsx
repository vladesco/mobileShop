import React, { FC, useCallback, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, ScaledSize } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { ImageCarouselPagination } from './image-carousel-pagination';
import { CarouselImage, ImageCarouselProps } from './types';

export const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
    const styles = useTheme(styleGenerator);

    const [selectedSlideNumber, setSelectedSlideNumber] = useState<number>(0);
    const flatListRef = useRef<FlatList<CarouselImage>>(null);
    const firstSlideNumber = 0;
    const lastSlideNumber = images.length - 1;

    const selectPreviousSlide = useCallback(() => {
        const isFirstSlideSelected = selectedSlideNumber === firstSlideNumber;
        setSelectedSlideNumber(isFirstSlideSelected ? lastSlideNumber : selectedSlideNumber - 1);
    }, [selectedSlideNumber, images.length]);

    const selectNextSlide = useCallback(() => {
        const isLastSlideSelected = selectedSlideNumber === lastSlideNumber;
        setSelectedSlideNumber(isLastSlideSelected ? firstSlideNumber : selectedSlideNumber + 1);
    }, [selectedSlideNumber, images.length]);

    const handleOnViewableItemsChanged = useCallback(
        ({ viewableItems }) => {
            const [currentSlide] = viewableItems;

            if (!currentSlide) {
                return;
            }

            setSelectedSlideNumber(currentSlide.index);
        },
        [images]
    );

    if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
            animated: true,
            index: selectedSlideNumber,
        });
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={selectPreviousSlide}>
                    <Text style={styles.arrowButton}>❮</Text>
                </TouchableOpacity>
                <FlatList
                    data={images}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.slide}>
                                <Image style={styles.slideImage} source={{ uri: item.uri }} />
                            </View>
                        );
                    }}
                    ref={flatListRef}
                    keyExtractor={(item) => item.id}
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={handleOnViewableItemsChanged}
                    viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
                />
                <TouchableOpacity onPress={selectNextSlide}>
                    <Text style={styles.arrowButton}>❯</Text>
                </TouchableOpacity>
            </View>
            <ImageCarouselPagination totalCountOfSlides={images.length} selectedSlideNumber={selectedSlideNumber} />
        </>
    );
};

const styleGenerator = (theme: Theme, { width, height }: ScaledSize) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        slide: {
            flex: 1,
            justifyContent: 'center',
            width: width - 32,
            height: height / 2,
        },
        slideImage: {
            flex: 1,
            margin: 32,
            borderRadius: 8,
        },
        arrowButton: {
            fontSize: 32,
        },
    });
