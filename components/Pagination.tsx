"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  hasNextPage,
  hasPrevPage,
  nextPage,
  prevPage,
  page,
  totalPages,
}: {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (newPage: number | null) => {
    if (newPage) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", String(newPage));
      router.replace(`?${params.toString()}`);
    }
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      mt={2}
      alignItems="center"
    >
      <Button
        onClick={() => onPageChange(prevPage)}
        disabled={!hasPrevPage}
        variant="contained"
        color="primary"
      >
        Previous
      </Button>
      <Typography variant="body1">
        Page {page} of {totalPages}
      </Typography>
      <Button
        onClick={() => onPageChange(nextPage)}
        disabled={!hasNextPage}
        variant="contained"
        color="primary"
      >
        Next
      </Button>
    </Stack>
  );
}
