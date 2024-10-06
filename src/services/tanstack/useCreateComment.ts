import { useMutation } from "@tanstack/react-query";
import { createMemeComment } from "../api/meme";

export function useCreateComment() {
  return useMutation({
    mutationFn: async (data: { memeId: string; content: string }) => {
      return await createMemeComment(data.memeId, data.content);
    },
  })
}