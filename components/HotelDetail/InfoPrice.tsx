import { Box, Typography } from "@mui/material";
import RoomCard from "../RoomCard";
import { useParams } from "next/navigation";

const images = [
  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

export default function InfoPrice() {
  const params = useParams<{ hotelID: string }>();
  // params.hotelID to get room type

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Chọn phòng của bạn
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap">
        <RoomCard
          id="123"
          images={images}
          name="Queen Room"
          type="1 queen"
          amenities={["Free Wi-Fi", "Máy lạnh"]}
          price={200000}
        />
      </Box>
    </Box>
  );
}
