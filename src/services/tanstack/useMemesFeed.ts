import { useQuery } from "@tanstack/react-query";
import { getMemes } from "../api/meme";
import { getUserById } from "../api/user";

export function useMemesFeed(page: number) {
  return useQuery({
    queryKey: ["memes", page],
    queryFn: async () => {
      const memes = await getMemes(page);

      const promises = [];
      for (let meme of memes.results) {
        promises.push(getUserById(meme.authorId).then(author => meme.author = author));
      };

      await Promise.all(promises);

      return memes;
    },
  });
}
