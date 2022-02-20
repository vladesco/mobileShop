export type ValidatorFN = (text: string) => void | string;

export type GroupValidators<T extends Record<string, string>> = Partial<
    Record<keyof T, ValidatorFN[]> & {
        group: (groupValue: T) => string | void;
    }
>;

export type GroupValidationState<T extends Record<string, string>> = Partial<
    Record<keyof T, string> & {
        group: string;
    }
>;

export type InputGroupProps<T extends Record<string, string>> = {
    groupValue: T;
    groupValidators?: GroupValidators<T>;
    onGroupChange: (newGroupValue: T) => void;
};
