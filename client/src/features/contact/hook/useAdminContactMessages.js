import { useQuery } from "@tanstack/react-query";
import { getContactMessages } from "../contact.admin.service";

export function useAdminContactMessages() {
  return useQuery({
    queryKey: ["admin", "contact-messages"],
    queryFn: getContactMessages,
  });
}
