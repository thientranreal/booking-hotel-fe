"use client";

import Overview from "@/components/restaurant-detail/Overview";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";

export default function RestaurantDetail() {
  const [value, setValue] = useState<string>("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box height={300} position="relative" mb={2}>
        <Image
          src="/images/login-table-reserve.jpg"
          alt="restaurant picture"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            aria-label="Details tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            onChange={handleChange}
          >
            <Tab label="Tổng quan" value="1" />
            <Tab label="Hình ảnh" value="2" />
            <Tab label="Thực đơn" value="3" />
            <Tab label="Đánh giá" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Overview />
        </TabPanel>
        <TabPanel value="2">Photos</TabPanel>
        <TabPanel value="3">Menu</TabPanel>
        <TabPanel value="4">Reviews</TabPanel>
      </TabContext>
    </Box>
  );
}
