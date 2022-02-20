import { ValidatorFN } from './types';

export const generatePlaceholderFromFieldName = (fieldName: string) =>
    fieldName
        .split(/(?=[A-Z])/)
        .map((substring) => `${substring[0].toUpperCase()}${substring.slice(1)}`)
        .join(' ');

export const runValidators = (text: string, validators: ValidatorFN[]): string => {
    for (const validator of validators) {
        const errorMessage = validator(text);

        if (errorMessage) {
            return errorMessage;
        }
    }

    return '';
};
