import { useContext, useMemo } from 'react';
import { ScaledSize, StyleSheet, useWindowDimensions } from 'react-native';
import { AppTheme } from '../../providers';
import { Theme } from '../../theme';

type StyleGenerator<T = unknown> = (theme: Theme, dimensions: ScaledSize) => T;

export const useTheme = <T extends ReturnType<typeof StyleSheet.create>>(
    styleGenerator: StyleGenerator<T>
): ReturnType<typeof styleGenerator> => {
    const theme = useContext(AppTheme);
    const dimensions = useWindowDimensions();
    const generatedStyles = useMemo(() => styleGenerator(theme, dimensions), [theme, dimensions]);

    return generatedStyles;
};
