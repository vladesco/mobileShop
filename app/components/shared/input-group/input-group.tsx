import React, { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { generatePlaceholderFromFieldName } from './helpers';
import { InputGroupProps } from './types';

export const InputGroup = <T extends Record<string, string>>({
    group,
    onGroupChange,
}: PropsWithChildren<InputGroupProps<T>>): ReactElement<InputGroupProps<T>> => {
    const styles = useTheme(styleGenerator);

    const getGroupFieldSetter = (groupField: string) => (groupFieldValue: string) =>
        onGroupChange({ ...group, [groupField]: groupFieldValue });

    return (
        <>
            {Object.keys(group).map((field) => (
                <TextInput
                    key={field}
                    placeholder={generatePlaceholderFromFieldName(field)}
                    style={styles.input}
                    value={group[field]}
                    onChangeText={getGroupFieldSetter(field)}
                />
            ))}
        </>
    );
};

const styleGenerator = (theme: Theme) =>
    StyleSheet.create({
        input: {
            marginVertical: 12,
            borderWidth: 2,
            borderRadius: 4,
            borderColor: theme.borderColor,
        },
    });
