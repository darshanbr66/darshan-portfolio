import { useQuery } from "@tanstack/react-query";
import { getAdminProjects } from "../projects.admin.service";

export function useAdminProjects() {
  return useQuery({
    queryKey: ["admin", "projects"],
    queryFn: getAdminProjects,
  });
}
