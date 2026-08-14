import api from "../../services/api";

export async function getSkills() {
  const response = await api.get("/skills");

  return response.data.data;
}