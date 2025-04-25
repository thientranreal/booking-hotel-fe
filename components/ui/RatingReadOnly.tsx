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

export default function RatingReadOnly({
  value,
  showLabel = true,
  size,
}: {
  value: number;
  showLabel?: boolean;
  size: "small" | "medium" | "large";
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        size={size}
        name="hover-feedback"
        readOnly
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && showLabel && (
        <Box sx={{ ml: 1 }}>{labels[Math.round(value * 2) / 2]}</Box>
      )}
    </Box>
  );
}
