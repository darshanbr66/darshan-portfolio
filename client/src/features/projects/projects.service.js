import api from "../../services/api";

export async function getProjects() {
  const response = await api.get("/projects");

  return response.data.data;
}

export async function getProjectBySlug(slug) {
  const response = await api.get(`/projects/${slug}`);

  return response.data.data;
}