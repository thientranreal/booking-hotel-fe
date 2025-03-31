import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Button,
} from "@mui/material";

// const images = [
//   "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
//   "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1200",
// ];

const bookings = [
  {
    id: 1,
    hotelName: "Luxury Beach Resort",
    location: "Miami, FL",
    checkIn: "2024-04-10",
    checkOut: "2024-04-15",
    price: "$850",
    status: "Confirmed",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  },
  {
    id: 2,
    hotelName: "Mountain View Inn",
    location: "Denver, CO",
    checkIn: "2024-05-05",
    checkOut: "2024-05-10",
    price: "$600",
    status: "Pending",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  },
  {
    id: 3,
    hotelName: "City Lights Hotel",
    location: "New York, NY",
    checkIn: "2024-06-12",
    checkOut: "2024-06-15",
    price: "$750",
    status: "Cancelled",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  },
];

type BookingStatus = "Confirmed" | "Pending" | "Cancelled";

const getStatusColor = (status: BookingStatus) => {
  switch (status) {
    case "Confirmed":
      return "success";
    case "Pending":
      return "warning";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

export default function BookingHistory() {
  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        Lịch sử đặt phòng
      </Typography>
      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={booking.image}
                alt={booking.hotelName}
              />
              <CardContent>
                <Typography variant="h6">{booking.hotelName}</Typography>
                <Typography color="text.secondary">
                  {booking.location}
                </Typography>
                <Typography>
                  <strong>Nhận phòng:</strong> {booking.checkIn}
                </Typography>
                <Typography>
                  <strong>Trả phòng:</strong> {booking.checkOut}
                </Typography>
                <Typography>
                  <strong>Giá:</strong> {booking.price}
                </Typography>
                <Chip
                  label={booking.status}
                  color={getStatusColor(booking.status as BookingStatus)}
                  sx={{ mt: 1 }}
                />
                <Box mt={2}>
                  {booking.status === "Pending" && (
                    <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                      Xác nhận
                    </Button>
                  )}
                  {booking.status !== "Cancelled" && (
                    <Button variant="outlined" color="error">
                      Hủy
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
