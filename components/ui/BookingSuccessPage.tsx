import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

export default function BookingSuccessPage({
  onClick,
}: {
  onClick: () => void;
}) {
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
            Đặt phòng thành công!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Phòng của bạn đã được đặt. Hãy click tiếp theo để thanh toán.
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onClick}
            sx={{
              bgcolor: "#6366f1",
              ":hover": { bgcolor: "#4f46e5" },
              borderRadius: 3,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Tiếp theo
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
