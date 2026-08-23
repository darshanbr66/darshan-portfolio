import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../profile.service";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
}