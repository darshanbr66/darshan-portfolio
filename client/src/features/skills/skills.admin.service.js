import api from "../../services/api";

export async function getAdminSkills() {
  const response = await api.get("/skills/admin/all");

  return response.data.data;
}

export async function createSkill(skillData) {
  const response = await api.post("/skills/admin", skillData);

  return response.data;
}

export async function updateSkill(id, skillData) {
  const response = await api.put(
    `/skills/admin/${id}`,
    skillData,
  );

  return response.data;
}

export async function deleteSkill(id) {
  const response = await api.delete(
    `/skills/admin/${id}`,
  );

  return response.data;
}
