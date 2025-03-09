import { Typography, Button, Box } from "@mui/material";
import RatingReadOnly from "./RatingReadOnly";
import Image from "next/image";
import Link from "next/link";

export default function HotelCard() {
  return (
    <Box
      sx={{
        maxWidth: 804,
        maxHeight: 284,
        p: 2,
        display: "flex",
        border: "1px solid rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
      }}
    >
      <Image
        src="/images/photo-res.webp"
        width={240}
        height={250}
        alt="Picture of the hotel"
        style={{ borderRadius: "10px" }}
      />

      <Box
        sx={{ p: 0, pl: 2 }}
        flexGrow={1}
        display="flex"
        flexDirection="column"
      >
        <Link href="/">
          <Typography fontWeight="bold" component="div">
            Hôtel Littéraire Alexandre Vialatte, BW Signature Collection
          </Typography>
        </Link>
        <Box display="flex" alignItems="center" gap={0.5}>
          <RatingReadOnly value={3} showLabel={false} size="small" />
          <span>-</span>
          <Typography variant="body2" color="text.secondary" m={0} p={0}>
            52.26 ml from center
          </Typography>
        </Box>

        <Box display="flex" gap={2} mt={2}>
          <Typography variant="body2">Wi-Fi</Typography>
          <Typography variant="body2">Parking available</Typography>
          <Typography variant="body2">Restaurant</Typography>
        </Box>

        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <Typography variant="h6">$121</Typography>
          <Typography variant="body2" color="text.secondary">
            $126 total
          </Typography>
          <Typography variant="body2" color="text.secondary">
            includes taxes and fees
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            See availability
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
