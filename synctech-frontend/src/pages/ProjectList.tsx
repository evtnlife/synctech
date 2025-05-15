import {Link} from "react-router-dom";
import {EyeIcon, PlusIcon, PencilIcon} from "@heroicons/react/24/outline";

import {useProjects} from "../hooks/useProjects";

export default function ProjectList() {
	const {projects, loading, error} = useProjects();

	if (loading) return <p className="text-center text-gray-400">Loading projects...</p>;
	if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

	return (
		<div className="p-4 sm:p-6 max-w-6xl mx-auto">
			<div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
				<h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">Projects</h1>
				<Link
					to="/projects/new"
					className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow transition">
					<PlusIcon className="w-5 h-5" />
					Add New
				</Link>
			</div>

			<div className="overflow-x-auto rounded-lg border border-gray-700 shadow">
				<table className="min-w-full bg-gray-900 text-white text-sm">
					<thead className="bg-gray-800 text-xs uppercase tracking-wide text-gray-300">
						<tr>
							<th className="px-4 py-3 text-left">Project Name</th>
							<th className="px-4 py-3 text-left">Description</th>
							<th className="px-4 py-3 text-left">Created At</th>
							<th className="px-4 py-3 text-left">Action</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-700">
						{projects.map((p) => (
							<tr key={p.id} className="hover:bg-gray-800 transition">
								<td className="px-4 py-3">{p.name}</td>
								<td className="px-4 py-3">{p.description}</td>
								<td className="px-4 py-3">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "Empty"}</td>
								<td className="px-4 py-3 gap-2">
									<div className="flex items-center gap-3">
										<Link to={`/projects/${p.id}`} className="text-blue-400 hover:text-blue-200" title="View Project">
											<EyeIcon className="w-5 h-5" />
										</Link>

										<Link
											to={`/projects/${p.id}/edit`}
											className="text-yellow-400 hover:text-yellow-200"
											title="Edit Project">
											<PencilIcon className="w-5 h-5" />
										</Link>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
