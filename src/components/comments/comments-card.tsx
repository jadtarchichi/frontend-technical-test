import { FC } from "react";
import {
  Flex,
  Box,
  Text,
  Avatar
} from "@chakra-ui/react";

import { format } from "timeago.js";
import { Comment } from "../../services/types/meme";

type CommentsCardProps = {
  comment: Comment
};

export const CommentsCard: FC<CommentsCardProps> = ({ comment }) => {
  return (
    <Flex>
      {
        comment.author && <Avatar
          borderWidth="1px"
          borderColor="gray.300"
          size="sm"
          name={comment.author.username}
          src={comment.author.pictureUrl}
          mr={2}
        />
      }

      <Box p={2} borderRadius={8} bg="gray.50" flexGrow={1}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex>
            <Text data-testid={`meme-comment-author-${comment.memeId}-${comment.id}`}>{comment.author?.username}</Text>
          </Flex>
          <Text
            fontStyle="italic"
            color="gray.500"
            fontSize="small"
          >
            {format(comment.createdAt)}
          </Text>
        </Flex>
        <Text color="gray.500" whiteSpace="pre-line" data-testid={`meme-comment-content-${comment.memeId}-${comment.id}`}>
          {comment.content}
        </Text>
      </Box>
    </Flex>
  );
};
