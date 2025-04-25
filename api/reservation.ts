const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

export async function reservationPost(formData: {
  roomType: string;
  startDate: string;
  endDate: string;
  user: string;
  status?: string;
  paymentStatus?: string;
}) {
  try {
    const response = await fetch(`${apiUrl}/api/reservation`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "room-type": formData.roomType,
        start_date: formData.startDate,
        end_date: formData.endDate,
        user: formData.user,
        status: formData.status ?? "reserved",
        payment_status: formData.paymentStatus ?? "pending",
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reservation post:", error);
    return null;
  }
}
