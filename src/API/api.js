import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;
const OPD_ID = process.env.VUE_APP_OPD_ID;

export async function getData(req, svar, sval) {
  const data = { req, svar, sval };
  try {
    const response = await axios.post(
      `${API_URL}/api/getData/${OPD_ID}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export const fetchBeritaPopuler = async () => {
  try {
    const response = await fetch(`${API_URL}/api/getData/${OPD_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ req: "berita" }),
    });
    const data = await response.json();
    return data.berita.sort((a, b) => b.jum_klik - a.jum_klik).slice(0, 5);
  } catch (error) {
    console.error("Error fetching berita data:", error);
    throw error;
  }
};

export const sendNewsClickData = async (newsId) => {
  try {
    const data = { id: newsId.toString() };
    await axios.post(`${API_URL}/api/setData/${OPD_ID}`, {
      req: "klik_berita",
      data,
    });
    console.log(`Berita ${newsId} clicked`);
  } catch (error) {
    console.error("Error sending click data:", error);
    throw error;
  }
};
