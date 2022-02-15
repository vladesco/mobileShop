export const generatePlaceholderFromFieldName = (fieldName: string) =>
    fieldName
        .split(/(?=[A-Z])/)
        .map((substring) => `${substring[0].toUpperCase()}${substring.slice(1)}`)
        .join(' ');
