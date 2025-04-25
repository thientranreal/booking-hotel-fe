import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

export default function DateRangeSelector({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  error,
}: {
  checkInDate: Dayjs | null;
  setCheckInDate: (value: Dayjs | null) => void;
  checkOutDate: Dayjs | null;
  setCheckOutDate: (value: Dayjs | null) => void;
  error: boolean;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {/* Check-in DatePicker */}
        <DatePicker
          label="Check-in"
          value={checkInDate}
          onChange={(newValue) => {
            setCheckInDate(newValue);
            if (
              newValue &&
              checkOutDate &&
              (newValue.isAfter(checkOutDate) ||
                newValue.isSame(checkOutDate, "day"))
            ) {
              setCheckOutDate(null);
            }
          }}
          format="DD/MM/YYYY"
          disablePast
          slotProps={{
            textField: {
              error: error,
            },
          }}
        />

        <span>-</span>

        {/* Check-out DatePicker */}
        <DatePicker
          label="Check-out"
          value={checkOutDate}
          onChange={(newValue) => setCheckOutDate(newValue)}
          format="DD/MM/YYYY"
          disablePast
          minDate={checkInDate?.add(1, "day")}
          slotProps={{
            textField: {
              error: error,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
