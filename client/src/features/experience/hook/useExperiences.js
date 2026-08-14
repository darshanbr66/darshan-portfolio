import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "../experience.service";

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
  });
}