import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../projects.service";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
}