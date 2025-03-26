"use client";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import Overview from "@/components/HotelDetail/Overview";
import InfoPrice from "@/components/HotelDetail/InfoPrice";
import Review from "@/components/HotelDetail/Review";
import { useParams } from "next/navigation";
import { hotelFindById } from "@/app/api/hotel";
import { toast } from "react-toastify";
import { TabList } from "@mui/lab";

export default function HotelDetail() {
  const params = useParams<{ hotelID: string }>();

  const [value, setValue] = useState("1");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [score, setScore] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getHotelById = async () => {
      const data = await hotelFindById(params.hotelID);

      console.log(data);

      if (data.errors) {
        toast.error(data.errors[0].message);
      } else {
        setName(data.name);
        setAddress(data.address);
        setScore(data["review score"].score);
        setDescription(data.description);
        setImages(
          data.media.map((img: any) => ({ img: img.url, alt: img.alt }))
        );
        setAmenities(data.amenities);
      }
    };

    getHotelById();
  }, []);

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
          <Overview
            name={name}
            address={address}
            score={score}
            description={description}
            images={images}
            amenities={amenities}
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
