import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
export async function UseSignUp(inputs: any) {
  const { firstName, lastName, email, password } = inputs;

  try {
    const response = await axios.post(`http://localhost:3000/api/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function UseSignIn(inputs: any) {
  const { email, password } = inputs;
  try {
    const response = await axios.post(`http://localhost:3000/api/auth/signin`, {
      email,
      password,
    });
    return response;
  } catch (error: any) {
    return error;
  }
}

export async function fetchUser() {
  try {
    const jwt = getCookie("jwt");
    if (!jwt) {
      return "token not found";
    }
    const response = await axios.get(`http://localhost:3000/api/auth/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    return response;
  } catch (error) {
    return error;
  }
}

export function logOut() {
  deleteCookie("jwt");
  return "logOut successfully";
}
