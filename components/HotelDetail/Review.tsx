"use client";

import { Box, Dialog, Divider, Typography } from "@mui/material";
import RatingReadOnly from "../RatingReadOnly";
import ReviewsCarousel from "./ReviewsCarousel";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    title:
      "Needs update, but still pleasant an Needs update, but still pleasant an",
    content:
      "OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old...",
    rating: 4.5,
    date: "19/02/2024",
  },
  {
    id: 1,
    title:
      "Needs update, but still pleasant an Needs update, but still pleasant an",
    content:
      "OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old...",
    rating: 4.5,
    date: "19/02/2024",
  },
  {
    id: 1,
    title:
      "Needs update, but still pleasant an Needs update, but still pleasant an",
    content:
      "OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old...",
    rating: 4.5,
    date: "19/02/2024",
  },
  {
    id: 1,
    title:
      "Needs update, but still pleasant an Needs update, but still pleasant an",
    content:
      "OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old...",
    rating: 4.5,
    date: "19/02/2024",
  },
  {
    id: 1,
    title:
      "Needs update, but still pleasant an Needs update, but still pleasant an",
    content:
      "OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old...",
    rating: 4.5,
    date: "19/02/2024",
  },
  {
    id: 1,
    title:
      "Needs update, but still pleasant an Needs update, but still pleasant an",
    content:
      "OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old... OK by size and clean room, bathroom clean but needs updating, free parking in front of the hotel, very close to the old...",
    rating: 4.5,
    date: "19/02/2024",
  },
];

export default function Review() {
  const [openReview, setOpenReview] = useState<boolean>(false);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Đánh giá khách hàng
      </Typography>

      <RatingReadOnly value={2.5} size="medium" />

      <Typography variant="h6" gutterBottom mt={3}>
        Đánh giá gần đây
      </Typography>

      <ReviewsCarousel reviews={reviews} setOpenReview={setOpenReview} />

      {/* Show review detail */}
      <Dialog open={openReview} onClose={() => setOpenReview(false)}>
        <Box p={3} display="flex" flexDirection="column" height={803} gap={2}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Đánh giá khách hàng
          </Typography>
          <Divider />
          <RatingReadOnly size="large" value={2.5} />
          <Divider />
          <Box sx={{ overflowY: "scroll" }}>
            <Typography variant="h6">Đánh giá gần đây</Typography>

            {reviews.map((element) => (
              <Box key={element.id} mt={3}>
                <Box mb={1} display="flex" alignItems="center">
                  <RatingReadOnly value={element.rating} size="medium" />
                  <Typography ml={2} variant="body2" color="text.secondary">
                    {element.date}
                  </Typography>
                </Box>

                <Typography fontWeight={500} gutterBottom>
                  {element.title}
                </Typography>
                <Typography>{element.content}</Typography>
                <Divider sx={{ mt: 3 }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Dialog>
      {/* End show review detail */}
    </Box>
  );
}
