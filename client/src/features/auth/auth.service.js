import api from "../../services/api";

export async function loginAdmin(credentials) {
  const response = await api.post("/auth/login", credentials);

  return response.data;
}

export async function getAdminProfile() {
  const response = await api.get("/profile/admin");

  return response.data;
}