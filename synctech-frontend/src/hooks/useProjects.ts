import axios from "axios";
import {useEffect, useState} from "react";
import type {Project} from "../types/project";

export function useProjects() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get("/api/projects")
			.then((res) => setProjects(res.data))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	return {projects, loading, error};
}
