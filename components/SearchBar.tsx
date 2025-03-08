"use client";

import DateRangeSelector from "@/components/DateRangeSelector";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";

export default function SearchBar({
  placeInput = "",
  checkInDateInput = dayjs(),
  checkOutDateInput = dayjs().add(1, "day"),
  guestsInput = 2,
  setOpenSearch,
}: {
  placeInput?: string;
  checkInDateInput?: Dayjs | null;
  checkOutDateInput?: Dayjs | null;
  guestsInput?: number;
  setOpenSearch?: (open: boolean) => void;
}) {
  const router = useRouter();
  const [place, setPlace] = useState<string>(placeInput);
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(
    checkInDateInput
  );
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(
    checkOutDateInput
  );
  const [guests, setGuests] = useState<number>(guestsInput);
  const [error, setError] = useState<{
    place: boolean;
    date: boolean;
    guests: boolean;
  }>({
    place: false,
    date: false,
    guests: false,
  });

  const formatDate = (date: Dayjs) => {
    return `${date.year()}-${date.month() + 1}-${date.date()}`;
  };

  const handleSearch = () => {
    if (place && checkInDate && checkOutDate && guests >= 1) {
      router.push(
        `/availability?place=${place}&fromDate=${formatDate(
          checkInDate
        )}&untilDate=${formatDate(checkOutDate)}&guests=${guests}`
      );

      if (setOpenSearch) {
        setOpenSearch(false);
      }
      return;
    }

    if (!place) {
      setError((current) => ({ ...current, place: true }));
    } else {
      setError((current) => ({ ...current, place: false }));
    }

    if (!checkInDate || !checkOutDate) {
      setError((current) => ({ ...current, date: true }));
    } else {
      setError((current) => ({ ...current, date: false }));
    }

    if (guests === 0) {
      setError((current) => ({ ...current, guests: true }));
    } else {
      setError((current) => ({ ...current, guests: false }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" color={error.place ? "red" : ""}>
        Địa điểm
      </Typography>
      <TextField
        fullWidth
        placeholder="Tìm kiếm"
        variant="outlined"
        value={place || ""}
        onChange={(e) => setPlace(e.target.value)}
        error={error.place}
      />

      <Typography variant="h6" color={error.date ? "red" : ""}>
        Ngày
      </Typography>
      <DateRangeSelector
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        error={error.date}
      />

      <Typography variant="h6" color={error.guests ? "red" : ""}>
        Số khách
      </Typography>
      <TextField
        fullWidth
        type="number"
        variant="outlined"
        inputProps={{ min: 1 }}
        value={guests || 2}
        onChange={(e) => setGuests(Number(e.target.value))}
        error={error.guests}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, py: 1.5 }}
        onClick={handleSearch}
      >
        Tìm kiếm
      </Button>
    </Box>
  );
}
