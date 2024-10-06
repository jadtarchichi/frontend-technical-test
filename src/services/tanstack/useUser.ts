
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/user";

export function useUser(userId: string) {

  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      return await getUserById(userId);
    },
  });
}