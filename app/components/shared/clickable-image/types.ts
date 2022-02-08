import { ImageSourcePropType } from 'react-native';

export type ClickableImageProps = {
    source: ImageSourcePropType;
    onPress?: () => void;
};
