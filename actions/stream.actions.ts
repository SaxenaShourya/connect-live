"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { toast } from "react-toastify";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET_KEY;

export const tokenProvider = async (): Promise<string> => {
  const user = await currentUser();

  if (!user) {
    toast.error("User is not authenticated");
    throw new Error("User is not authenticated");
  }
  if (!STREAM_API_KEY) {
    toast.error("Stream API key is missing");
    throw new Error("Stream API key is missing");
  }
  if (!STREAM_API_SECRET) {
    toast.error("Stream API secret is missing");
    throw new Error("Stream API secret is missing");
  }

  const client = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = await client.createToken(user.id, exp, issued);

  return token;
};
