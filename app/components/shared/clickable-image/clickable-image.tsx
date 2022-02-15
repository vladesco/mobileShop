import React, { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ClickableImageProps } from './types';

export const ClickableImage: FC<ClickableImageProps> = ({ source, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Image source={source} />
    </TouchableOpacity>
);
