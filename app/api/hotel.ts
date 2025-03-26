export async function hotelGet(page = 1) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/api/hotel?page=${page}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Lgoin:", error);
    return null;
  }
}

export async function hotelFindById(id: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/api/hotel/${id}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Lgoin:", error);
    return null;
  }
}
