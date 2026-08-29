import { useQuery } from "@tanstack/react-query";
import { getAllFiles } from "../files.admin.service";

export function useAdminFiles() {
  return useQuery({
    queryKey: ["admin", "files"],
    queryFn: getAllFiles,
  });
}