import { sendToAPI } from "../helper";
import type { StarsenderApiPayload } from "./type";

const sendWithStarsender = async (payload: StarsenderApiPayload) => {
  const url = process.env.STARSENDER_URL || "missing .env";
  const secret = process.env.STARSENDER_TOKEN || "missing .env";
  const res = await sendToAPI(url, secret, payload, "POST");
  console.log("Starsender Response:", res);
};

export { sendWithStarsender };
