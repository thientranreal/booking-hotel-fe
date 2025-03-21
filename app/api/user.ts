export async function userLogin(email: string, password: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      credentials: "include",
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
    console.error("Error Lgoin:", error);
    return null;
  }
}

export async function userLogout() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/users/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Lgoin:", error);
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
      credentials: "include",
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
    console.error("Error create user:", error);
    return null;
  }
}

export async function refreshToken() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/users/refresh-token`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error refresh token:", error);
    return null;
  }
}

export async function currentUser() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;

    const response = await fetch(`${apiUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error get current user:", error);
    return null;
  }
}
