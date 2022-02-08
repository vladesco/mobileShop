import React, { FC, useCallback, useContext, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Dimensions,
    Image,
    Text,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { AppTheme, Theme } from '../../../theme';
import { ImageCarouselPagination } from './image-carousel-pagination';
import { CarouselImage, ImageCarouselProps } from './image-carousel.types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
    const theme = useContext(AppTheme);
    const styles = generateStylesForTheme(theme);

    const [selectedSlideNumber, setSelectedSlideNumber] = useState<number>(0);
    const flatListRef = useRef<FlatList<CarouselImage>>(null);
    const isFirstSlide = selectedSlideNumber === 0;
    const isLastSlide = selectedSlideNumber === images.length - 1;

    if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
            animated: true,
            index: selectedSlideNumber,
        });
    }

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

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    disabled={isFirstSlide}
                    onPress={() =>
                        setSelectedSlideNumber(selectedSlideNumber - 1)
                    }
                >
                    <Text style={styles.arrowButton}>❮</Text>
                </TouchableOpacity>
                <FlatList
                    data={images}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.slide}>
                                <Image
                                    style={styles.slideImage}
                                    source={{ uri: item.uri }}
                                />
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
                <TouchableOpacity
                    disabled={isLastSlide}
                    onPress={() =>
                        setSelectedSlideNumber(selectedSlideNumber + 1)
                    }
                >
                    <Text style={styles.arrowButton}>❯</Text>
                </TouchableOpacity>
            </View>
            <ImageCarouselPagination
                totalCountOfSlides={images.length}
                selectedSlideNumber={selectedSlideNumber}
            />
        </>
    );
};

const generateStylesForTheme = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        slide: {
            flex: 1,
            justifyContent: 'center',
            width: screenWidth - 32,
            height: screenHeight / 2,
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
