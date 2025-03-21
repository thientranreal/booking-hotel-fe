import { Typography, Button, Box } from "@mui/material";
import RatingReadOnly from "./RatingReadOnly";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Hotel {
  id: string;
  image: string;
  name: string;
  address: string;
  score: number;
  amenities: string[];
}

export default function HotelCard() {
  const searchParams = useSearchParams();

  const [hotels, setHotels] = useState<Hotel[]>([]);

  const fetchHotelWithSearchParams = async () => {
    const place = searchParams.get("place");
    const fromDate = searchParams.get("fromDate");
    const untilDate = searchParams.get("untilDate");
    const guests = searchParams.get("guests");

    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    try {
      const res = await fetch(`${apiUrl}/hotel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch hotels");
      }
      const data = await res.json();
      // setHotels(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    setHotels([
      {
        id: "1",
        image: "/images/photo-res.webp",
        name: "New World",
        address: "29 PDL JID KSN",
        score: 3.5,
        amenities: ["Wi-Fi", "Chỗ đậu xe", "Nhà hàng"],
      },
      {
        id: "2",
        image: "/images/photo-res.webp",
        name: "New World",
        address: "29 PDL JID KSN",
        score: 3.5,
        amenities: ["Wi-Fi", "Chỗ đậu xe", "Nhà hàng"],
      },
    ]);
  };

  useEffect(() => {
    fetchHotelWithSearchParams();
  }, []);

  return (
    <>
      {hotels.map((hotel) => (
        <Box
          key={hotel.id}
          sx={{
            width: 804,
            height: 274,
            p: 2,
            display: "flex",
            border: "1px solid rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            mb: 3,
          }}
        >
          <Link href={`/hotels/${hotel.id}?${searchParams.toString()}`}>
            <Image
              src={hotel.image}
              width={240}
              height={250}
              alt="Picture of the hotel"
              style={{ borderRadius: "10px" }}
            />
          </Link>

          <Box
            sx={{ p: 0, pl: 2 }}
            flexGrow={1}
            display="flex"
            flexDirection="column"
          >
            <Link href={`/hotels/${hotel.id}?${searchParams.toString()}`}>
              <Typography fontWeight="bold" component="div">
                {hotel.name}
              </Typography>
            </Link>
            <Box display="flex" alignItems="center" gap={0.5}>
              <RatingReadOnly value={3} showLabel={false} size="small" />
              <span>-</span>
              <Typography variant="body2" color="text.secondary" m={0} p={0}>
                {hotel.address}
              </Typography>
            </Box>

            <Box display="flex" gap={2} mt={2}>
              {hotel.amenities.map((amenity) => (
                <Typography key={amenity + hotel.id} variant="body2">
                  {amenity}
                </Typography>
              ))}
            </Box>

            <Box
              flexGrow={1}
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              justifyContent="flex-end"
            >
              <Button variant="contained" sx={{ mt: 2 }}>
                Xem chi tiết
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
}
