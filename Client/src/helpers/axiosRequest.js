import axios from "axios";
export async function axiosRequest(url, method, data) {
  try {
    const response = await axios({
      url: url,
      method: method,
      data: data,
    });
    return response;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
}
