"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import Overview from "@/components/HotelDetail/Overview";
import InfoPrice from "@/components/HotelDetail/InfoPrice";
import Review from "@/components/HotelDetail/Review";

const images = [
  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

export default function HotelDetail() {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Tổng quan" value="1" />
            <Tab label="Thông tin và giá cả" value="2" />
            <Tab label="Đánh giá" value="3" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Overview
            name="Lorem ip"
            address="Lorem ipum"
            score={3.5}
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A est inventore, voluptatibus, recusandae ullam quo nemo voluptates impedit, cumque voluptate iure eveniet esse saepe quas aut corrupti eos quibusdam perspiciatis."
            images={images}
            amenities={["Wifi", "Lorem", "Lorem2"]}
            setValue={setValue}
          />
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
