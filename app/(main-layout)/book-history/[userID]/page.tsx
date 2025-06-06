"use client";

import {
  paymentPost,
  refundPost,
  reservationGet,
  reservationUpdateStatus,
} from "@/api/reservation";
import Pagination from "@/components/ui/Pagination";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type BookingStatus = "paid" | "failed" | "pending" | "cancelled" | "refunded";

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
    case "refunded":
      return "info";
    case "failed":
      return "error";
    default:
      return "default";
  }
};

const translateBookingStatusToVN = (status: BookingStatus) => {
  switch (status) {
    case "paid":
      return "Đã thanh toán";
    case "failed":
      return "Thanh toán thất bại";
    case "pending":
      return "Đang chờ xử lý";
    case "cancelled":
      return "Đã hủy";
    case "refunded":
      return "Đã hoàn tiền";
    default:
      return "Không xác định";
  }
};

export default function BookingHistory() {
  const params = useParams<{ userID: string }>();
  const searchParams = useSearchParams();

  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState({
    reservationId: "",
    action: "",
    cancel: false,
    accept: false,
  });

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

  const handlePayment = (reservationId: string) => {
    setLoading((prev) => ({
      ...prev,
      reservationId,
      accept: true,
    }));
  };

  const handleCancel = (
    reservationId: string,
    paymentStatus: BookingStatus
  ) => {
    if (paymentStatus === "pending") {
      const confirmed = window.confirm("Bạn có muốn hủy đơn đặt này ?");

      if (confirmed) {
        setLoading((prev) => ({
          ...prev,
          reservationId,
          action: "cancel",
          cancel: true,
        }));
      }
    } else if (paymentStatus === "paid") {
      const confirmed = window.confirm("Bạn có muốn hoàn tiền đơn đặt này ?");

      if (confirmed) {
        setLoading((prev) => ({
          ...prev,
          reservationId,
          action: "refund",
          cancel: true,
        }));
      }
    }
  };

  const updateStatusToCancel = async (reservationId: string, page: number) => {
    const data = await reservationUpdateStatus(reservationId, "cancelled");

    if (data && data.errors) {
      toast.error(data.errors[0].message);
    } else {
      toast.success("Đơn của bạn hủy thành công !");

      await fetchReservation(page);
    }

    setLoading((prev) => ({
      ...prev,
      reservationId: "",
      action: "",
      cancel: false,
    }));
  };

  const refundPayment = async (reservationId: string) => {
    const data = await refundPost(reservationId);

    if (data && data.status === "succeeded") {
      toast.success("Đơn đặt của bạn đã hoàn tiền thành công !");
    } else {
      toast.error("Hoàn tiền thất bại !");
    }

    setLoading((prev) => ({
      ...prev,
      reservationId: "",
      action: "",
      cancel: false,
    }));
  };

  const makePayment = async (reservationId: string) => {
    const data = await paymentPost(reservationId);

    setLoading((prev) => ({
      ...prev,
      reservationId: "",
      accept: false,
    }));

    if (data && data.errors) {
      toast.error(data.errors[0].message);
    } else if (data && data.error) {
      toast.error(data.error);
    } else if (data && data.url) {
      window.location.href = data.url;
    }
  };

  useEffect(() => {
    if (loading.cancel && loading.reservationId) {
      if (loading.action === "cancel") {
        updateStatusToCancel(
          loading.reservationId,
          Number(searchParams.get("page") ?? 1)
        );
      } else if (loading.action === "refund") {
        refundPayment(loading.reservationId);
      }
    } else if (loading.accept && loading.reservationId) {
      makePayment(loading.reservationId);
    }
  }, [loading.cancel, loading.accept]);

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
                sx={{ height: 200, objectFit: "cover" }}
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
                  <strong>Giá:</strong> {booking.price.toLocaleString()} VND
                </Typography>
                <Chip
                  label={translateBookingStatusToVN(booking.status)}
                  color={getStatusColor(booking.status as BookingStatus)}
                  sx={{ mt: 1 }}
                />
                <Box mt={2}>
                  {booking.status === "pending" && (
                    <LoadingButton
                      loading={
                        loading.reservationId === booking.id && loading.accept
                      }
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        handlePayment(booking.id);
                      }}
                    >
                      Xác nhận
                    </LoadingButton>
                  )}

                  {!["cancelled", "failed", "refunded"].includes(booking.status) && (
                    <LoadingButton
                      loading={
                        loading.reservationId === booking.id && loading.cancel
                      }
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        handleCancel(booking.id, booking.status);
                      }}
                    >
                      Hủy
                    </LoadingButton>
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
