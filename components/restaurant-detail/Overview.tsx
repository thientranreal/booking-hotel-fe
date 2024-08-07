import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import ResRatingReadOnly from "../ResRatingReadOnly";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import BookingModal from "../BookingModal";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export default function Overview() {
  const [open, setOpen] = useState<boolean>(false);
  const [bookRestaurant, setBookRestaurant] = useState<string>("");
  return (
    <>
      <Stack spacing={3}>
        <Typography component="h1" variant="h5" fontWeight={600}>
          El Gaucho Argentinian Steakhouse - Hai Ba Trung
        </Typography>

        <Stack direction="row" spacing={3}>
          <ResRatingReadOnly value={4.3} />

          <Box>
            <ReviewsOutlinedIcon />
            <Typography ml={1} component="span">
              Reviews
            </Typography>
          </Box>

          <Box>
            <AttachMoneyOutlinedIcon />
            <Typography component="span">Money</Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Chip label="Category 1" variant="outlined" />
          <Chip label="Category 2" variant="outlined" />
          <Chip label="Category 3" variant="outlined" />
        </Stack>

        <Typography>
          OUR EL GAUCHO STEAKHOUSE – CONTEMPORARY AND SPECIALIZED We are proud
          to serve you the finest steakhouse-style food, using only the best
          available meat products sourced from selected farms in Victoria, New
          South Wales and individual farmers and ranchers in the United States.
          This is all about the original flavour of the naturally raised meat,
          paired with the offer of our own steakhouse classics, as well as a
          modern approach on ingredients, preparation and combinations. Let your
          sense of taste be awakened with an aperitif, let the juicy meat melt
          in your mouth, dive into the latest wine treasures and find in a
          selection of premium cigars a peaceful retreat from the bustling world
          around.
        </Typography>

        <Button
          onClick={() => {
            setOpen(true);
            setBookRestaurant(
              "El Gaucho Argentinian Steakhouse - Hai Ba Trung"
            );
          }}
          fullWidth
          variant="contained"
        >
          Book a table
        </Button>
      </Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BookingModal
          open={open}
          restaurantName={bookRestaurant}
          onClose={() => setOpen(false)}
        />
      </LocalizationProvider>
    </>
  );
}
