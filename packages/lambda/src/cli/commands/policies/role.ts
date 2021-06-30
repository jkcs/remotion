import {getRolePolicy} from '../../../api/iam-validation/suggested-policy';
import {Log} from '../../log';
export const ROLE_SUBCOMMAND = 'role';

export const roleSubcommand = () => {
	Log.info('Policy for role:');
	Log.info(JSON.stringify(getRolePolicy(), null, 2));
};
