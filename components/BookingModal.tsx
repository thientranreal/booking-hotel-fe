import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

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
      <Box width={500} p={5}>
        <DialogTitle textAlign="center">
          Book a table at {restaurantName}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3}>
            <TextField id="name" label="Tên" variant="standard" />
            <TextField id="email" label="Email" variant="standard" />
            <TextField id="phone" label="Số điện thoại" variant="standard" />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <Button variant="contained">Book Table</Button>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
