"use client";

import { Box, Grid } from "@mui/material";
import CardRestaurant from "@/components/CardRestaurant";
import SearchBar from "@/components/SearchBar";

export default function Restaurants() {
  return (
    <Box mt={5}>
      <SearchBar />

      <Grid container spacing={2} mt={5}>
        <Grid item xs={12} md={6} lg={4}>
          <CardRestaurant
            image="/images/login-table-reserve.jpg"
            title="test"
            categories="abc, xyz, ghi"
            starRatings={4}
            numberPeopelRate={20000}
            slotsLeft={3}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <CardRestaurant
            image="/images/login-table-reserve.jpg"
            title="test"
            categories="abc, xyz, ghi"
            starRatings={4}
            numberPeopelRate={20000}
            slotsLeft={3}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <CardRestaurant
            image="/images/login-table-reserve.jpg"
            title="test"
            categories="abc, xyz, ghi"
            starRatings={5}
            numberPeopelRate={20000}
            slotsLeft={3}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <CardRestaurant
            image="/images/login-table-reserve.jpg"
            title="test"
            categories="abc, xyz, ghi"
            starRatings={4}
            numberPeopelRate={20000}
            slotsLeft={3}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
