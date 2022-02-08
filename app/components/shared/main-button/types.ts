import { ViewStyle } from 'react-native';

export type CustomButtonProps = {
    text: string;
    onPress: () => void;
    styleProp?: ViewStyle;
};
