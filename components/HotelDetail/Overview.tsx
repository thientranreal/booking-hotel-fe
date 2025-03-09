import { Box, Button, Grid, Typography, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PetsIcon from "@mui/icons-material/Pets";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import Image from "next/image";
import RatingReadOnly from "../RatingReadOnly";

const images = [
  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

export default function Overview({
  setValue,
}: {
  setValue: (value: string) => void;
}) {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Comfort Hotel Montlucon
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
          >
            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
            Centre Commercial St Jacques Quai Louis Blanc, Montlucon, Allier, FR
          </Typography>

          <Box sx={{ mt: 2 }}>
            <RatingReadOnly value={2.5} size="medium" />
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
        Comfort Hotel Montlucon is located on the Quai Louis Blanc, close to the
        heart of Montlucon. With free parking and proximity to the train
        station, you can enjoy all the amenities this charming town has to
        offer. Visit Montlucon and discover its famous castle and extraordinary
        Popular Music Museum. Walking around the town you will find amazing
        monuments such as the house of the Twelve Apostles, the Deanery passage,
        and the Churches of Our Lady and St. Peter. With 50 cozy and comfortable
        rooms, Comfort Hotel Montlucon provides excellent value for money. All
        rooms include amenities such as a work desk, climate control, a
        flatscreen television and an en-suite bathroom featuring a shower,
        hairdryer, and toiletries. Comfort Hotel Montlucon also offers a bar
        lounge and a spacious lobby area where you can socialize and relax with
        a drink, in room courtesy trays with coffee and tea making facilities,
        and free high speed internet access. Pets are Allowed.
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Dịch vụ tiện ích
      </Typography>

      <Box display="flex" mt={2} gap={3}>
        <Chip label="Đậu xe" variant="outlined" icon={<LocalParkingIcon />} />
        <Chip label="Bar" variant="outlined" icon={<LocalBarIcon />} />
        <Chip
          label="Cho phép thú cưng"
          variant="outlined"
          icon={<PetsIcon />}
        />
      </Box>
    </Box>
  );
}
