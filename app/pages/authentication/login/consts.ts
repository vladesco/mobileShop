import { GroupValidators } from '../../../components/shared';
import { emailValidator, passwordValidator, requiredValidator } from '../../../helpers/functions';
import { LoginInfo } from './types';

export const DEFAULT_USER_NAME = 'Default User';

export const DEFAULT_LOGIN_INFO: LoginInfo = {
    email: '',
    password: '',
};

export const LOGIN_INFO_VALIDATORS: GroupValidators<LoginInfo> = {
    email: [requiredValidator, emailValidator],
    password: [requiredValidator, passwordValidator],
};
