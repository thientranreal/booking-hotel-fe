export async function reviewGetWithHotelId(hotelId: string, page: number) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(
      `${apiUrl}/api/reviews?where[hotel.id][equals]=${hotelId}&depth=0&page=${page}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reviewGet:", error);
    return null;
  }
}

export async function reviewPost(reviewData: {
  title: string;
  rating: number;
  content: string;
  hotelId: string;
}) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/api/reviews`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: reviewData.rating,
        subject: reviewData.title,
        content: reviewData.content,
        hotel: reviewData.hotelId,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reviewPost:", error);
    return null;
  }
}
