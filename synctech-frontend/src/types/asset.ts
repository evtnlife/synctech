import type {AssetType} from "./asset-type";

export interface Asset {
	id: number;
	name: string;
	url: string;
	type?: AssetType;
	typeId: number;
	createdAt?: string;
}
