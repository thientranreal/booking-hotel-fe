import { Box, CircularProgress, Typography } from "@mui/material";
import RoomCard from "../RoomCard";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { roomTypeGetWithHotelIdAndParams } from "@/app/api/roomType";

interface roomType {
  id: string;
  bedType: string;
  amenities: [];
  name: string;
  price: number;
  numberOfGuests: number;
  images: [];
}

export default function InfoPrice() {
  const params = useParams<{ hotelID: string }>();
  const searchParams = useSearchParams();

  const [roomTypes, setRoomTypes] = useState<roomType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
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

        if (data) {
          setRoomTypes(
            data.map((room: any) => ({
              id: room.id,
              bedType: room.bedType,
              amenities: room.amenities,
              name: room.name,
              price: room.price,
              numberOfGuests: room.numberOfGuests,
              images: room.image.map(
                (img: any) =>
                  process.env.NEXT_PUBLIC_PAYLOAD_API_URL + img.image.url
              ),
            }))
          );
        }

        setIsLoading(false);
      };

      fetchRoomType();
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            Chọn phòng của bạn
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap">
            {roomTypes.map((element) => (
              <RoomCard
                key={element.id}
                id={element.id}
                images={element.images}
                name={element.name}
                type={element.bedType}
                amenities={element.amenities}
                numberOfGuests={element.numberOfGuests}
                price={element.price}
              />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
