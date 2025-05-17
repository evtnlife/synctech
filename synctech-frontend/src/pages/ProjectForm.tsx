import {useNavigate} from "react-router-dom";
import {useProjectForm} from "../hooks/useProjectForm";

export default function ProjectForm({edit = false}: {edit?: boolean}) {
	const {
		id,
		form,
		loading,
		error,
		assetTypes,
		handleChange,
		handleSubmit,
		handleFieldChange,
		addCustomField,
		removeCustomField,
		handleAssetChange,
		addAsset,
		removeAsset,
		setForm,
	} = useProjectForm({edit});

	let navigate = useNavigate();

	return (
		<div className="p-6 max-w-2xl mx-auto text-white">
			<h1 className="text-2xl font-bold mb-4">{edit ? `Edit Project #${id}` : "Create New Project"}</h1>

			{error && <p className="text-red-500 mb-4">{error}</p>}

			<form onSubmit={handleSubmit} className="space-y-6">
				<input
					name="name"
					placeholder="Project Name"
					className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600"
					required
					value={form.name}
					onChange={handleChange}
				/>

				<textarea
					name="description"
					placeholder="Project Description"
					className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600"
					value={form.description}
					onChange={handleChange}
				/>

				{/* Custom Fields */}
				<div>
					<div className="flex justify-between items-center mb-2">
						<h2 className="text-lg font-semibold">Custom Fields</h2>
						<button
							type="button"
							onClick={addCustomField}
							className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded">
							+ Add Field
						</button>
					</div>

					{(form.customFields || []).map((field, index) => (
						<div key={index} className="flex gap-2 mb-2">
							<input
								placeholder="Key"
								className="flex-1 px-2 py-1 rounded bg-gray-800 border border-gray-600"
								value={field.key}
								required={true}
								onChange={(e) => handleFieldChange(index, "key", e.target.value)}
							/>
							<input
								placeholder="Value"
								className="flex-1 px-2 py-1 rounded bg-gray-800 border border-gray-600"
								value={field.value}
								required={true}
								onChange={(e) => handleFieldChange(index, "value", e.target.value)}
							/>
							<button
								type="button"
								onClick={() => removeCustomField(index)}
								className="text-red-400 hover:text-red-300 px-2">
								✕
							</button>
						</div>
					))}
				</div>

				{/* Assets */}
				<div>
					<div className="flex justify-between items-center mb-2">
						<h2 className="text-lg font-semibold">Assets</h2>
						<button
							type="button"
							onClick={addAsset}
							className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded">
							+ Add Asset
						</button>
					</div>

					{(form.assets || []).map((asset, index) => (
						<div key={asset.id} className="flex flex-col sm:flex-row gap-2 mb-2">
							<input
								placeholder="Asset Name"
								className="flex-1 px-2 py-1 rounded bg-gray-800 border border-gray-600"
								required={true}
								value={asset.name}
								onChange={(e) => handleAssetChange(index, "name", e.target.value)}
							/>

							<input
								placeholder="Asset URL"
								className="flex-1 px-2 py-1 rounded bg-gray-800 border border-gray-600"
								required={true}
								value={asset.url}
								onChange={(e) => handleAssetChange(index, "url", e.target.value)}
							/>

							<select
								className="px-2 py-1 rounded bg-gray-800 border border-gray-600 text-white"
								value={asset.type?.id || ""}
								onChange={(e) => {
									const typeId = Number(e.target.value);
									const selected = assetTypes.find((t) => t.id === typeId);
									if (!selected) return;

									const updatedAssets = [...(form.assets || [])];
									updatedAssets[index] = {
										...updatedAssets[index],
										type: selected,
									};
									setForm({...form, assets: updatedAssets});
								}}>
								<option value="">Select Type</option>
								{assetTypes.map((type) => (
									<option key={type.id} value={type.id}>
										{type.name}
									</option>
								))}
							</select>

							<button type="button" onClick={() => removeAsset(index)} className="text-red-400 hover:text-red-300 px-2">
								✕
							</button>
						</div>
					))}
				</div>

				<div className="flex flex-col sm:flex-row gap-4">
					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
						disabled={loading}>
						{loading ? "Saving..." : edit ? "Update Project" : "Create Project"}
					</button>

					<button
						onClick={() => navigate("/projects")}
						className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50">
						Back to List
					</button>
				</div>
			</form>
		</div>
	);
}
