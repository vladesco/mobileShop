import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native';
import { noop } from '../../../helpers/functions';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { DEFAULT_INPUT_FONT_SIZE, DEFAULT_INPUT_HEIGHT } from './consts';
import { CustomInputProps } from './types';

export const CustomInput: FC<CustomInputProps> = ({
    text,
    placeholder,
    styleProp,
    error,
    onInput,
    onBlur = noop,
    onFocus = noop,
}) => {
    const styles = useTheme(styleGenerator);
    const animatedProperty = useRef(new Animated.Value(0)).current;
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const inputRef = useRef<TextInput>(null);

    const applyFocusedState = useCallback(() => {
        setIsFocused(true);
        onFocus();
    }, [onFocus]);

    const applyUnfocusedState = useCallback(() => {
        setIsFocused(false);
        onBlur();
    }, [onBlur]);

    const inputHeight = Number(styleProp?.height) || DEFAULT_INPUT_HEIGHT;
    const inputFontSize = styleProp?.fontSize || DEFAULT_INPUT_FONT_SIZE;

    useEffect(() => {
        Animated.timing(animatedProperty, {
            toValue: isFocused || text ? 1 : 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [isFocused, text]);

    return (
        <View
            style={[
                styles.container,
                styleProp,
                isFocused && styles.focusedContainer,
                Boolean(error) && styles.erroredContainer,
            ]}
        >
            <TextInput
                value={text}
                onChangeText={onInput}
                onFocus={applyFocusedState}
                onBlur={applyUnfocusedState}
                style={styles.input}
                ref={inputRef}
            />
            <Animated.View
                style={[
                    styles.placeholderContainer,
                    {
                        transform: [
                            {
                                scale: animatedProperty.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0.75],
                                }),
                            },
                            {
                                translateY: animatedProperty.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [Math.floor(inputHeight / 2 - inputFontSize), -inputFontSize],
                                }),
                            },
                            {
                                translateX: animatedProperty.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -16],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <Text
                    onPress={() => inputRef.current?.focus()}
                    style={[
                        styles.placeholder,
                        isFocused && styles.focusedPlaceholder,
                        Boolean(error) && styles.erroredPlaceholder,
                        { fontSize: inputFontSize },
                    ]}
                >
                    {placeholder}
                    {error?.includes('require') && ' *'}
                </Text>
            </Animated.View>
            <Text style={styles.errorMessage}>{error}</Text>
        </View>
    );
};

const styleGenerator = (theme: Theme) => {
    return StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            height: DEFAULT_INPUT_HEIGHT,
            borderWidth: 2,
            borderRadius: 4,
            borderColor: theme.borderColor,
        },
        focusedContainer: {
            borderColor: theme.secondaryColor,
        },
        erroredContainer: {
            borderColor: theme.errorColor,
        },
        input: {
            width: '100%',
            height: '100%',
            paddingLeft: 16,
        },
        placeholderContainer: {
            position: 'absolute',
            left: 16,
            backgroundColor: theme.primaryColor,
        },
        placeholder: {
            paddingHorizontal: 8,
            color: theme.primaryTextColor,
            opacity: 0.5,
        },
        focusedPlaceholder: {
            opacity: 1,
            color: theme.secondaryColor,
        },
        erroredPlaceholder: {
            opacity: 1,
            color: theme.errorColor,
        },
        errorMessage: {
            marginTop: 4,
            color: theme.errorColor,
        },
    });
};
