import api from "../../services/api";

export async function getContent() {
  const response = await api.get("/content");

  return response.data.data;
}

export async function getAdminContent() {
  const response = await api.get("/content/admin");

  return response.data.data;
}

export async function updateContent(contentData) {
  const response = await api.put(
    "/content/admin",
    contentData,
  );

  return response.data;
}