"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import Overview from "@/components/HotelDetail/Overview";
import InfoPrice from "@/components/HotelDetail/InfoPrice";
import Review from "@/components/HotelDetail/Review";
import { TabList } from "@mui/lab";

export default function HotelDetail() {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
          >
            <Tab label="Tổng quan" value="1" />
            <Tab label="Thông tin và giá cả" value="2" />
            <Tab label="Đánh giá" value="3" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Overview setValue={setValue} />
        </TabPanel>

        <TabPanel value="2">
          <InfoPrice />
        </TabPanel>

        <TabPanel value="3">
          <Review />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
