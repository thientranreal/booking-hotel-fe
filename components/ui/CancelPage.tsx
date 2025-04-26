import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";

interface CancelPageProps {
  onRetry?: () => void;
}

export default function CancelPage({ onRetry }: CancelPageProps) {
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
          <CancelOutlined color="error" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Payment Canceled
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Your payment was not completed. Please try again or contact support.
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onRetry}
            sx={{
              bgcolor: "#ef4444",
              ":hover": { bgcolor: "#dc2626" },
              borderRadius: 3,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
