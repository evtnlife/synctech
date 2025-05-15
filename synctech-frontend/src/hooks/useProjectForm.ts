import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import type {Asset} from "../types/asset";
import type {CustomField} from "../types/custom-field";
import type {Project} from "../types/project";
import type {AssetType} from "../types/asset-type";

interface UseProjectFormOptions {
	edit?: boolean;
}

export function useProjectForm({edit = false}: UseProjectFormOptions) {
	const {id} = useParams<{id: string}>();
	const navigate = useNavigate();

	const [form, setForm] = useState<Partial<Project>>({
		name: "",
		description: "",
		customFields: [],
		assets: [],
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);

	useEffect(() => {
		if (edit && id) {
			setLoading(true);
			axios
				.get<Project>(`/api/projects/${id}`)
				.then((res) => {
					setForm(res.data);
				})
				.catch(() => setError("Failed to load project"))
				.finally(() => setLoading(false));
		}
	}, [edit, id]);

	useEffect(() => {
		axios
			.get<AssetType[]>("/api/asset-types")
			.then((res) => setAssetTypes(res.data))
			.catch(() => setAssetTypes([{id: 1, name: "Link"}]));
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({...form, [e.target.name]: e.target.value});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const cleanedAssets = (form.assets || []).map((asset) => ({
			...(asset.id ? {id: asset.id} : {}),
			name: asset.name,
			url: asset.url,
			typeId: asset.type?.id ?? asset.typeId,
		}));

		const payload = {
			...form,
			assets: cleanedAssets,
		};

		const request = edit ? axios.put(`/api/projects/${id}`, payload) : axios.post("/api/projects", payload);

		request
			.then(() => navigate("/projects"))
			.catch(() => setError("Failed to submit"))
			.finally(() => setLoading(false));
	};

	const handleFieldChange = (index: number, key: keyof CustomField, value: string) => {
		const updated = [...(form.customFields || [])];
		updated[index] = {...updated[index], [key]: value};
		setForm({...form, customFields: updated});
	};

	const addCustomField = () => {
		setForm({
			...form,
			customFields: [...(form.customFields || []), {key: "", value: ""}],
		});
	};

	const removeCustomField = (index: number) => {
		const updated = [...(form.customFields || [])];
		updated.splice(index, 1);
		setForm({...form, customFields: updated});
	};

	const handleAssetChange = (index: number, key: keyof Asset, value: string) => {
		const updated = [...(form.assets || [])];
		updated[index] = {...updated[index], [key]: value};
		setForm({...form, assets: updated});
	};

	const addAsset = () => {
		setForm({
			...form,
			assets: [...(form.assets || []), {id: Date.now(), name: "", url: "", typeId: 1}],
		});
	};

	const removeAsset = (index: number) => {
		const updated = [...(form.assets || [])];
		updated.splice(index, 1);
		setForm({...form, assets: updated});
	};

	return {
		id,
		form,
		setForm,
		loading,
		error,
		handleChange,
		handleSubmit,
		handleFieldChange,
		addCustomField,
		assetTypes,
		removeCustomField,
		handleAssetChange,
		addAsset,
		removeAsset,
	};
}
function setAssetTypes(data: AssetType[]): any {
	throw new Error("Function not implemented.");
}
