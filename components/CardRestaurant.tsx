import { Box, Button, Paper, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Image from "next/image";

const starStyle = {
  color: "#FFC107",
  fontSize: "medium",
};

interface CardRestaurantProps {
  image: string;
  title: string;
  categories: string;
  starRatings: string;
  numberPeopelRate: string;
}

export default function CardRestaurant({
  image,
  title,
  categories,
  starRatings,
  numberPeopelRate,
}: CardRestaurantProps) {
  // Get integer part
  let integerPart = parseInt(starRatings);
  // Get decimal part
  let decimalPart = Number(Number(starRatings).toFixed(1).split(".")[1]);

  if (decimalPart <= 2) {
    decimalPart = 0;
  } else if (decimalPart >= 3 && decimalPart <= 8) {
    decimalPart = 0.5;
  } else {
    decimalPart = 0;
    integerPart += 1;
  }

  const starArr = new Array(5).fill(0);
  for (let i = 0; i < 5; i++) {
    integerPart = integerPart - 1;
    if (integerPart < 0) {
      if (decimalPart !== 0) {
        starArr[i] = decimalPart;
      }
      break;
    }
    starArr[i] = 1;
  }

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ mr: 0.5, fontWeight: "500" }}>
            {starRatings}
          </Typography>
          <Box sx={{ mr: 0.5 }}>
            {starArr.map((value, index) => {
              if (value === 1) {
                return <StarIcon key={index} sx={starStyle} />;
              }
              if (value === 0) {
                return <StarOutlineIcon key={index} sx={starStyle} />;
              } else {
                return <StarHalfIcon key={index} sx={starStyle} />;
              }
            })}
          </Box>
          <Typography variant="body2" color="text.secondary">
            ({numberPeopelRate})
          </Typography>
        </Box>

        <Button fullWidth sx={{ mt: 3 }} variant="contained">
          Book a table
        </Button>
      </Box>
    </Paper>
  );
}
