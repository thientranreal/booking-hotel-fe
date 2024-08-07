import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import ResRatingReadOnly from "./ResRatingReadOnly";
import { MouseEventHandler } from "react";
import Link from "next/link";

interface CardRestaurantProps {
  id: string;
  image: string;
  title: string;
  categories: string;
  starRatings: number;
  numberPeopelRate: number;
  slotsLeft: number;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function CardRestaurant({
  id,
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
      <Link href={`/restaurants/${id}`}>
        <Box height={200} position="relative">
          <Image src={image} alt="res-alt" layout="fill" objectFit="cover" />
        </Box>
      </Link>

      <Box p={3}>
        <Link href={`/restaurants/${id}`}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "500",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {title}
          </Typography>
        </Link>

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
