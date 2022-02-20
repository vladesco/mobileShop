import { ViewStyle } from 'react-native';

export type CustomButtonProps = {
    text: string;
    styleProp?: ViewStyle;
    onPress: () => void;
};
