import { useQuery } from "@tanstack/react-query";
import { getAllExperiences } from "../experience.admin.service";

export function useAdminExperience() {
  return useQuery({
    queryKey: ["admin", "experiences"],
    queryFn: getAllExperiences,
  });
}
