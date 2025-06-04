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
            Thanh toán thành công!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Cảm ơn bạn đã đặt chỗ. Chúng tôi rất mong được đón tiếp bạn!
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
            Quay về trang chủ
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
