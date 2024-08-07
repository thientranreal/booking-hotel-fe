import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface BookingModalProps {
  open: boolean;
  restaurantName: string;
  onClose: () => void;
}

export default function BookingModal({
  open,
  restaurantName,
  onClose,
}: BookingModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box width={{ xs: "inherit", md: "500px" }} p={5}>
        <DialogTitle textAlign="center">
          Đặt chỗ cho {restaurantName}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3}>
            {/* Date time picker */}
            <Box
              pt={2}
              display="flex"
              gap={2}
              flexDirection={{ xs: "column", md: "row" }}
            >
              <DatePicker
                label="Ngày"
                defaultValue={dayjs()}
                format="DD/MM/YYYY"
                disablePast
              />
              <TimePicker label="Giờ" defaultValue={dayjs()} disablePast />
            </Box>
            {/* End date time picker */}
            <TextField id="name" label="Tên" variant="standard" />

            <TextField id="email" label="Email" variant="standard" />

            <TextField id="phone" label="Số điện thoại" variant="standard" />

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <Button
                variant="contained"
                sx={{ height: { xs: "4rem", sm: "inherit" } }}
              >
                Đặt bàn
              </Button>
              <Button
                variant="outlined"
                sx={{ height: { xs: "4rem", sm: "inherit" } }}
                onClick={onClose}
              >
                Hủy
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
