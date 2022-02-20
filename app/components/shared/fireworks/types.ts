import { ViewStyle } from 'react-native';

export type FireworksProps = {
    iterationTime: number;
    density: 1 | 2 | 3 | 4 | 5;
    styleProps?: Partial<ViewStyle>;
};
