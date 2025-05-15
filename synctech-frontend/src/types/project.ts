import type {Asset} from "./asset";
import type {CustomField} from "./custom-field";

export interface Project {
	id: string;
	name: string;
	description: string;
	createdAt?: string;
	assets: Asset[];
	customFields: CustomField[];
}
