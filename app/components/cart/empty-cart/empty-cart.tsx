import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';
import { Theme } from '../../../theme';
import { CustomButton } from '../../shared';
import { EmptyCartProps } from './types';

export const EmptyCart: FC<EmptyCartProps> = ({ onContinueShopping }) => {
    return (
        <View>
            <Image source={require('../../../../assets/images/empty_order.png')} />
            <Text>Your Cart is Empty!</Text>
            <Text>Add product in your cart now</Text>
            <CustomButton text="Shop Now" onPress={onContinueShopping} />
        </View>
    );
};
