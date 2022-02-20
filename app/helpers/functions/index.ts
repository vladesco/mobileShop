import { ValidatorFN } from '../../components/shared';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const requiredValidator: ValidatorFN = (text) => {
    if (!text) {
        return 'field is required';
    }
};

export const emailValidator: ValidatorFN = (text) => {
    if (text && text.match(emailRegex)) {
        return;
    }

    return 'field must be email';
};

export const passwordValidator: ValidatorFN = (text) => {
    if (text && text.match(passwordRegex)) {
        return;
    }

    return 'field must have 1 letter, 1 number and minimum 8 symbols';
};

export const noop = () => null;
