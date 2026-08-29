import api from "../../services/api";

export async function getAllExperiences() {
  const response = await api.get("/experience/admin/all");

  return response.data.data;
}

export async function createExperience(experienceData) {
  const response = await api.post(
    "/experience",
    experienceData,
  );

  return response.data;
}

export async function updateExperience(id, experienceData) {
  const response = await api.put(
    `/experience/${id}`,
    experienceData,
  );

  return response.data;
}

export async function deleteExperience(id) {
  const response = await api.delete(
    `/experience/${id}`,
  );

  return response.data;
}
