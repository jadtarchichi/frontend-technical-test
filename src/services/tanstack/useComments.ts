import { useQuery } from "@tanstack/react-query";
import { getMemeComments } from "../api/meme";
import { getUserById } from "../api/user";

export function useComments(memeId: string) {
  return useQuery({
    queryKey: ["comments", memeId],
    queryFn: async () => {
      const commentsResp = await getMemeComments(memeId, 1);
      let comments = [...commentsResp.results];

      const remainingCommentPages = Math.ceil(commentsResp.total / commentsResp.pageSize);

      for (let i = 2; i <= remainingCommentPages; i++) {
        const page = await getMemeComments(memeId, i);
        comments = comments.concat(page.results);
      };

      const promises = [];
      for (let comment of comments) {
        promises.push(getUserById(comment.authorId).then(author => comment.author = author));
      };

      await Promise.all(promises);

      return comments;
    },
  });
}