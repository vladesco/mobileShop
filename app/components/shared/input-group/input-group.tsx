import React, { PropsWithChildren, ReactElement, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../../../helpers/hooks';
import { Theme } from '../../../theme';
import { CustomInput } from '../custom-input';
import { generatePlaceholderFromFieldName, runValidators } from './helpers';
import { GroupValidationState, InputGroupProps } from './types';

export const InputGroup = <T extends Record<string, string>>({
    groupValue,
    onGroupChange,
    groupValidators,
}: PropsWithChildren<InputGroupProps<T>>): ReactElement<InputGroupProps<T>> => {
    const styles = useTheme(styleGenerator);
    const [groupErrors, setGroupErrors] = useState<GroupValidationState<T>>({});

    const getGroupFieldSetter = (groupField: string) => (groupFieldValue: string) => {
        onGroupChange({ ...groupValue, [groupField]: groupFieldValue });
    };

    const getGroupFieldValidator = (groupField: string) => () => {
        const fieldValidators = groupValidators?.[groupField];
        const groupValidator = groupValidators?.group;
        const fieldErrorMessage = fieldValidators ? runValidators(groupValue[groupField], fieldValidators) : null;
        const groupErrorMessage = groupValidator ? groupValidator(groupValue) : null;

        setGroupErrors({ ...groupErrors, group: groupErrorMessage, [groupField]: fieldErrorMessage });
    };

    return (
        <>
            {Object.keys(groupValue).map((field) => (
                <CustomInput
                    key={field}
                    placeholder={generatePlaceholderFromFieldName(field)}
                    styleProp={groupErrors.group ? styles.erroredInput : styles.input}
                    text={groupValue[field]}
                    error={groupErrors[field]}
                    onInput={getGroupFieldSetter(field)}
                    onBlur={getGroupFieldValidator(field)}
                    onFocus={() => setGroupErrors({ ...groupErrors, [field]: '', group: '' })}
                />
            ))}
            {Boolean(groupErrors.group) && <Text style={styles.groupError}>{groupErrors.group}</Text>}
        </>
    );
};

const styleGenerator = (theme: Theme) => {
    const inputStyles = {
        height: 60,
        marginVertical: 14,
    };

    return StyleSheet.create({
        input: {
            ...inputStyles,
        },
        erroredInput: {
            ...inputStyles,
            borderColor: theme.errorColor,
        },
        groupError: {
            paddingLeft: 3,
            color: theme.errorColor,
        },
    });
};
