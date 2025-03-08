"use client";

import HotelCard from "@/components/HotelCard";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Availability() {
  const [sortBy, setSortBy] = useState("");

  const [facilities, setFacilities] = useState([
    { name: "Hồ bơi", check: false },
    { name: "Spa", check: false },
    { name: "Gym", check: false },
    { name: "Cho phép thú cưng", check: false },
    { name: "Nhà hàng", check: false },
    { name: "Đậu xe", check: false },
    { name: "Wifi", check: false },
  ]);

  const [star, setStar] = useState([
    { name: "1 sao", check: false },
    { name: "2 sao", check: false },
    { name: "3 sao", check: false },
    { name: "4 sao", check: false },
    { name: "5 sao", check: false },
  ]);

  const handleSelectSortBy = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  return (
    <Box display="flex">
      <Box
        flex={1}
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        p={2}
      >
        <Box>
          <Typography fontWeight="bold">Lọc theo:</Typography>
          <Typography>Giá (mỗi đêm):</Typography>
        </Box>

        <Divider />

        <Box>
          <Typography fontWeight="bold">Cơ sở vật chất</Typography>
          <FormGroup>
            {facilities.map((element, index) => (
              <FormControlLabel
                key={element.name}
                control={
                  <Checkbox
                    checked={element.check}
                    onChange={(event) => {
                      let temp = [...facilities];
                      temp[index].check = event.target.checked;
                      setFacilities(temp);
                    }}
                  />
                }
                label={element.name}
              />
            ))}
          </FormGroup>
        </Box>

        <Divider />

        <Box>
          <Typography fontWeight="bold">Điểm đánh giá</Typography>
          <FormGroup>
            {star.map((element, index) => (
              <FormControlLabel
                key={element.name}
                control={
                  <Checkbox
                    checked={element.check}
                    onChange={(event) => {
                      let temp = [...star];
                      temp[index].check = event.target.checked;
                      setStar(temp);
                    }}
                  />
                }
                label={element.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>

      {/* Right */}
      <Box flex={3} ml={2}>
        <Box width="200px" mb={2} marginLeft="auto">
          <FormControl fullWidth>
            <InputLabel id="sort-by-select-label">Sắp xếp theo</InputLabel>
            <Select
              labelId="sort-by-select-label"
              id="sort-by-select"
              value={sortBy}
              label="Sắp xếp theo"
              onChange={handleSelectSortBy}
            >
              <MenuItem value={"star"}>Theo sao (giảm dần)</MenuItem>
              <MenuItem value={"price"}>Giá (tăng dần)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Display hotel */}
        <HotelCard />
      </Box>
    </Box>
  );
}
