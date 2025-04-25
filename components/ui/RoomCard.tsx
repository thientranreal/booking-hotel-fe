import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import ImageSlider from "./ImageSlider";
import BedIcon from "@mui/icons-material/Bed";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function RoomCard({
  id,
  images,
  name,
  type,
  amenities,
  numberOfGuests,
  price,
}: {
  id: string;
  images: Array<string>;
  name: string;
  type: string;
  amenities: Array<string>;
  numberOfGuests: number;
  price: number;
}) {
  const params = useParams<{ hotelID: string }>();
  const queryParams = useSearchParams();

  return (
    <Box
      sx={{
        width: 350,
        height: 425,
        border: "1px solid rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
      }}
    >
      <Box
        height={180}
        borderRadius="10px 10px 0 0"
        overflow="hidden"
        sx={{
          "&:hover .swiper-button-prev, &:hover .swiper-button-next": {
            opacity: 1,
          },
          ".swiper-button-prev, .swiper-button-next": {
            opacity: 0,
            transition: "opacity 0.3s ease",
          },
        }}
      >
        <ImageSlider images={images} />
      </Box>

      <Box p={2}>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Room name */}
          <Typography fontWeight="600" fontSize="1.25rem">
            {name}
          </Typography>

          {/* Type and guest info */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <BedIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {type}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <PeopleIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {numberOfGuests} guest{numberOfGuests > 1 ? "s" : ""}
              </Typography>
            </Box>
          </Box>

          {/* Amenities */}
          <Box display="flex" flexWrap="wrap" gap={1}>
            {amenities.map((element) => (
              <Chip key={element} label={element} size="small" />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography
              fontWeight={600}
              fontSize="1.125rem"
              color="text.primary"
            >
              {price.toLocaleString()} VND
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Đã bao gồm thuế
            </Typography>
          </Box>

          <Box>
            <Button
              variant="contained"
              color="primary"
              LinkComponent={Link}
              href={`/hotels/book/${
                params.hotelID
              }/${id}?${queryParams.toString()}`}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                boxShadow: 3,
                ":hover": {
                  boxShadow: 4,
                  backgroundColor: "#c9302c",
                },
              }}
            >
              Đặt phòng
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
