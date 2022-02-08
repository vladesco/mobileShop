export type InputGroupProps<T extends Record<string, string>> = {
    group: T;
    onGroupChange: (newGroupValue: T) => void;
};
