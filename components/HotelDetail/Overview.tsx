import { Box, Button, Grid, Typography, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import RatingReadOnly from "../RatingReadOnly";

export default function Overview({
  name,
  address,
  score,
  description,
  images,
  amenities,
  setValue,
}: {
  name: string;
  address: string;
  score: number;
  description: string;
  images: string[];
  amenities: string[];
  setValue: (value: string) => void;
}) {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
          >
            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
            {address}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <RatingReadOnly value={score} size="medium" />
          </Box>
        </Box>

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setValue("2")}
          >
            Đặt phòng
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Image
            src={images[0]}
            alt="Hotel Main"
            width={600}
            height={300}
            style={{ borderRadius: 8, width: "100%" }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={1}>
            {images.map(
              (element, index) =>
                index !== 0 && (
                  <Grid item xs={6} key={element}>
                    <Image
                      src={element}
                      alt="Hotel"
                      width={150}
                      height={100}
                      style={{ borderRadius: 8, width: "100%" }}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </Grid>
      </Grid>

      <Typography variant="body1" sx={{ mt: 2 }}>
        {description}
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Dịch vụ tiện ích
      </Typography>

      <Box display="flex" mt={2} gap={3}>
        {amenities.map((element) => (
          <Chip key={element} label={element} variant="outlined" />
        ))}
      </Box>
    </Box>
  );
}
