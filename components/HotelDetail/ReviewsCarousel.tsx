"use client";

import { Card, CardContent, Typography, Link } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function ReviewsCarousel({
  reviews,
  setOpenReview,
  setCurrentPage,
}: {
  reviews: Array<{ title: string; content: string }>;
  setOpenReview: (value: boolean) => void;
  setCurrentPage: (updater: (prev: number) => number) => void;
}) {
  return (
    /* Swiper Container */
    <Swiper
      spaceBetween={16}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      breakpoints={{
        600: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
      }}
      modules={[Navigation]}
      onReachEnd={() => {
        setCurrentPage((prev) => prev + 1);
      }}
    >
      {reviews.map((review, index) => (
        <SwiperSlide key={index}>
          <Card variant="outlined" sx={{ height: 170 }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {review.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }}
              >
                {review.content}
              </Typography>
              <Link
                sx={{ display: "block", mt: 1, cursor: "pointer" }}
                onClick={() => setOpenReview(true)}
              >
                Read More
              </Link>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}

      <ArrowBackIos
        sx={{ fontSize: "small", color: "black !important" }}
        className="swiper-button-prev"
      />
      <ArrowForwardIos
        sx={{ fontSize: "small", color: "black !important" }}
        className="swiper-button-next"
      />
    </Swiper>
  );
}
