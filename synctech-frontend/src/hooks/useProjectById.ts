import {useEffect, useState} from "react";
import axios from "axios";
import type {Project} from "../types/project";

export function useProjectById(id?: string) {
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		setLoading(true);

		axios
			.get(`/api/projects/${id}`)
			.then((res) => setProject(res.data))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [id]);

	return {project, loading, error};
}
