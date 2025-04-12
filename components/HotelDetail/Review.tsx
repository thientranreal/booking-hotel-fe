"use client";

import {
  Box,
  Button,
  Dialog,
  Divider,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import RatingReadOnly from "../RatingReadOnly";
import ReviewsCarousel from "./ReviewsCarousel";
import { useState } from "react";

type Review = {
  id: number;
  title: string;
  content: string;
  rating: number;
  date: string;
};

const reviewsDump = [
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

  const [reviews, setReviews] = useState<Review[]>(reviewsDump);
  const [rating, setRating] = useState<number | null>(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string>("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !rating || !content) {
      setError("Hãy điền đủ thông tin!");
      return;
    }

    setRating(0);
    setTitle("");
    setContent("");
    setError("");
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="600" gutterBottom>
        Đánh giá khách hàng
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        <RatingReadOnly value={2.5} size="medium" />
        <Typography variant="body2" color="text.secondary">
          2.5/5 (dựa trên 100 đánh giá)
        </Typography>
      </Box>

      <Typography variant="h6" fontWeight="600" gutterBottom mt={3}>
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

      <Divider sx={{ my: 3 }} />

      {/* Review section */}
      <Box sx={{ maxWidth: "800px", margin: "auto", padding: 3 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight={600}
          sx={{
            textTransform: "uppercase",
            letterSpacing: 1.2,
            color: "text.primary",
          }}
          gutterBottom
        >
          Đánh giá của bạn
        </Typography>

        {/* Display error if any */}
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        {/* Review Submission Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            precision={0.5}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Tiêu đề"
            multiline
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Viết đánh giá"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              boxShadow: 3,
              ":hover": {
                boxShadow: 4,
                backgroundColor: "#c9302c",
              },
              transition: "background-color 0.3s, box-shadow 0.3s", // smooth hover effect
            }}
          >
            Đăng review của bạn
          </Button>
        </Box>
      </Box>
      {/* End review section */}
    </Box>
  );
}
