import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';


export class CleverCloud implements ICredentialType {
	name = 'cleverCloud';
	displayName = 'Clever Cloud';
	properties = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
		{
			displayName: 'Access Token Secret',
			name: 'accessTokenSecret',
			type: 'string' as NodePropertyTypes,
			default: '',
		}
	];
}
