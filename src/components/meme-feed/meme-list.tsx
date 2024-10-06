import {
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { MemeFeedCard } from "./meme-card";
import { GetMemesResponse } from "../../services/types/meme";

type MemeFeedListProps = {
  memes: GetMemesResponse
};

export const MemeFeedList: React.FC<MemeFeedListProps> = ({ memes }) => {
  return (
    <VStack
      p={4}
      width="full"
      maxWidth={800}
      divider={<StackDivider border="gray.200" />}
    >
      {
        memes?.results?.map((meme) => {
          return (
            <MemeFeedCard key={meme.id} meme={meme} />
          );
        })
      }
    </VStack>
  );
};