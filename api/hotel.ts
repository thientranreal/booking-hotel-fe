const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

export async function hotelGet(page: string | null = "1") {
  try {
    if (!page) {
      page = "1";
    }

    const response = await fetch(`${apiUrl}/api/hotel?page=${page}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error hotelGet:", error);
    return null;
  }
}

export async function hotelGetWithParams(
  params: any,
  page: string | null = "1"
) {
  try {
    if (!page) {
      page = "1";
    }

    const baseUrl = `${apiUrl}/api/room-type-inventory/search`;

    const paramsConstruct = new URLSearchParams();
    paramsConstruct.append("location", params.place);
    paramsConstruct.append("startDate", params.fromDate);
    paramsConstruct.append("endDate", params.untilDate);
    paramsConstruct.append("guests", params.guests);

    if (Array.isArray(params.amenities) && params.amenities.length > 0) {
      const joinedAmenities = params.amenities
        .map((a: string) => a.trim().toLowerCase())
        .join(",");

      paramsConstruct.append("amenities", joinedAmenities);
    }

    if (Array.isArray(params.stars) && params.stars.length > 0) {
      const joinedStar = params.stars.map((a: string) => a.trim()).join(",");

      paramsConstruct.append("star", joinedStar);
    }

    if (params.priceFrom) {
      paramsConstruct.append("priceFrom", params.priceFrom);
    }

    if (params.priceTo) {
      paramsConstruct.append("priceTo", params.priceTo);
    }

    if (params.sortBy) {
      paramsConstruct.append("sortBy", params.sortBy);
    }

    paramsConstruct.append("page", page);

    const finalUrl = `${baseUrl}?${paramsConstruct}`;

    console.log(finalUrl);

    const response = await fetch(finalUrl);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error hotelGetWithParams:", error);
    return null;
  }
}

export async function hotelFindById(id: string) {
  try {
    const response = await fetch(`${apiUrl}/api/hotel/${id}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error hotelFindById:", error);
    return null;
  }
}
