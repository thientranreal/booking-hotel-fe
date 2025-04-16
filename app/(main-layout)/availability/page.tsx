"use client";

import HotelCard from "@/components/HotelCard";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Availability() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const MAX_VISIBLE = 6;

  const [expand, setExpand] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [amenities, setAmenities] = useState([
    { name: "WiFi", check: false },
    { name: "Hồ bơi", check: false },
    { name: "Trung tâm thể dục", check: false },
    { name: "Spa & Chăm sóc sức khỏe", check: false },
    { name: "Nhà hàng", check: false },
    { name: "Quầy bar", check: false },
    { name: "Đưa đón sân bay", check: false },
    { name: "Đỗ xe miễn phí", check: false },
    { name: "Lễ tân 24 giờ", check: false },
    { name: "Dịch vụ phòng", check: false },
    { name: "Máy lạnh", check: false },
    { name: "Phòng không hút thuốc", check: false },
    { name: "Phòng gia đình", check: false },
    { name: "Cho phép mang vật nuôi", check: false },
    { name: "Trung tâm dịch vụ doanh nhân", check: false },
    { name: "Tiện nghi tổ chức hội họp", check: false },
    { name: "Dịch vụ giặt là", check: false },
    { name: "Dịch vụ trợ giúp đặc biệt", check: false },
    { name: "Cho thuê xe đạp", check: false },
    { name: "Cho thuê xe hơi", check: false },
    { name: "Phòng xông hơi khô", check: false },
    { name: "Bồn tắm nước nóng", check: false },
    { name: "Giáp biển", check: false },
    { name: "Dịch vụ trông trẻ", check: false },
    { name: "Sòng bạc", check: false },
    { name: "Sân gôn", check: false },
    { name: "Sân tennis", check: false },
  ]);

  const [star, setStar] = useState([
    { name: "1 sao", check: false },
    { name: "2 sao", check: false },
    { name: "3 sao", check: false },
    { name: "4 sao", check: false },
    { name: "5 sao", check: false },
  ]);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    150000, 300000,
  ]);

  const handleChangePriceRange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    setPriceRange(newValue as [number, number]);
  };

  const handleSelectSortBy = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }

    params.delete("star");
    star
      .filter((item) => item.check)
      .forEach((item) => params.append("star", item.name[0]));

    params.delete("amenities");
    amenities
      .filter((item) => item.check)
      .forEach((item) => params.append("amenities", item.name));

    params.set("priceFrom", String(priceRange[0]));
    params.set("priceTo", String(priceRange[1]));

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (searchParams.get("priceFrom") && searchParams.get("priceTo")) {
      setPriceRange([
        Number(searchParams.get("priceFrom")),
        Number(searchParams.get("priceTo")),
      ]);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("priceFrom", String(priceRange[0]));
      params.set("priceTo", String(priceRange[1]));
      router.replace(`?${params.toString()}`, { scroll: false });
    }

    const selectedAmenities = searchParams.getAll("amenities");
    setAmenities((prevAmenities) =>
      prevAmenities.map((item) => ({
        ...item,
        check: selectedAmenities.includes(item.name),
      }))
    );

    const selectedStars = searchParams.getAll("star");
    setStar((prev) =>
      prev.map((item) => ({
        ...item,
        check: selectedStars.includes(item.name[0]),
      }))
    );

    const sortValue = searchParams.get("sortBy") || "";
    setSortBy(sortValue);
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setOpenFilter(true);
      } else {
        setOpenFilter(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        gap: 2,
      }}
    >
      {/* Button for show hide filter */}
      <Box sx={{ display: { md: "none" } }}>
        <Button
          variant="contained"
          onClick={() => setOpenFilter(!openFilter)}
          sx={{ mb: 2 }}
        >
          {openFilter ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
        </Button>
      </Box>

      {/* Filter block */}
      <Collapse in={openFilter} timeout="auto">
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

            <Box width={250}>
              <Slider
                value={priceRange}
                onChange={handleChangePriceRange}
                valueLabelDisplay="auto"
                min={150000}
                max={1000000}
                step={50000}
              />
              <Typography variant="body2">
                Giá từ:{" "}
                <b>{new Intl.NumberFormat("vi-VN").format(priceRange[0])}</b>{" "}
                đến{" "}
                <b>{new Intl.NumberFormat("vi-VN").format(priceRange[1])}</b>{" "}
                VNĐ
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography fontWeight="bold">Cơ sở vật chất</Typography>
            <FormGroup>
              {(expand ? amenities : amenities.slice(0, MAX_VISIBLE)).map(
                (element, index) => (
                  <FormControlLabel
                    key={element.name}
                    control={
                      <Checkbox
                        checked={element.check}
                        onChange={(event) => {
                          let temp = [...amenities];
                          temp[index].check = event.target.checked;
                          setAmenities(temp);
                        }}
                      />
                    }
                    label={element.name}
                  />
                )
              )}
            </FormGroup>

            {amenities.length > MAX_VISIBLE && (
              <Button
                onClick={() => setExpand(!expand)}
                size="small"
                sx={{ mt: 1, textTransform: "none" }}
              >
                {expand ? "Thu gọn" : "Xem thêm"}
              </Button>
            )}
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

          <Divider />

          <Button
            onClick={handleSearch}
            variant="contained"
            endIcon={<SearchIcon />}
          >
            Tìm kiếm
          </Button>
        </Box>
      </Collapse>

      {/* Right */}
      <Box flex={3}>
        <Box mb={2} marginLeft="auto">
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
        <Suspense fallback={<CircularProgress />}>
          <HotelCard />
        </Suspense>
      </Box>
    </Box>
  );
}
