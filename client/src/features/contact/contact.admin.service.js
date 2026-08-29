import api from "../../services/api";

export async function getContactMessages() {
  const response = await api.get("/contact/admin/all");

  return response.data.data;
}

export async function updateContactMessageStatus(id, status) {
  const response = await api.patch(
    `/contact/admin/${id}/status`,
    { status },
  );

  return response.data;
}

export async function deleteContactMessage(id) {
  const response = await api.delete(
    `/contact/admin/${id}`,
  );

  return response.data;
}
