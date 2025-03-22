export async function hotelGet() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/api/hotel`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Lgoin:", error);
    return null;
  }
}
