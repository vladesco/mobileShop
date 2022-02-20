import React, { FC, memo, useEffect, useState } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import {
    getFireworkPosition,
    getNumberOfFireworks,
    getNumberOfParticles,
    getParticleCoordinateOffset,
    getRandomColor,
    getRandomKey,
} from './helpers';
import { FireworksProps } from './types';

export const Fireworks: FC<FireworksProps> = memo(({ iterationTime, density, styleProps }) => {
    const styles = useTheme(styleGenerator);
    const dimensions = useWindowDimensions();
    const [animatedProperty, setAnimatedProperty] = useState(new Animated.Value(0));

    const containerWidth = Number(styleProps?.width || dimensions.width);
    const containerHeight = Number(styleProps?.height || dimensions.height);

    useEffect(() => {
        Animated.timing(animatedProperty, {
            toValue: 1,
            duration: iterationTime,
            useNativeDriver: true,
        }).start(() => setAnimatedProperty(new Animated.Value(0)));
    }, [iterationTime, density, animatedProperty]);

    return (
        <View style={[styles.container, styleProps]}>
            {Array.from({ length: getNumberOfFireworks(density) }, () =>
                getFireworkPosition(containerWidth, containerHeight)
            ).map(({ x, y }) =>
                Array.from({ length: getNumberOfParticles(density) }, () => (
                    <Animated.View
                        key={getRandomKey()}
                        style={[
                            styles.particle,
                            {
                                left: x,
                                top: y,
                                backgroundColor: getRandomColor(),
                                transform: [
                                    {
                                        translateX: animatedProperty.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, getParticleCoordinateOffset(containerWidth)],
                                        }),
                                    },
                                    {
                                        translateY: animatedProperty.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, getParticleCoordinateOffset(containerHeight)],
                                        }),
                                    },
                                ],
                                opacity: animatedProperty.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0],
                                }),
                            },
                        ]}
                    ></Animated.View>
                )).flat(1)
            )}
        </View>
    );
});

const styleGenerator = () =>
    StyleSheet.create({
        container: {
            position: 'relative',
        },
        particle: {
            position: 'absolute',
            width: 10,
            height: 10,
            borderRadius: 5,
        },
    });
