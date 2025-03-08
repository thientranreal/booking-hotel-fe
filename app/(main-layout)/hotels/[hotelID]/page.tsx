"use client";

import Overview from "@/components/HotelDetail/Overview";
import Tabs from "@/components/HotelDetail/Tabs";
import { Box } from "@mui/material";

export default function HotelDetail() {
  return (
    <Box>
      <Tabs Overview={<Overview />} />
    </Box>
  );
}
