import {useParams, Link} from "react-router-dom";
import {useProjectById} from "../hooks/useProjectById";

export default function ProjectDetails() {
	const {id} = useParams<{id: string}>();
	const {project, loading, error} = useProjectById(id);

	if (loading) {
		return <p className="text-center text-gray-400">Loading project...</p>;
	}

	if (error || !project) {
		return <p className="text-center text-red-500">Error: {error || "Project not found"}</p>;
	}

	return (
		<div className="p-4 sm:p-6 max-w-4xl mx-auto text-white">
			<h1 className="text-3xl font-bold mb-4">Project Details</h1>

			{/* Basic Info */}
			<div className="bg-gray-800 rounded-lg shadow p-4 mb-6">
				<p className="text-xl font-semibold">{project.name}</p>
				<p className="text-sm text-gray-300 mb-2">{project.description}</p>
				<p className="text-xs text-gray-400">
					Created: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Empty"}
				</p>
			</div>

			{/* Custom Fields */}
			{project.customFields?.length > 0 && (
				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Custom Fields</h2>
					<ul className="space-y-1 text-sm">
						{project.customFields.map((field, index) => (
							<li key={`${field.key}-${index}`} className="flex justify-between bg-gray-700 px-3 py-2 rounded">
								<span className="font-medium capitalize">{field.key}:</span>
								<span>{field.value}</span>
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Assets */}
			{project.assets?.length > 0 && (
				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Assets</h2>
					<ul className="list-disc pl-5 text-sm text-blue-300">
						{project.assets.map((asset) => (
							<li key={asset.id}>
								<a href={asset.url} className="hover:underline" target="_blank" rel="noopener noreferrer">
									{asset.name}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Actions */}
			<div className="flex flex-col sm:flex-row gap-4">
				<Link
					to={`/projects/${id}/edit`}
					className=" bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-center">
					Edit Project
				</Link>

				<Link to="/projects" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-center">
					Back to List
				</Link>
			</div>
		</div>
	);
}
