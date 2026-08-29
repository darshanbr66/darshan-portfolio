import api from "../../services/api";

export function getResumeUrl() {
  return `${api.defaults.baseURL}/resume`;
}