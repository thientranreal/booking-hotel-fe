import { Box, Typography } from "@mui/material";
import RoomCard from "../RoomCard";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { roomTypeGetWithHotelIdAndParams } from "@/app/api/roomType";

const images = [
  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

interface roomType {
  id: string;
  bedType: string;
  amenities: [];
  name: string;
  price: number;
}

export default function InfoPrice() {
  const params = useParams<{ hotelID: string }>();
  const searchParams = useSearchParams();

  const [roomTypes, setRoomTypes] = useState<roomType[]>([]);

  useEffect(() => {
    const fetchRoomType = async () => {
      const place = searchParams.get("place");
      const fromDate = searchParams.get("fromDate");
      const untilDate = searchParams.get("untilDate");
      const guests = searchParams.get("guests");
      const hotelId = params.hotelID;

      const data = await roomTypeGetWithHotelIdAndParams(hotelId, {
        place,
        fromDate,
        untilDate,
        guests,
      });

      console.log(data);

      if (data) {
        setRoomTypes(
          data.map((room: any) => ({
            id: room.id,
            bedType: room.bedType,
            amenities: room.amenities,
            name: room.name,
            price: room.price,
          }))
        );
      }
    };

    fetchRoomType();
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Chọn phòng của bạn
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap">
        {roomTypes.map((element) => (
          <RoomCard
            key={element.id}
            id={element.id}
            images={images}
            name={element.name}
            type={element.bedType}
            amenities={element.amenities}
            price={element.price}
          />
        ))}
      </Box>
    </Box>
  );
}
