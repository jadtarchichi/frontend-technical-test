import { FC, FormEvent, useState } from "react";
import {
  Flex,
  Collapse,
  Input,
  Box,
  Avatar,
} from "@chakra-ui/react";
import { useAuthCurrentUser } from "../../contexts/authentication";
import { Loader } from "../common/loader";
import { CommentsList } from "./comments-list";
import { useComments } from "../../services/tanstack/useComments";
import { useCreateComment } from "../../services/tanstack/useCreateComment";

type CommentsProps = {
  memeId: string
};

export const CommentsInput: FC<CommentsProps> = ({ memeId }) => {
  const currentUser = useAuthCurrentUser();
  const [commentContent, setCommentContent] = useState("");
  const { isLoading, data: comments, refetch } = useComments(memeId);
  const { mutate } = useCreateComment()

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (commentContent) {
      mutate({
        memeId: memeId,
        content: commentContent,
      }, {
        onSuccess: () => {
          setCommentContent("");
          refetch();
        }
      });
    }
  }

  if (isLoading) {
    return <Loader data-testid="meme-feed-loader" />;
  }

  return (
    <Collapse in animateOpacity>
      <Box mb={6}>
        <form
          onSubmit={submit}
          data-testid={`meme-add-comment-form-${memeId}`}
        >
          <Flex alignItems="center">
            <Avatar
              borderWidth="1px"
              borderColor="gray.300"
              name={currentUser?.username}
              src={currentUser?.pictureUrl}
              size="sm"
              mr={2}
            />
            <Input
              data-testid={`meme-add-comment-${memeId}`}
              placeholder="Type your comment here..."
              onChange={(event) => {
                setCommentContent(event.target.value);
              }}
              value={commentContent}
            />
          </Flex>
        </form>
      </Box>
      {!!comments?.length && <CommentsList comments={comments} />}
    </Collapse>
  );
};
