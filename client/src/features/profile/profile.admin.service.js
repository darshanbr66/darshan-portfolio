import api from "../../services/api";

export async function getAdminProfile() {
  const response = await api.get("/profile/admin");

  return response.data;
}

export async function updateAdminProfile(profileData) {
  const response = await api.put(
    "/profile/admin",
    profileData,
  );

  return response.data;
}