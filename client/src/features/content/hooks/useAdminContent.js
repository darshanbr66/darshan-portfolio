import { useQuery } from "@tanstack/react-query";
import { getAdminContent } from "../content.service";

export function useAdminContent() {
  return useQuery({
    queryKey: ["admin", "content"],
    queryFn: getAdminContent,
  });
}