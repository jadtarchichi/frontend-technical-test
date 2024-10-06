import { FC } from "react";
import {
  VStack
} from "@chakra-ui/react";

import { Comment } from "../../services/types/meme";
import { CommentsCard } from "./comments-card";

type CommentsListProps = {
  comments: Array<Comment>
};

export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  return (
    <VStack align="stretch" spacing={4}>
      {
        comments?.map((comment) => (
          <CommentsCard key={comment.id} comment={comment} />
        ))
      }
    </VStack>
  );
};
