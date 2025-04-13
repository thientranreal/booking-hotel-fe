export async function roomTypeGetWithHotelIdAndParams(
  hotelId: string,
  params: any
) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const baseUrl = `${apiUrl}/api/room-type-inventory/search/detail/${hotelId}`;

    const paramsConstruct = new URLSearchParams();
    paramsConstruct.append("location", params.place);
    paramsConstruct.append("startDate", params.fromDate);
    paramsConstruct.append("endDate", params.untilDate);
    paramsConstruct.append("guests", params.guests);

    const finalUrl = `${baseUrl}?${paramsConstruct}`;

    const response = await fetch(finalUrl);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error roomTypeGetWithHotelIdAndParams:", error);
    return null;
  }
}

export async function roomTypeFindById(id: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/api/room-type/${id}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error roomTypeFindById:", error);
    return null;
  }
}
