"use client";

import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9fafb"
      px={2}
    >
      <Card
        elevation={3}
        sx={{
          borderRadius: 4,
          p: 4,
          maxWidth: 400,
          textAlign: "center",
          bgcolor: "white",
        }}
      >
        <CardContent>
          <CheckCircleOutline color="success" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Thank you for your booking. We look forward to hosting you!
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => router.push("/")}
            sx={{
              bgcolor: "#22c55e",
              ":hover": { bgcolor: "#16a34a" },
              borderRadius: 3,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
