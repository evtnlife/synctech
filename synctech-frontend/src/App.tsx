import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectForm from "./pages/ProjectForm";
import ProjectList from "./pages/ProjectList";

function App() {
	return (
		<div className="p-4">
			<Routes>
				<Route path="/" element={<Navigate to="/projects" replace />} />
				<Route path="/projects" element={<ProjectList />} />
				<Route path="/projects/new" element={<ProjectForm />} />
				<Route path="/projects/:id" element={<ProjectDetails />} />
				<Route path="/projects/:id/edit" element={<ProjectForm edit />} />
			</Routes>
		</div>
	);
}

export default App;
