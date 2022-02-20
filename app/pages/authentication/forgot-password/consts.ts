import { GroupValidators } from '../../../components/shared';
import { emailValidator, requiredValidator } from '../../../helpers/functions';
import { PasswordInfo } from './types';

export const DEFAULT_PASSWORD_INFO: PasswordInfo = {
    email: '',
};

export const PASSWORD_INFO_VALIDATORS: GroupValidators<PasswordInfo> = {
    email: [requiredValidator, emailValidator],
};
