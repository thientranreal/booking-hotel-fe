import { Typography, Button, Box } from "@mui/material";
import RatingReadOnly from "./RatingReadOnly";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { hotelGet, hotelGetWithParams } from "@/app/api/hotel";
import Pagination from "./Pagination";

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

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const fetchHotelWithSearchParams = async () => {
    const place = searchParams.get("place");
    const fromDate = searchParams.get("fromDate");
    const untilDate = searchParams.get("untilDate");
    const guests = searchParams.get("guests");
    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");
    const amenities = searchParams.getAll("amenities");
    const stars = searchParams.getAll("star");
    const sortBy = searchParams.get("sortBy");
    const page = searchParams.get("page");

    console.log(
      place,
      fromDate,
      untilDate,
      guests,
      priceFrom,
      priceTo,
      amenities,
      stars
    );

    const data = await hotelGetWithParams(
      {
        place,
        fromDate,
        untilDate,
        guests,
      },
      page
    );

    // const data = await hotelGet(page);
    console.log("hotel data", data);

    // if (data.docs) {
    //   setHotels(
    //     data.docs.map((hotel: any) => ({
    //       id: hotel.id,
    //       image: process.env.NEXT_PUBLIC_PAYLOAD_API_URL + hotel.media[0].url,
    //       name: hotel.name,
    //       address: hotel.address,
    //       score: hotel["review score"].score,
    //       amenities: hotel.amenities,
    //     }))
    //   );

    //   setCurrentPage(data.page);
    //   setTotalPages(data.totalPages);
    //   setNextPage(data.nextPage);
    //   setPrevPage(data.prevPage);
    //   setHasNextPage(data.hasNextPage);
    //   setHasPrevPage(data.hasPrevPage);
    // }
  };

  useEffect(() => {
    fetchHotelWithSearchParams();
  }, [searchParams]);

  return (
    <>
      {hotels.map((hotel) => (
        <Box
          key={hotel.id}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
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
              alt={hotel.name}
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

            <Box display="flex" gap={2} mt={2} flexWrap="wrap">
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
              <Typography variant="h6">121 VND</Typography>
              <Typography variant="body2" color="text.secondary">
                Đã bao gồm VAT
              </Typography>
              <Link href={`/hotels/${hotel.id}?${searchParams.toString()}`}>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Xem chi tiết
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      ))}

      <Pagination
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        nextPage={nextPage}
        prevPage={prevPage}
        page={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
