"use client";

import { paymentPost, reservationGet } from "@/api/reservation";
import Pagination from "@/components/ui/Pagination";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type BookingStatus = "paid" | "unpaid" | "failed" | "pending" | "cancelled";

interface Booking {
  id: string;
  hotelName: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  price: number;
  status: BookingStatus;
}

const getStatusColor = (status: BookingStatus) => {
  switch (status) {
    case "paid":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    case "unpaid":
      return "info";
    case "failed":
      return "error";
    default:
      return "default";
  }
};

export default function BookingHistory() {
  const params = useParams<{ userID: string }>();
  const searchParams = useSearchParams();

  const [bookings, setBookings] = useState<Booking[]>([]);

  const [paginationData, setPaginationData] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: 0,
    prevPage: 0,
    page: 0,
    totalPages: 0,
  });

  const fetchReservation = async (page: number) => {
    const data = await reservationGet(params.userID, page);

    if (data.errors) {
      toast.error(data.errors[0].message);
    } else {
      setPaginationData({
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
        nextPage: data.nextPage,
        prevPage: data.prevPage,
        page: data.page,
        totalPages: data.totalPages,
      });

      setBookings(
        data.docs.map((booking: any) => ({
          id: booking.id,
          hotelName: booking.room_type.hotel?.name,
          location: booking.room_type.hotel?.address,
          image:
            process.env.NEXT_PUBLIC_PAYLOAD_API_URL +
            `${
              booking.room_type.image.length > 0
                ? booking.room_type.image[0].image.url
                : "/api/media/file/not-found-img.jpg"
            }`,
          checkIn: booking.start_date,
          checkOut: booking.end_date,
          price: booking.price,
          status: booking.payment_status,
        }))
      );
    }
  };

  const handlePayment = async (reservationId: string) => {
    const data = await paymentPost(reservationId);

    if (data && data.errors) {
      toast.error(data.errors[0].message);
    } else if (data && data.error) {
      toast.error(data.error);
    } else if (data && data.url) {
      window.location.href = data.url;
    }
  };

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;

    fetchReservation(Number(page));
  }, [searchParams]);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        Lịch sử đặt phòng
      </Typography>
      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={booking.image}
                alt={booking.hotelName}
              />
              <CardContent>
                <Typography variant="h6">{booking.hotelName}</Typography>
                <Typography color="text.secondary">
                  {booking.location}
                </Typography>
                <Typography>
                  <strong>Nhận phòng:</strong>{" "}
                  {new Date(booking.checkIn).toLocaleString()}
                </Typography>
                <Typography>
                  <strong>Trả phòng:</strong>{" "}
                  {new Date(booking.checkOut).toLocaleString()}
                </Typography>
                <Typography>
                  <strong>Giá:</strong> {booking.price}
                </Typography>
                <Chip
                  label={booking.status}
                  color={getStatusColor(booking.status as BookingStatus)}
                  sx={{ mt: 1 }}
                />
                <Box mt={2}>
                  {["pending", "unpaid"].includes(booking.status) && (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        handlePayment(booking.id);
                      }}
                    >
                      Xác nhận
                    </Button>
                  )}

                  {!["cancelled", "failed"].includes(booking.status) && (
                    <Button variant="outlined" color="error">
                      Hủy
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        hasNextPage={paginationData.hasNextPage}
        hasPrevPage={paginationData.hasPrevPage}
        nextPage={paginationData.nextPage}
        prevPage={paginationData.prevPage}
        page={paginationData.page}
        totalPages={paginationData.totalPages}
      />
    </Box>
  );
}
