import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Define the type for a booking
type Booking = {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: string;
};

// Mock data for bookings
const bookings: Booking[] = [
  {
    id: "1",
    date: "2023-10-01",
    time: "18:00",
    guests: 4,
    status: "Confirmed",
  },
  {
    id: "2",
    date: "2023-10-02",
    time: "19:30",
    guests: 2,
    status: "Cancelled",
  },
  {
    id: "3",
    date: "2023-10-03",
    time: "20:00",
    guests: 6,
    status: "Confirmed",
  },
];

export default function BookingHistory() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Booking History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
