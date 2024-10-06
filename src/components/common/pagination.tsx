import {
  Stack,
  Button,
} from "@chakra-ui/react";

type PaginationProps = {
  isLoading: boolean,
  page: number,
  totalPages: number,
  onPaginationChange: (newPage: number) => void
};

export const Pagination: React.FC<PaginationProps> = ({ isLoading, page, totalPages, onPaginationChange }) => {
  return (
    <Stack direction='row' spacing={4} align='center'>
      {
        page > 1 &&
        <Button disabled={isLoading} onClick={() => onPaginationChange(page - 1)} colorScheme='teal' variant='outline'>
          Previous
        </Button>
      }

      {page}

      {
        page < totalPages && <Button disabled={isLoading} onClick={() => onPaginationChange(page + 1)} colorScheme='teal' variant='solid'>
          Next
        </Button>
      }
    </Stack>
  );
};