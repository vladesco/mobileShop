import { TextStyle, ViewStyle } from 'react-native';

export type CustomInputProps = {
    text: string;
    placeholder: string;
    styleProp?: ViewStyle & TextStyle;
    error?: string;
    onInput: (inputText: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
};
