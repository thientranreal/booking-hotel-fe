import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import ResRatingReadOnly from "./ResRatingReadOnly";
import { MouseEventHandler } from "react";

interface CardRestaurantProps {
  image: string;
  title: string;
  categories: string;
  starRatings: number;
  numberPeopelRate: number;
  slotsLeft: number;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function CardRestaurant({
  image,
  title,
  categories,
  starRatings,
  numberPeopelRate,
  slotsLeft,
  onClick,
}: CardRestaurantProps) {
  return (
    <Paper elevation={4}>
      <Box height={200} position="relative">
        <Image src={image} alt="res-alt" layout="fill" objectFit="cover" />
      </Box>

      <Box p={3}>
        <Typography variant="h5" component="div" sx={{ fontWeight: "500" }}>
          {title}
        </Typography>
        <Typography sx={{ mb: 2 }} variant="body2" color="text.secondary">
          {categories}
        </Typography>
        <Box display="flex" alignItems="center">
          <ResRatingReadOnly value={starRatings} />
          <Typography ml={1} variant="body2" color="text.secondary">
            ({numberPeopelRate})
          </Typography>
        </Box>

        <Typography variant="subtitle1" fontWeight={600} mt={2}>
          Còn {slotsLeft} chỗ
        </Typography>

        <Button onClick={onClick} fullWidth variant="contained">
          Book a table
        </Button>
      </Box>
    </Paper>
  );
}
