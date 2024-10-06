import { FC, useState } from "react";
import { CaretDown, CaretUp, Chat } from "@phosphor-icons/react";
import {
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  Box,
  Text,
} from "@chakra-ui/react";
import { CommentsInput } from "../comments/comments-input";

type MemeCommentsProps = {
  memeId: string,
  commentsCount: string
};

export const MemeComments: FC<MemeCommentsProps> = ({ memeId, commentsCount }) => {
  const [openedCommentSection, setOpenedCommentSection] = useState<boolean>(false);

  return (
    <Flex width="full" flexDirection="column" gap="2">
      <LinkBox as={Box} py={2} borderBottom="1px solid black">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" >
            <LinkOverlay
              data-testid={`meme-comments-section-${memeId}`}
              cursor="pointer"
              onClick={() =>
                setOpenedCommentSection(
                  !openedCommentSection
                )
              }
            >
              <Text data-testid={`meme-comments-count-${memeId}`}>{commentsCount || 0} comments</Text>
            </LinkOverlay>
            <Icon
              as={
                !openedCommentSection ? CaretDown : CaretUp
              }
              ml={2}
              mt={1}
            />
          </Flex>
          <Icon as={Chat} />
        </Flex>
      </LinkBox>

      {openedCommentSection && <CommentsInput memeId={memeId} />}
    </Flex>
  );
};
