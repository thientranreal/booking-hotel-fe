"use client";

import RatingReadOnly from "@/components/RatingReadOnly";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Divider,
  Button,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function BookingSummary() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Box display="flex" justifyContent="space-between">
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
        <Typography>Thu, Mar 13 – Fri, Mar 14 (1 night)</Typography>

        <Typography variant="subtitle1" mt={2}>
          <strong>Room</strong>
        </Typography>
        <Typography>1 × Suite, 1 Bedroom, Pool View (2 adults)</Typography>

        <Typography variant="h6" mt={4}>
          Enter your details
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First name"
              name="firstName"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last name"
              name="lastName"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email address"
              name="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone number"
              name="phone"
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box display="flex" mt={4} justifyContent="flex-end">
          <Button variant="contained">Tiếp theo</Button>
        </Box>
      </Box>

      <Box flex={1}>
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
            <Box flex={1} position="relative">
              <Image
                src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                fill
                alt="Picture of the author"
                style={{ borderRadius: "10px" }}
              />
            </Box>
            <Box flex={2} pl={2}>
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
