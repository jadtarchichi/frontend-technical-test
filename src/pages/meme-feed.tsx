import { Flex } from "@chakra-ui/react";
import { MemeFeedList } from "../components/meme-feed/meme-list";
import { Pagination } from "../components/common/pagination";
import { useMemesFeed } from "../services/tanstack/useMemesFeed";
import { Loader } from "../components/common/loader";
import { useState } from "react";

export const MemeFeedPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const { isLoading, data: memes } = useMemesFeed(page);

  const onPaginationChange = (newPage: number) => {
    setPage(newPage);
  }

  if (isLoading) {
    return <Loader data-testid="meme-feed-loader" />;
  }

  return (
    <Flex width="full" flexDirection="column" alignItems="center" height="full" overflowY="auto">
      <MemeFeedList memes={memes!} />

      <Pagination
        isLoading={isLoading}
        onPaginationChange={onPaginationChange}
        page={page}
        totalPages={Math.ceil(memes!.total / memes!.pageSize) - 1}
      />
    </Flex>
  );
};