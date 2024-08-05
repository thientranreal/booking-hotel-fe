"use client";

import { Box, Grid } from "@mui/material";
import CardRestaurant from "@/components/CardRestaurant";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";

const restaurantData = [
  {
    id: 1,
    image: "/images/login-table-reserve.jpg",
    title: "test",
    categories: "abc, xyz, ghi",
    starRatings: 4,
    numberPeopelRate: 20000,
    slotsLeft: 3,
  },
  {
    id: 2,
    image: "/images/login-table-reserve.jpg",
    title: "test",
    categories: "abc, xyz, ghi",
    starRatings: 4,
    numberPeopelRate: 20000,
    slotsLeft: 3,
  },
  {
    id: 3,
    image: "/images/login-table-reserve.jpg",
    title: "test",
    categories: "abc, xyz, ghi",
    starRatings: 5,
    numberPeopelRate: 20000,
    slotsLeft: 3,
  },
  {
    id: 4,
    image: "/images/login-table-reserve.jpg",
    title: "test",
    categories: "abc, xyz, ghi",
    starRatings: 4,
    numberPeopelRate: 20000,
    slotsLeft: 3,
  },
];

export default function Restaurants() {
  const [open, setOpen] = useState<boolean>(false);
  const [bookRestaurant, setBookRestaurant] = useState<string>("");

  return (
    <Box>
      <SearchBar />

      <Grid container spacing={2} mt={5}>
        {restaurantData.map((restaurant) => (
          <Grid item xs={12} md={6} lg={4} key={restaurant.id}>
            <CardRestaurant
              image={restaurant.image}
              title={restaurant.title}
              categories={restaurant.categories}
              starRatings={restaurant.starRatings}
              numberPeopelRate={restaurant.numberPeopelRate}
              slotsLeft={restaurant.slotsLeft}
              onClick={() => {
                setOpen(true);
                setBookRestaurant(restaurant.title);
              }}
            />
          </Grid>
        ))}
      </Grid>

      <BookingModal
        open={open}
        restaurantName={bookRestaurant}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}
