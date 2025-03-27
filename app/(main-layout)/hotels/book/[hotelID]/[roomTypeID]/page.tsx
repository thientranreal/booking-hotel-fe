"use client";

import { currentUser } from "@/app/api/user";
import RatingReadOnly from "@/components/RatingReadOnly";
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
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingSummary() {
  const params = useParams<{ hotelID: string; roomTypeID: string }>();
  const queryParams = useSearchParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await currentUser();

      if (data.user) {
        setForm({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone || "",
        });
      }
    };

    getCurrentUser();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexDirection={{ xs: "column-reverse", sm: "column-reverse", md: "row" }}
    >
      <Box mr={2} flex={2}>
        <Typography variant="h5" gutterBottom>
          Your trip
        </Typography>
        <Typography color="green">
          ✔ Great pick! Previous guests rated this property a 10 on average
        </Typography>

        <Typography variant="subtitle1" mt={2}>
          <strong>Dates</strong>
        </Typography>
        <Typography>
          {queryParams.get("fromDate")} – {queryParams.get("untilDate")} (
          {diffDate(queryParams.get("fromDate"), queryParams.get("untilDate"))}{" "}
          đêm)
        </Typography>

        <Typography variant="subtitle1" mt={2}>
          <strong>Room</strong>
        </Typography>
        <Typography>
          1 × Lorem ipsum dolor sit amet consectetur, adipisicing elit. (
          {queryParams.get("guests")} khách)
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
          <Button variant="contained">Tiếp theo</Button>
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
              <Image
                src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                width={150}
                height={150}
                alt="Picture of the author"
                style={{ borderRadius: "10px" }}
              />
            </Box>
            <Box flex={1} pl={2}>
              <RatingReadOnly value={4} showLabel={false} size="small" />
              <Typography variant="h6">
                Holiday Inn & Suites Saigon Airport by IHG
              </Typography>
              <Typography>
                18E Cong Hoa Street, Tan Binh, Ho Chi Minh City, VN
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6">Price breakdown</Typography>
            <Typography>Original price (1 night): $163.57</Typography>
            <Typography>Taxes and fees: $18.96</Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Total: $182.52
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
