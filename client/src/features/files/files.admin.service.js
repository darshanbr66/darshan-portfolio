import api from "../../services/api";

export async function getAllFiles() {
  const response = await api.get("/uploads/admin/all");

  return response.data.data;
}

export async function uploadFile(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/uploads",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}

export async function setResume(fileId) {
  const response = await api.put(
    "/resume/admin",
    {
      fileId,
    },
  );

  return response.data;
}

export async function deleteFile(id) {
  const response = await api.delete(
    `/uploads/${id}`,
  );

  return response.data;
}

export function getFileUrl(id) {
  return `${api.defaults.baseURL}/uploads/${id}`;
}

export function getResumeUrl() {
  return `${api.defaults.baseURL}/resume`;
}

export async function getFileBlob(id) {
  const response = await api.get(
    `/uploads/${id}`,
    {
      responseType: "blob",
    },
  );

  return response.data;
}