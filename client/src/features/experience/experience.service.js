import api from "../../services/api";

export async function getExperiences() {
  const response = await api.get("/experience");

  return response.data.data;
}