import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels: { [index: string]: string } = {
  0.5: "Cực tệ",
  1: "Cực tệ+",
  1.5: "Tệ",
  2: "Tệ+",
  2.5: "Trung bình",
  3: "Trung bình+",
  3.5: "Tốt",
  4: "Tốt+",
  4.5: "Rất tốt",
  5: "Rất tốt+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function ResRating() {
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
