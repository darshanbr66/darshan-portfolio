import { useQuery } from "@tanstack/react-query";
import { getSkills } from "../skills.service";

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
}