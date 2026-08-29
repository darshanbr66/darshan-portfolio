import { useQuery } from "@tanstack/react-query";
import { getContent } from "../content.service";

export function useContent() {
  return useQuery({
    queryKey: ["content"],
    queryFn: getContent,
  });
}