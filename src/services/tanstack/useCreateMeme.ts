import { useMutation } from "@tanstack/react-query";
import { createMeme } from "../api/meme";
import { Caption, Picture } from "../types/meme";

export function useCreateMeme() {
    return useMutation({
        mutationFn: async (data: { picture: Picture, texts: Array<Caption>, description: string }) => {
            const memes = await createMeme(data.picture, data.texts, data.description);
            return memes;
        },
    });
}