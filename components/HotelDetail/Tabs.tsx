import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ReactNode, useState } from "react";

export default function Tabs({
  Overview,
  InfoPrice,
  Facilities,
  Reviews,
}: {
  Overview: ReactNode;
  InfoPrice: ReactNode;
  Facilities: ReactNode;
  Reviews: ReactNode;
}) {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tổng quan" value="1" />
            <Tab label="Thông tin và giá cả" value="2" />
            <Tab label="Cơ sở vật chất" value="3" />
            <Tab label="Đánh giá" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">{Overview}</TabPanel>
        <TabPanel value="2">{InfoPrice}</TabPanel>
        <TabPanel value="3">{Facilities}</TabPanel>
        <TabPanel value="4">{Reviews}</TabPanel>
      </TabContext>
    </Box>
  );
}
