"use client";

import { hotelFindById } from "@/api/hotel";
import { paymentPost, reservationPost } from "@/api/reservation";
import { roomTypeFindById } from "@/api/roomType";
import { currentUser } from "@/api/user";
import BookingSuccessPage from "@/components/ui/BookingSuccessPage";
import RatingReadOnly from "@/components/ui/RatingReadOnly";
import diffDate from "@/utils/diffDate";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Divider,
  Button,
} from "@mui/material";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BookingSummary() {
  const params = useParams<{ hotelID: string; roomTypeID: string }>();
  const queryParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [userId, setUserId] = useState();

  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const [formData, setFormData] = useState({
    reservationId: "",
    roomType: { id: "", name: "" },
    startDate: "",
    endDate: "",
    userId: "",
    totalPrice: 0,
    success: "",
    cancel: "",
  });

  const [hotelInfo, setHotelInfo] = useState({
    rate: 0,
    name: "",
    address: "",
    img: "",
  });

  const [roomInfo, setRoomInfo] = useState({
    name: "",
    price: 0,
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getConfirmData = async () => {
      const data = await currentUser();

      if (data && data.user) {
        setUserId(data.user.id);

        setForm({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone || "",
        });
      } else {
        const fullPath = `${pathname}?${queryParams.toString()}`;

        router.push(`/login?redirect=${encodeURIComponent(fullPath)}`);
      }

      const fromDate = queryParams.get("fromDate");
      const untilDate = queryParams.get("untilDate");

      if (fromDate && untilDate) {
        const roomTypeData = await roomTypeFindById(
          params.roomTypeID,
          fromDate,
          untilDate
        );

        if (roomTypeData) {
          setRoomInfo({
            name: roomTypeData.hotel_name,
            price: roomTypeData.price,
          });

          // Calculate total price
          const totalPrice =
            diffDate(
              queryParams.get("fromDate"),
              queryParams.get("untilDate")
            ) * roomTypeData.price;

          setFormData((prev) => ({ ...prev, totalPrice }));
        }

        const hotelData = await hotelFindById(params.hotelID);

        if (hotelData) {
          setHotelInfo({
            rate: hotelData.reviews.score,
            name: hotelData.name,
            address: hotelData.address,
            img:
              process.env.NEXT_PUBLIC_PAYLOAD_API_URL +
              `${
                hotelData.image.length > 0
                  ? hotelData.image[0].image.url
                  : "/api/media/file/not-found-img.jpg"
              }`,
          });
        }
      }
    };

    getConfirmData();
  }, []);

  const handleClickReserve = async () => {
    const fromDate = queryParams.get("fromDate");
    const untilDate = queryParams.get("untilDate");

    if (fromDate && untilDate && userId) {
      const data = await reservationPost({
        roomType: params.roomTypeID,
        startDate: fromDate,
        endDate: untilDate,
        user: userId,
      });

      if (data && data.doc) {
        setIsBookingSuccess(true);

        const formData = {
          reservationId: data.doc.id,
          roomType: { id: params.roomTypeID, name: roomInfo.name },
          startDate: fromDate,
          endDate: untilDate,
          userId,
          success: process.env.NEXT_PUBLIC_SUCCESS_PAGE ?? "",
          cancel: process.env.NEXT_PUBLIC_CANCEL_PAGE ?? "",
        };

        setFormData((prev) => ({ ...prev, ...formData }));
      } else {
        toast.error(data?.errors[0]?.message);
      }
    }
  };

  const handleClickAcceptPayment = async () => {
    if (formData.reservationId) {
      const data = await paymentPost(formData);

      if (data && data.errors) {
        toast.error(data.errors[0].message);
      } else if (data && data.error) {
        toast.error(data.error);
      } else if (data && data.url) {
        window.location.href = data.url;
      }
    }
  };

  if (isBookingSuccess) {
    return <BookingSuccessPage onClick={handleClickAcceptPayment} />;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexDirection={{ xs: "column-reverse", sm: "column-reverse", md: "row" }}
    >
      <Box mr={2} flex={2}>
        <Typography variant="h5" gutterBottom>
          Trip của bạn
        </Typography>

        <Typography variant="subtitle1" mt={2}>
          <strong>Ngày</strong>
        </Typography>
        <Typography>
          {queryParams.get("fromDate")} – {queryParams.get("untilDate")} (
          {diffDate(queryParams.get("fromDate"), queryParams.get("untilDate"))}{" "}
          đêm)
        </Typography>

        <Typography variant="subtitle1" mt={2}>
          <strong>Phòng</strong>
        </Typography>
        <Typography>
          1 × {roomInfo.name} ({queryParams.get("guests")} khách)
        </Typography>

        <Typography variant="h6" mt={4}>
          Enter your details
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email address"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box display="flex" mt={4} justifyContent="flex-end">
          <Button variant="contained" onClick={handleClickReserve}>
            Tiếp theo
          </Button>
        </Box>
      </Box>

      <Box flex={1} mb={2}>
        <Box
          p={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: "1px solid rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Box>
              {hotelInfo.img && (
                <Image
                  src={hotelInfo.img}
                  width={150}
                  height={150}
                  alt="Picture of the author"
                  style={{ borderRadius: "10px" }}
                />
              )}
            </Box>
            <Box flex={1} pl={2}>
              <RatingReadOnly
                value={hotelInfo.rate}
                showLabel={false}
                size="small"
              />
              <Typography variant="h6">{hotelInfo.name}</Typography>
              <Typography>{hotelInfo.address}</Typography>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6">Chi tiết giá phòng</Typography>
            <Typography>
              Giá (1 đêm): {roomInfo.price.toLocaleString()} VND
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Tổng cộng: {formData.totalPrice.toLocaleString()} VND
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
