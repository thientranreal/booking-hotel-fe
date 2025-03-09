"use client";

import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function ImageSlider({ images }: { images: Array<string> }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{ clickable: true }}
      loop
      style={{ height: "100%" }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <Box
            component="img"
            src={src}
            alt={`Slide ${index + 1}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </SwiperSlide>
      ))}
      <ArrowBackIos fontSize="small" className="swiper-button-prev" />
      <ArrowForwardIos fontSize="small" className="swiper-button-next" />
    </Swiper>
  );
}
