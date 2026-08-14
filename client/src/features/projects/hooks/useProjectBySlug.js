import { useQuery } from "@tanstack/react-query";
import { getProjectBySlug } from "../projects.service";

export function useProjectBySlug(slug) {
  return useQuery({
    queryKey: ["projects", slug],
    queryFn: () => getProjectBySlug(slug),
    enabled: Boolean(slug),
  });
}