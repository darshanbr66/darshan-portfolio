import api from "../../services/api";

export async function getAdminProjects() {
  const response = await api.get("/projects/admin/all");

  return response.data.data;
}

export async function createProject(projectData) {
  const response = await api.post(
    "/projects",
    projectData,
  );

  return response.data;
}

export async function updateProject(id, projectData) {
  const response = await api.put(
    `/projects/${id}`,
    projectData,
  );

  return response.data;
}

export async function deleteProject(id) {
  const response = await api.delete(
    `/projects/${id}`,
  );

  return response.data;
}
