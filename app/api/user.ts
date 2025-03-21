export async function userLogin(email: string, password: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function userCreate(
  email: string,
  name: string,
  phone: string,
  password: string
) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        password,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
