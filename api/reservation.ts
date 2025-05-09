const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;
const success_url = process.env.NEXT_PUBLIC_SUCCESS_PAGE;
const cancel_url = process.env.NEXT_PUBLIC_CANCEL_PAGE;

export async function reservationPost(formData: {
  roomType: string;
  startDate: string;
  endDate: string;
  user: string;
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
        room_type: formData.roomType, // roomTypeId
        start_date: formData.startDate,
        end_date: formData.endDate,
        user: formData.user, // userId
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

export async function paymentPost(reservationId: string) {
  try {
    const response = await fetch(`${apiUrl}/api/reservation/payment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: reservationId,
        success: success_url,
        cancel: cancel_url,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reservation post:", error);
    return null;
  }
}

export async function reservationGet(userID: string, page: number) {
  try {
    const response = await fetch(
      `${apiUrl}/api/reservation?where[user][equals]=${userID}&page=${page}`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reservation get:", error);
    return null;
  }
}
