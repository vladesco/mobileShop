import { GroupValidators } from '../../../components/shared';
import { requiredValidator, emailValidator, passwordValidator } from '../../../helpers/functions';
import { UserCredentials, UserPasswords } from './types';

export const DEFAULT_USER_CREDENTIALS: UserCredentials = {
    firstName: '',
    lastName: '',
    email: '',
};

export const DEFAULT_USER_PASSWORDS: UserPasswords = {
    password: '',
    confirmPassword: '',
};

export const USER_CREDENTIALS_VALIDATORS: GroupValidators<UserCredentials> = {
    firstName: [requiredValidator],
    lastName: [requiredValidator],
    email: [requiredValidator, emailValidator],
};

export const USER_PASSWORDS_VALIDATORS: GroupValidators<UserPasswords> = {
    password: [requiredValidator, passwordValidator],
    confirmPassword: [requiredValidator, passwordValidator],
    group: ({ password, confirmPassword }) => (password !== confirmPassword ? 'passwords must match' : undefined),
};
